'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuLateral } from "../../components/MenuLateral";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const [logado, setLogado] = useState<boolean>(false)

  useEffect(() => {
    if (Cookies.get("admin_logado_id")) {
      setLogado(true)
    } else {
      router.replace("/")
    }
  }, [router])

  return (
    <>
      {logado &&
        <div className="bg-[url('https://img.freepik.com/vetores-gratis/branco-com-conexao-de-rede-low-poly_1017-29753.jpg?t=st=1733078487~exp=1733082087~hmac=c14ddb6da7ea78064dce1f8446254b0021aa40a7215f8bd60efad787ee1db3f0&w=1060')]
        bg-cover h-screen
        
        "
        >
          
          <MenuLateral />
          <div className="p-4 ml-9 ">
            {children}
          </div>
        </div>
      }
    </>
  )
}
