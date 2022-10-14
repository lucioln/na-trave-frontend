import { Navigate } from "react-router-dom"
import {useLocalStorage} from 'react-use'



export default function Home() {
  const [auth] = useLocalStorage('auth', {})

  if (auth.user?.id){
    return <Navigate to='/dashboard' replace={true} />
  }
  
  return (
    <div className="flex flex-col items-center p-4 space-y-6 h-screen bg-red-300 text-white">
      
      <header className="p-4 container max-w-5xl flex justify-center">
        <img src="/logo/logo-fundo-vinho.svg" className="w-40"/>
      </header>
      
      <div className="container max-w-5xl p-4 flex-1 flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6" >
        <div className="md:flex-1 flex items-center">
          <img src="/imgs/photo.png" className="w-full max-w-lg" alt="torcedores da seleçao brasileira"/>
        </div>
        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-3xl text-center font-bold md:text-left">Dê o seu palpite na Copa do Mundo do Catar 2022!</h1>

          <a href="/signup" className="text-center text-red-300 bg-white text-xl px-6 py-4 rounded-lg cursor-pointer">Criar minha conta</a>
          <a href="/login" className="text-center text-white bg-red-300 text-xl px-6 py-4 rounded-lg border border-white cursor-pointer">Fazer Login</a>
        
        </div>
      </div>
    </div>
  )
}


