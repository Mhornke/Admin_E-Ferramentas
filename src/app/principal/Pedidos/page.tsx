'use client'

import { useEffect, useState } from "react";
import { PedidoI } from "@/utils/types/pedido";
import ItemPedido from "@/components/ItemPedido";

function ControlePedidos() {
  const [pedidos, setPedidos] = useState<PedidoI[]>([]);

  useEffect(() => {
    async function getPedidos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos`);
        
        const dados = await response.json();
        setPedidos(dados);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    }
    getPedidos();
  }, []);
  // console.log("pedidos sendo recebido em Pedido/page",pedidos.clienteId);
  
  console.log("pedios no setter", pedidos);
  

  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Controle de Pedidos
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Pedido do Cliente</th>
              <th scope="col" className="px-6 py-3">Preço Total R$</th>
              <th scope="col" className="px-6 py-3">ID do cliente</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <ItemPedido
                key={pedido.clienteId}
                pedido={pedido}  // Passando o pedido completo
                itens={pedido.itens}  // Passando os itens de cada pedido
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ControlePedidos;
