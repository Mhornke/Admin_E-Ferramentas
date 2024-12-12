'use client';

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface ferramentaMarcaI {
  ferramentaId: number;
  modelo: string;
  fabricante: string;
  totalVendida: number;
}

interface geralDadosI {
  clientes: number;
  ferramenta: number;
  pedido: number;
}

type DataRow = [string, number, string];

export default function Principal() {
  const [VendasferramentaMarca, setVendasferramentaMarca] = useState<ferramentaMarcaI[]>([]);
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }

    async function getDadosVendasFerramentas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/ferramentasVendidas`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados das ferramentas vendidas");
        }
        const dados = await response.json();
        setVendasferramentaMarca(dados);
      } catch (error) {
        console.error("Erro ao buscar vendas de ferramentas:", error);
      }
    }

    getDadosGerais();
    getDadosVendasFerramentas();
  }, []);

  const data: (["Modelo", "Quantidade", { role: string }] | DataRow)[] = [
    ["Modelo", "Quantidade", { role: "style" }],
  ];

  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"];

  VendasferramentaMarca.forEach((ferramenta, index) => {
    data.push([
      ferramenta.modelo,
      ferramenta.totalVendida,
      `color: ${cores[index % cores.length]}`,
    ]);
  });

  const options = {
    title: "Quantidade de Ferramentas Vendidas",
    chartArea: { width: "70%" },
    hAxis: { title: "Modelo da Ferramenta", minValue: 0 },
    vAxis: { title: "Quantidade Vendida" },
    backgroundColor: "#2d2d2d",
    titleTextStyle: { color: "#ffffff", fontSize: 18 },
    legend: { position: "none" },
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl mb-10 text-black font-bold">Visão Geral do Sistema</h2>
      {/* Visão Geral */}
      <ul className="flex flex-wrap justify-center m-1">
        <li className="flex justify-center w-3/5 h-60 bg-zinc-800 rounded-lg shadow m-2 relative">
          <div className="p-2 absolute flex flex-col items-center top-10">
            <h5 className="drop-shadow-xl m-2 text-4xl font-bold tracking-tight text-slate-300">
              {dados.pedido}
            </h5>
            <p className="drop-shadow-xl m-2 mt-10 font-medium text-slate-300">Nº Pedidos</p>
          </div>
        </li>
        <li className="flex justify-center w-60 h-60 bg-zinc-800 rounded-lg shadow m-2 relative">
          <div className="p-2 absolute flex flex-col items-center top-10">
            <h5 className="drop-shadow-xl m-2 text-4xl font-bold tracking-tight text-slate-300">
              {dados.clientes}
            </h5>
            <p className="drop-shadow-xl m-2 mt-10 font-medium text-slate-300">Nº Clientes Cadastrados</p>
          </div>
        </li>
        <li className="flex justify-center w-60 h-60 bg-zinc-800 rounded-lg shadow m-2 relative">
          <div className="p-2 absolute flex flex-col items-center top-10">
            <h5 className="drop-shadow-xl m-2 text-4xl font-bold tracking-tight text-slate-300">
              {dados.ferramenta}
            </h5>
            <p className="drop-shadow-xl m-2 mt-10 font-medium text-slate-300">Nº de Posts</p>
          </div>
        </li>
      </ul>

      {/* Gráfico */}
      <h2 className="text-2xl text-slate-900 font-bold mt-4">Gráfico: Nº de Vendas</h2>
      <Chart
        chartType="ColumnChart"
        width="95%"
        height="380px"
        data={data}
        options={options}
      />
    </div>
  );
}
