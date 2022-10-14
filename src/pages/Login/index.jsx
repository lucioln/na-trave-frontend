import axios from 'axios'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useLocalStorage} from 'react-use'
import { Navigate } from 'react-router-dom'

import { Icon, Input } from "~/components"

const validationSchema = yup.object().shape({
    email: yup.string().email('informe um email válido').required('Preencha com seu email'),
    password: yup.string().required('Preencha uma senha'),

})

export const Login = () => {

    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values)=>{
            const res  = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password
                },
            })
            setAuth(res.data)
        },
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema
    })
    
    if (auth.user?.id){
        return <Navigate to='/dashboard' replace={true} />
    }
    return (
        <div className="">
      
            <header className="p-4  border-b border-red-700">
                <img src="/logo/logo-fundo-branco.svg" className="container max-w-xl flex justify-center w-32 md:w-40"/>
            </header>
            <main className="container max-w-xl flex flex-col p-4">
                <div className="p-4 flex space-x-4 items-center ">
                    <a href="/">
                    <Icon name="back" className="h-6"/>
                    </a>
                    <h2 className="text-red-300 text-xl font-bold">Entre na sua conta</h2>
                </div>

                <form className="p-4 text-xl space-y-6" onSubmit={formik.handleSubmit}>
                    
                    <Input 
                    name='email' 
                    type='text' 
                    placeholder='Digite seu e-mail' 
                    label={'Seu e-mail'}
                    error={formik.touched.email && formik.errors.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    />

                    <Input 
                    name='password' 
                    type='password' 
                    placeholder='Digite sua senha' 
                    label={'Sua senha'}
                    error={formik.touched.password && formik.errors.password}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    />
                <button type='submit' 
                className="flex flex-col w-full text-center text-white bg-red-500  px-6 py-3 rounded-lg cursor-pointer disabled:opacity- 50"
                disabled={!formik.isValid || formik.isSubmitting}>
                    {formik.isSubmitting? 'Carregando...' : 'Entre em sua Conta'}
                </button> 
                
                </form>
            </main>
        </div>
    )
}