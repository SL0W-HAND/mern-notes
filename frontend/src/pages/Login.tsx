import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'

import axios from 'axios'

const Login = (props:any) => {
 

    useEffect(() => {
        console.log(props.apiUrl)
    }
    , [])
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log(email,password)
        /*
        axios.post('',{
            email,
            password
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })*/
    }
    const handleChange = (e:any) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    return (
        <main>
            <Navbar />
            <section>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" name='email' placeholder="Email" value={email} onChange={handleChange} />
                    <input type="password" name='password' placeholder="Password" value={password} onChange={handleChange}/>
                    <button>Login</button>
                </form>
            </section>
           
        </main>
    )
}


const mapStateToProps = (state:any) => {
    return {
        apiUrl: state.apiUrl

    }
}

export default connect(mapStateToProps)(Login)
