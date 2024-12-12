'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemProduto from '@/components/ItemProduto'
import { Ferramenta } from "@/utils/types/ferramentas"

function CadProdutos() {
  const [produtos, setprodutos] = useState<Ferramenta[]>([])

  useEffect(() => {
    async function GetProdutos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas`)
      const dados = await response.json()
      setprodutos(dados)
    }
    GetProdutos()
  }, [])

  const listaprodutos = produtos.map(ferramenta => (
    <ItemProduto key={ferramenta.id} ferramenta={ferramenta} produtos={produtos} setprodutos={setprodutos} />
  ))

  return (
    <div className='m-4 mt-24 '>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-slate-800 md:text-3xl lg:text-4xl ">
          Cadastro de Produtos
        </h1>
        <Link href="produtos/novo" 
          className="text-white bg-blue-700
           hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold 
           rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600
            dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo produto
        </Link>
        
      </div>

      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo do produto
              </th>
              <th scope="col" className="px-6 py-3">
                Fabricante
              </th>
              <th scope="col" className="px-6 py-3">
                Estoque
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody >
            {listaprodutos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadProdutos