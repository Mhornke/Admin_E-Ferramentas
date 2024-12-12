'use client'
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi"

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("")

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string)
    }
  }, [])

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-600 border flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      
      <div className="flex me-4 items-center font-bold">
        <FiUsers className="mr-2" />
        {adminNome}
      </div>
    </nav>
  )
}