'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { FabricanteI } from "@/utils/types/fabricante"
import { useParams } from "next/navigation"
type Inputs = {
  modelo: string
  fabricanteId: number
  ano: number
  preco: number
  quantidadeEstoque: number
  destaque: boolean
  foto: string
  acessorios: string
  tipo: string
}

function AlterarProduto() {
  const params = useParams() as { ferramenta_id: string }
  console.log("id ferramenta", params.ferramenta_id);
  
  const [fabricante, setfabricante] = useState<FabricanteI[]>([])
  const {
    register,
    handleSubmit,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {

    async function getfabricante() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fabricante`)
      const dados = await response.json()
      setfabricante(dados)
    }
    getfabricante()
    setFocus("modelo")
  }, [params.ferramenta_id, setFocus])

  const optionsFabricante = fabricante.map(fabricante => (
    <option key={fabricante.id} value={fabricante.id}>{fabricante.nome}</option>
  ));

  async function AlterarProduto(data: Inputs) {

    const novoProduto: Inputs = {
      modelo: data.modelo,
      fabricanteId: Number(data.fabricanteId), // Verifique se o ID está correto
      ano: Number(data.ano),
      acessorios: data.acessorios,
      destaque: false,
      quantidadeEstoque: Number(data.quantidadeEstoque), // Nome corrigido
      foto: data.foto,
      preco: Number(data.preco),
      tipo: data.tipo
    }


    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoProduto)
      },
    )

    if (response.status == 200) {
      toast.success("Produto alterado com sucesso!");
    } else {
      toast.error("Erro ao alterar o produto.");
    }
  }
  return (
    <div className="h-screen">
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-4xl me-56">
        Alteração de Produtos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(AlterarProduto)}>
        <div className="mb-3">
          <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 ">
            Modelo do Produto</label>
          <input type="text" id="modelo"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
            {...register("modelo")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="fabricanteId" className="block mb-2 text-sm font-medium text-gray-900 ">
              Fabricante</label>
            <select id="fabricanteId"
              defaultValue="1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
              {...register("fabricanteId")}
            >
              {optionsFabricante}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 ">
              Ano</label>
            <input type="number" id="ano"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required
              {...register("ano")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 ">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required
              {...register("preco")}
            />
          </div>

        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 ">
              Quantidade</label>
            <input type="number" id="quantidade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required
              {...register("quantidadeEstoque")}
            />
          </div>

        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 ">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
              {...register("foto")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="combustivel" className="block mb-2 text-sm font-medium text-gray-900 ">
              Voltagem</label>
            <select id="combustivel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
              {...register("tipo")}
            >
              <option>BIVOLT</option>
              <option>VOLT_220</option>
              <option>VOLT_110</option>

            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 ">
            Acessórios</label>
          <textarea id="acessorios" rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            {...register("acessorios")}></textarea>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Incluir</button>
      </form>
    </div>
  )
}

export default AlterarProduto