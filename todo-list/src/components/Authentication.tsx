import axios from 'axios'
import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.tsx';

export default function Authentication() {
    // const [token, setToken] = useState('');

    const { setToken } = useContext(AuthContext);
    const [login, setLogin] = useState(true); //true for login mode, false for register mode
    const [loginInfo, setLoginInfo] = useState<{ username: string, password: string }>({ username: '', password: '' });
    const [registerInfo, setRegisterInfo] = useState<{ name: string, username: string, password: string, email: string }>({ name: '', username: '', password: '', email: '' });



    function updateFromLocalStorage() {
        const ul = localStorage.getItem("login_info")
        const ull = ul ? JSON.parse(ul) : { username: '', password: '' }
        setLoginInfo(ull)

        const ur = localStorage.getItem("register_info")
        const urr = ur ? JSON.parse(ur) : { name: '', username: '', password: '', email: '' }
        setRegisterInfo(urr)
    }

    useEffect(() => {
        console.log("USE EFFECT")
        updateFromLocalStorage()
    }, [])

    async function loginUser(){
        try {
            const res = await axios.post(import.meta.env.VITE_API_ENDPOINT + '/login', {
                username: loginInfo.username,
                password: loginInfo.password
            })
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)

        } catch (error) {
            console.log(error)
        }
    }

    async function registerUser(){
        try {
            const res = await axios.post(import.meta.env.VITE_API_ENDPOINT + '/users', {
                username: registerInfo.username,
                name: registerInfo.name,
                email: registerInfo.email,
                password: registerInfo.password
            })
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='login-window'>
            <div className='login-buttons'>
                <button onClick={() => { setLogin(true) }} className='button-action'>Login</button>
                <button onClick={() => { setLogin(false) }} className='button-action'>Register</button>
            </div>
            <div >
                {login ?
                    <div className=''>
                        <div className='login-info'>
                            <h2>Username:</h2>
                            <input
                                className='textinput' type="text" id="username"
                                name="username"
                                onChange={(e) => {
                                    const info = { username: e.target.value, password: loginInfo.password }
                                    setLoginInfo(info)
                                    localStorage.setItem("login_info", JSON.stringify(info))
                                }}
                                value={loginInfo.username} placeholder="Username" required
                            />
                            <h2>Password:</h2>
                            <input
                                className='textinput' type="password" id="password"
                                name="password"
                                onChange={(e) => {
                                    const info = { username: loginInfo.username, password: e.target.value }
                                    setLoginInfo(info)
                                    localStorage.setItem("login_info", JSON.stringify(info))
                                }}
                                value={loginInfo.password}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className='confirm-login-button'>
                            <button onClick={() => loginUser()} className='button-action login-button'>Login</button>
                        </div>
                    </div>
                    :
                    <div className=''>
                        <div className='login-info'>
                            <h2>Name:</h2>
                            <input
                                className='textinput' type="text" id="name"
                                name="name"
                                onChange={(e) => {
                                    const info = { name: e.target.value, username: registerInfo.username, password: registerInfo.password, email: registerInfo.email }
                                    setRegisterInfo(info)
                                    localStorage.setItem("register_info", JSON.stringify(info))
                                }}
                                value={registerInfo.name} placeholder="Name" required
                            />
                            <h2>Username:</h2>
                            <input
                                className='textinput' type="text" id="username"
                                name="username"
                                onChange={(e) => {
                                    const info = { name: registerInfo.name, username: e.target.value, password: registerInfo.password, email: registerInfo.email }
                                    setRegisterInfo(info)
                                    localStorage.setItem("register_info", JSON.stringify(info))
                                }}
                                value={registerInfo.username} placeholder="Username" required
                            />
                            <h2>Email:</h2>
                            <input
                                className='textinput' type="text" id="email"
                                name="email"
                                onChange={(e) => {
                                    const info = { name: registerInfo.name, username: registerInfo.username, password: registerInfo.password, email: e.target.value }
                                    setRegisterInfo(info)
                                    localStorage.setItem("register_info", JSON.stringify(info))
                                }}
                                value={registerInfo.email} placeholder="Email" required
                            />
                            <h2>Password:</h2>
                            <input
                                className='textinput' type="password" id="password"
                                name="password"
                                onChange={(e) => {
                                    setRegisterInfo({ name: registerInfo.name, username: registerInfo.username, password: e.target.value, email: registerInfo.email })
                                    localStorage.setItem("register_info", JSON.stringify(registerInfo))
                                }}
                                value={registerInfo.password}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className='confirm-login-button'>
                            <button onClick={() => registerUser()} className='button-action login-button'>Register</button>
                        </div>
                    </div>
                }


            </div>

        </div>

    );

}
