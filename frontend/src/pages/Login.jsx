import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'

import { setUser } from '../actions/inex'
import { useHistory } from 'react-router-dom'


import axios from 'axios'

const Login = (props) => {
    const history = useHistory()

    useEffect(() => {
        console.log(props.apiUrl)
    }
    , [])
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email,password)

        axios.post(`${props.apiUrl}/login`,{
            email: email,
            password: password
        }).then(res => {
            
            props.setUser(res.data.user)
            history.push('/dashboard')
        }).catch(err => {
            console.log(err)
        })
    }
    const handleChange = (e) => {
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
                    <button type='submit'>Login</button>
                </form>
            </section>
           
        </main>
    )
}


const mapStateToProps = (state) => {
    return {
        apiUrl: state.apiUrl,
        user: state.user
    }
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
