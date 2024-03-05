import { useState } from "react"
import { Link, Navigate } from 'react-router-dom'

import axios from 'axios'
const Register = () => {


    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            if (!enteredUsername || !enteredPassword) {
                setIsError(true)
                return setErrorMessage("fill all credentials")
            }


            const { data } = await axios.post('/auth/register', {
                username: enteredUsername, password: enteredPassword
            })
            if (data) {
                setIsSuccess(true)
                setTimeout(() => {
                    setRedirect(true)
                }, 2000)

                return setSuccessMessage(data.message);
            }

            setIsError(true)
            return setErrorMessage("Invalid credentials")



        } catch (error) {
            setIsError(true)
            return setErrorMessage("Internal server error! Try again later")
        }
    }


    if (redirect) {
        return <Navigate to='/login' />
    }

    return (
        <div className="block max-w-md mx-auto">
            <div className="mt-16">

                <h1 className="text-center text-4xl mb-16">Register Form</h1>


                <form className="flex flex-col gap-4  items-center"
                    onSubmit={loginHandler}
                >
                    <input type="text" placeholder="username" className="input" value={enteredUsername}
                        onChange={e => setEnteredUsername(e.target.value)}
                    />
                    <input type="password" placeholder="password" className="input"
                        value={enteredPassword}
                        onChange={e => setEnteredPassword(e.target.value)}
                    />
                    {isError && (
                        <div className="text-center mb-3 text-red-600">{errorMessage}</div>
                    )}
                    {isSuccess && (
                        <div className="text-center mb-3 text-blue-500">{successMessage}</div>
                    )}
                    <button type="submit" className="bg-blue-500 px-4 py-2 text-white w-1/2">Register</button>
                </form>
                <div className="text-center mt-4">Already a member? <Link to='/login' className="text-blue-700">Login</Link></div>
            </div>
        </div>
    )
}

export default Register