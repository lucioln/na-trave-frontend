import axios from 'axios'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useLocalStorage} from 'react-use'

const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required(),
})

export const Card = ({gameId,homeTeam,awayTeam, gameTime, homeTeamScore, awayTeamScore, disabled}) => {

    const [auth] = useLocalStorage('auth')

    const formik = useFormik({
        onSubmit: async (values)=>{
           axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/hunches',
                headers: {
                    authorization: `Bearer ${auth.acessToken}`
                },
                data: {
                    ...values,
                    gameId
                }
            })
        },
        initialValues:{
            homeTeamScore,
            awayTeamScore
        },
        validationSchema
    })

    return (
    <div className='rounded-xl border border-gray-300 p-4 text-center'>
        
        <span className='text-xs md:text-base text-grey-700 font-bold'>{gameTime} BRL</span>
        
        <form className='flex justify-center'>
        
            <div className='flex items-center space-x-2'>
                <span className='uppercase'>{homeTeam}</span>
                <img src={`/imgs/flags/${homeTeam}.png`}/>
            </div>
            
            <div className='flex items-center mx-2 text-red-700 font-bold'>
                
                <input 
                name='homeTeamScore'
                type="number" 
                value={formik.values.homeTeamScore}
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit}   
                className='bg-red-700  bg-opacity-10 w-[55px] h-[55px] text-center rounded-3xl p-2' 
                min={0}
                disabled={disabled}  
                />
                
                <h3 className='mx-2'>X</h3>
                
                <input 
                name='awayTeamScore'
                type="number" 
                value={formik.values.awayTeamScore}
                onChange={formik.handleChange}
                onBlur={formik.handleSubmit} 
                className='bg-red-700  bg-opacity-10 w-[55px] h-[55px] text-center rounded-3xl p-2' 
                min={0} 
                disabled={disabled}  

                />

            </div>
            
            <div className='flex items-center space-x-2'>
                <img src={`/imgs/flags/${awayTeam}.png`}/>
                <span className='uppercase'>{awayTeam}</span>
            </div>

        </form>
    
    </div>
)
}