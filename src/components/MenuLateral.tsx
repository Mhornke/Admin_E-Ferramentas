"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { GiDrill } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs"
import Link from "next/link"
import Image  from "next/image";
import { useState } from "react"
import { useEffect } from "react"
import { FiUsers } from "react-icons/fi"

export function MenuLateral() {
  const router = useRouter()
  const [adminNome, setAdminNome] = useState<string>("")
  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string)
    }
  }, [])

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id")
      Cookies.remove("admin_logado_nome")
      Cookies.remove("admin_logado_token")
      router.replace("/")
    }
  }

  return (
    <aside id="default-sidebar"
      className=" fixed left-0 z-40 w-10 hover:w-72 h-full
    transition-transform -translate-x-full sm:translate-x-0 
    group overflow-y-auto bg-zinc-800  flex justify-between
    flex-col
    "
      aria-label="Sidebar">

 {/* className="h-full overflow-y-auto bg-zinc-800 flex flex-col justify-between group" */}
  <div className="flex flex-col font-medium">
    <ul>
      <li>
        <div className="flex justify-between max-w-screen-xl p-2">
          <Link href="/principal" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image  src="/logo.png" className="h-10" alt="logo" />
            <span className="self-center text-slate-100 font-semibold whitespace-nowrap hidden group-hover:block">
              E-ferramenta
            </span>
          </Link>
        </div>
      </li>
      <li>
        <Link href="/principal" className="flex items-center p-2 hover:bg-gradient-to-br to-slate-400">
          <BiSolidDashboard className="h-5 text-slate-100 text-2xl" />
          <span className="ms-2 mt-1 text-slate-100 hidden group-hover:block">Visão Geral</span>
        </Link>
      </li>
      <li>
        <Link href="/principal/produtos" className="flex items-center p-2 hover:bg-gradient-to-br to-slate-400">
          <GiDrill className="h-5 text-slate-100 text-2xl" />
          <span className="ms-2 mt-1 text-slate-100 hidden group-hover:block">Cadastro de Ferramentas</span>
        </Link>
      </li>
      
      <li>
        <Link href="/principal/Pedidos" className="flex items-center p-2 hover:bg-gradient-to-br to-slate-400">
          <BsCashCoin className="h-5 text-slate-100 text-2xl" />
          <span className="ms-2 mt-1 text-slate-100 hidden group-hover:block">Controle de Pedidos</span>
        </Link>
      </li>
      <li className="hover:bg-gradient-to-br to-slate-400">
        <div className="flex items-center p-2 cursor-pointer">
          <IoExitOutline className="h-5 text-slate-100 text-2xl" />
          <span className="ms-2 mt-1 text-slate-100 hidden group-hover:block" onClick={adminSair}>
            Sair do Sistema
          </span>
        </div>
      </li>
    </ul>
  </div>

  <div className="items-center justify-center mb-5 font-bold text-slate-300 hidden group-hover:flex">
    <FiUsers className="mr-2" />
    {adminNome}
  </div>
</aside>

  )
}