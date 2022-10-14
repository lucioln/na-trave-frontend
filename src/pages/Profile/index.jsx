import {Icon, Card, DateSelect  } from '~/components';

import { useState , useEffect} from 'react';
import {useLocalStorage, useAsyncFn} from 'react-use'
import {  useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'
import {format, formatISO} from 'date-fns'




export const Profile = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [currentDate, setDate] = useState(formatISO(new Date(2022,10,20)))
    const [auth, setAuth] = useLocalStorage('auth',{})
    
    const [{value: user, loading, error}, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`,
        })
        
        const hunches = res.data.hunches.reduce((acc, hunch)=> {
            acc[hunch.gameId] = hunch
            return acc
        },{})


        return {
            ...res.data,
            hunches
        }
    }) 

    const [games,fetchGames] = useAsyncFn(async(params)=>{
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })

    useEffect(()=>{
        fetchHunches()  
    },[])
    
    useEffect(()=>{
        fetchGames({gameTime: currentDate})
    },[currentDate])

    const isLoading = games.loading || loading
    const isError = games.error || error
    const isDone = !isLoading && !isError

    const logout = () =>{
         setAuth({})
         navigate('/login')
    }
    
    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className='container max-w-3xl flex justify-between'>
                    <img src="/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40"/>
                    {auth?.user?.id && (<div onClick={logout} className='p-2 cursor-pointer'>
                        Sair
                    </div>)}
                </div>
            </header>
            <main className='space-y-6'>
                
                <section id='header' className='bg-red-500 text-white p-4 space-y-2'>
                    <div className='container max-w-3xl'>
                        <a href='/dashboard'>
                            <Icon name="back" className="w-10" />
                        </a>
                        <h3 className='text-2xl font-bold py-6'>{user?.name}</h3>
                    </div>
                </section>
                    
                <section id='content' className='container max-w-3xl p-4 space-y-4'>
                    
                    <h2 className='text-xl text-red-700 font-bold'>Seus palpites</h2>

                    <DateSelect currentDate={currentDate} onChange={setDate}/>
                    
                    <div className='space-y-4'>
                        {isLoading && 'Carregando jogos...'}
                        {isError && 'Ops! Algo deu errado.'}
                        {isDone && games.value?.map(game => 
                            <Card
                                key={game.id}
                                gameId={game.id}
                                homeTeam={game.homeTeam}
                                awayTeam={game.awayTeam}
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || ''}
                                disabled={true}
                            /> 
                        )}
                    </div>
                    
                </section>
            
            </main>
        </>
    )
} 