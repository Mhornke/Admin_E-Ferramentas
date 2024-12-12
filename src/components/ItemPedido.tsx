'use client'
import { useState } from "react"
import Cookies from "js-cookie"
import { PedidoI } from "@/utils/types/pedido"
import { ItemPedidoI } from "@/utils/types/itemPedido"

interface listaPedidoProps {
  pedido: PedidoI,
  itens: ItemPedidoI[],
}

export const Processo = (status: string) => {
  switch (status) {
    case 'EM_PROCESSAMENTO':
      return 'Em Processo';
    case 'EM_TRANSITO':
      return "Em trânsito";
    case 'ENVIADO':
      return "Enviado";
    case 'CONCLUIDO':
      return "Concluído";
    case 'CANCELADO':          
      return "Cancelado";
    default:
      return status;
  }
}

function ItemPedido({ pedido }: listaPedidoProps) {
  // Inicializando o estado com o status do pedido
  const [pedidosState, setPedidosState] = useState<string>(pedido.status);
  const TextoStatus = (() => {
    switch (pedidosState) {
      case 'EM_PROCESSAMENTO':
        return 'text-blue-500'; // Exemplo: cor azul
      case 'EM_TRANSITO':
        return 'text-yellow-400'; // Exemplo: cor amarela
      case 'ENVIADO':
        return 'text-gray-500'; // Exemplo: cor verde
      case 'CONCLUIDO':
        return 'text-green-500'; // Exemplo: cor cinza
      case 'CANCELADO':
        return 'text-red-500'; // Exemplo: cor vermelha
      default:
        return ''; // Nenhuma classe se o status não for reconhecido
    }
  })();

  async function AlteraStatus(e: React.ChangeEvent<HTMLSelectElement>, pedidoId: number) {
    const novoStatus = e.target.value;
    console.log(novoStatus);
    console.log(pedidoId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,  // Supondo que você armazene o token no cookie
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (response.ok) {
        // Atualiza o estado local com o novo status

        console.log('Status atualizado com sucesso');
        setPedidosState(novoStatus);
      } else {
        console.error('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  }
  

  return (
    <tr key={pedido.id} className="odd:bg-white bg-slate-200 text-y">
      <td className={`px-6 py-4 font-semibold ${TextoStatus}`}>
        {Processo(pedidosState)}
      </td>

      {pedido.itens.map((item) => (
        <div key={item.ferramentaId} className="px-7 py-4">
          {item.nome} - Quantidade: {item.quantidade} - Preço: R$ {Number(item.precoUnitario).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
        </div>
      ))}
      <td className="px-6 py-4">
        {Number(pedido.valorTotal).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td>{pedido.clienteId}</td>
      <td>
        <button className="ml-6">
          <select
            className="bg-slate-500 text-blue-50" 
            value={pedidosState}  
            onChange={(e) => AlteraStatus(e, pedido.id)}
          >
            <option value="EM_PROCESSAMENTO">Em Processamento</option>
            <option value="ENVIADO">Enviado</option>
            <option value="EM_TRANSITO">Em Trânsito</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </button>
      </td>
    </tr>
  );
}

export default ItemPedido;
