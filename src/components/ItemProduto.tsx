'use client'
import { MdDeleteForever } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import Cookies from "js-cookie"
import { CiEdit } from "react-icons/ci";
import { Ferramenta } from "@/utils/types/ferramentas"
import Link from "next/link";
import Image from "next/image";

interface ItemProdutoProps {
  ferramenta: Ferramenta;
  produtos: Ferramenta[];
  setprodutos: React.Dispatch<React.SetStateAction<Ferramenta[]>>;
}

function ItemProduto({ ferramenta, produtos, setprodutos }: ItemProdutoProps) {

  async function excluirFerramenta() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${ferramenta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const ferramenta2 = produtos.filter(x => x.id != ferramenta.id)
        setprodutos(ferramenta2)
        alert("Produto excluído com sucesso")
      } else {
        alert("Erro... Produto não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/destacar/${ferramenta.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const ferramenta2 = produtos.map(x => {
        if (x.id == ferramenta.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setprodutos(ferramenta2)
    }
  }
  function mostaid() {
    
    console.log("id recebido do Link", ferramenta.id);
  }


  return (
    <tr key={ferramenta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Image  src={ferramenta.foto} alt="Capa do Carro"
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.modelo}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.fabricante.nome}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.quantidadeEstoque}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {Number(ferramenta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <MdDeleteForever className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirFerramenta} />&nbsp;
        <CiStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
        <Link href={`/principal/produtos/alterar/${ferramenta.id}`} onClick={mostaid}>
        
          <CiEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Editar" />
        </Link>


      </td>
    </tr>
  )
}

export default ItemProduto