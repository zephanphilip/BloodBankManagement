import {  useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'



export function useLogin() {

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        if (email === 'admin@gmail.com' && password === 'Admin@123') {
            const adminUser = { email, role: 'admin', token: 'admin' };
            localStorage.setItem('user', JSON.stringify(adminUser));
            dispatch({ type: 'LOGIN', payload: adminUser });
            setIsLoading(false);
            navigate('/admin');
            return;
        }
        const response = await fetch('http://localhost:4000/api/user/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password})
            }
        )
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }
 
    }


  return { login, isLoading, error}
}


