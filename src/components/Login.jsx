import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LogIn({setToken}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`,
                {
                    method: "POST",
                    headers:{
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                            email: email, 
                            password: password
                        })
                }
            )
            const result = await response.json()
            setToken(result.token)
            navigate("/")
            console.log(result.token)
        }catch(error){
            console.error(
				"Something went wrong with log in!",
				error
			)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="forms">
            <label>
                Email
                <input 
                name="email" 
                onChange={(event)=> setEmail(event.target.value)} 
                value={email} required/>
            </label>
            <label>
                Password
                <input 
                name="password" 
                onChange={(event)=> setPassword(event.target.value)} 
                value={password} minLength={6} required/>
            </label>
            <button>Log In</button>
        </form>
        <div className="forms">
            <p>Need to register? Navigate here:</p>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
        </>
    )
}

export default LogIn