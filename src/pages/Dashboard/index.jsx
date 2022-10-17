import {Icon, Card, DateSelect  } from '~/components';

import { useEffect, useState } from 'react';
import {useLocalStorage, useAsyncFn} from 'react-use'
import { useParams, Navigate } from 'react-router-dom'
import axios from 'axios'

import {format, formatISO} from 'date-fns'


export const Dashboard = () => {
    const params = useParams()
    const [currentDate, setDate] = useState(formatISO(new Date(2022,10,20)))
    const [auth] = useLocalStorage('auth', {})

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
            baseURL: 'http://localhost:3000',
            url: '/games',
            params
        })
        return res.data
    })
    
    useEffect(()=>{
        fetchGames({gameTime: currentDate})
    },[currentDate])

    if (!auth.user?.id){
        return <Navigate to='/' replace={true} />
    }

    const isLoading = games.loading || loading
    const isError = games.error || error
    const isDone = !isLoading && !isError

    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className='container max-w-3xl flex justify-between'>
                    <img src="/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40"/>
                    <a href={`/${auth.user.username}`} className='cursor-pointer'>
                        <Icon name='profile' color="white" className="w-10" />
                    </a>
                </div>

            </header>
            <main className='space-y-6'>
                
                <section id='header' className='bg-red-500 text-white p-4'>
                    <div className='container max-w-3xl space-y-2'>
                        <span>Olá {auth.user.name}</span>
                        <h3 className='text-2xl font-bold py-6'>Qual o seu palpite?</h3>
                    </div>
                </section>
                    
                <section id='content' className='container max-w-3xl p-4 space-y-4'>
                    
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
                        /> )}
                                               
                    </div>
                </section>
            
            </main>
        </>
    )
} 