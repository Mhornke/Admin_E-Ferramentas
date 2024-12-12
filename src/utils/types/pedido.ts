import { ItemPedidoI } from "./itemPedido"

export interface PedidoI {
  id: number;
  nome: string;
  clienteId: string;
  valorTotal: number; // Corrigido para minúsculo
  quantidade: number; // Corrigido para minúsculo
  descricao: string;
  status: string
  foto: string;
  preco: number;
  modelo: string;
  itens: ItemPedidoI[];
  createdAt: string | null;
  updatedAt: string | null;
}
