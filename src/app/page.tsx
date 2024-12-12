"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from 'js-cookie'
import Image from 'next/image'
type Inputs = {
  email: string
  senha: string
}

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const router = useRouter()

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [alteraOlho, setAlteraOlho] = useState("olho.png")

  const alteraVisivilidade = () => {
    setMostrarSenha(!mostrarSenha)
    setAlteraOlho(alteraOlho === "olho.png" ? "olhoAberto.png" : "olho.png")
  }

  useEffect(() => {
    setFocus("email")
  }, [setFocus])
  

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha })
    })
    // const response = {
    //   status: 200,
    //   json: async () => ({
    //     id: "1",
    //     nome: "Administrador",
    //     emai: "maria@gmail.com",
    //     token: "admin_token"
    //   })
    // }
     console.log(response)
    if (response.status == 200) {
      const admin = await response.json()

      Cookies.set("admin_logado_id", admin.id)
      Cookies.set("admin_logado_nome", admin.nome)
      Cookies.set("admin_logado_token", admin.token)

      router.push("/principal")
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    }
  }

  return (
    <main className="flex h-screen" >


      <div className="w-screen bg-[url('https://Image .freepik.com/vetores-gratis/desenhos-animados-de-manutencao-de-laptop-de-dispositivo-de-tecnologia_18591-52538.jpg?t=st=1733077760~exp=1733081360~hmac=47dc7a2adc9a5c9977c694776637fd718696dbba14fe70572ae222997fbd7221&w=826')] bg-cover bg-customizado-posicao bg-no-repeat ">
        
      </div>

            
          <div className="p-6 space-y-4 flex flex-col justify-around w-3/6 md:w-3/5 lg:w-96" >
            <h1 className="text-xl flex flex-col items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Ambiente Adimistrativo
              <Image  src="logo.png" alt="logo" className=" w-20 "  />
            </h1>
            <form className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(verificaLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-mail:</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com"
                  required
                  {...register("email")} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Senha de Acesso:</label>
                <div className="flex relative justify-end ">

                  <Image  src={alteraOlho} alt="olho_senha"
                    className=" w-8 absolute mr-2 mt-2  focus:ring-4 focus:outline-none focus:ring-primary-300 "
                    onClick={alteraVisivilidade}
                  />
                  <input type={mostrarSenha ? "text" : "password"}
                    id="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600
                     block w-full p-2.5 "
                    required
                    {...register("senha")} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    {/* <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      {...register("manter")} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Manter Conectado
                    </label> */}
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-blue-500 dark:text-primary-500">Esqueceu sua senha?</a>
              </div>
              
              <button type="submit" 
              className="w-full text-white bg-orange-600 
              hover:bg-primary-700 focus:ring-4 focus:outline-none 
              focus:ring-primary-300 font-medium rounded-lg text-sm 
              px-5 py-2.5 text-center dark:bg-primary-600 
              dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              
              >
                Entrar</button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Você não está cadastrado?
                <Link href="./cadastro" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Cadastre-se</Link>
              </p> */}
            </form>
          
        </div>
     
    </main>
  );
}
