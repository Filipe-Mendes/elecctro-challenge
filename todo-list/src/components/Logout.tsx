import axios from 'axios'
import '../App.css'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext.tsx';

export default function Logout() {

    const { token, setToken } = useContext(AuthContext);

    async function logoutUser() {
        try {
            const httpOptions = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            console.log(token);
            
            const res = await axios.post(import.meta.env.VITE_API_ENDPOINT + '/logout', {}, httpOptions)
            
            setToken('')
            localStorage.removeItem("token")

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <button onClick={() => logoutUser()} className='button-delete'>Logout</button>
        </div>
    );

}
