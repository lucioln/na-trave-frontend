import axios from 'axios'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import { useLocalStorage} from 'react-use'


import { Icon, Input } from "~/components"

export const SignUp = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    
    const validationSchema = yup.object().shape({
        name: yup.string().required('Preencha seu nome'),
        username: yup.string().required('Preencha seu nome de usuário'),
        email: yup.string().email('informe um email válido').required('Preencha com seu email'),
        password: yup.string().required('Preencha uma senha'),

    })
    
    const formik = useFormik({
        onSubmit: async (values) => {
           const res = await axios({
            method: 'post',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/users',
            data: values
           })
           alert("Usuário Cadastrado");
           window.localStorage.setItem('auth', JSON.stringify(res.data))
           window.location.replace(`${import.meta.env.VITE_API_URL}/login`)

        },
        initialValues:{
            name:'',
            username:'',
            email:'',
            password:''
        },
        validationSchema
    })
    
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
                    <h2 className="text-red-300 text-xl font-bold">Crie sua conta</h2>
                </div>

                <form className="p-4 text-xl space-y-6" onSubmit={formik.handleSubmit}>
                    <Input 
                    name='name' 
                    type='text' 
                    placeholder='Digite seu nome' 
                    label={'Seu nome'} 
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    value = {formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                    />
                    
                    <Input 
                    name='username' 
                    type='username' 
                    placeholder='Digite seu usuário' 
                    label={'Seu usuário'}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && formik.errors.username}
                    value = {formik.values.username} 
                    />

                    <Input 
                    name='email' 
                    type='email' 
                    placeholder='Digite seu e-mail' 
                    label={'Seu e-mail'}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                    value = {formik.values.email} 
                    />

                    <Input 
                    name='password' 
                    type='password' 
                    placeholder='Digite sua senha' 
                    label={'Sua senha'}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password}
                    value = {formik.values.password} 
                    />
                    <button 
                        className="block w-full text-center text-white bg-red-500  px-6 py-3 rounded-lg disabled:opacity- 50"
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting? 'Carregando...' : 'Criar sua Conta'}

                    </button>
                
                </form>
            </main>
        </div>
    )
}