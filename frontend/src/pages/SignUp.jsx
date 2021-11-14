import axios from 'axios'
import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'



const SingUp = (props) => {
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${props.apiUrl}/signup`, {
            email: email,
            password: password,
            name:  name
        }).then(res => {
            if(res.status === 201){
                
            }
            console.log(res.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }
    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'name':
                setName(e.target.value)
                break;
            default:
                console.log('error')         
    }
}

    return (
        <main>
            <Navbar />
            <section>
                <form onSubmit={handleSubmit}>
                    <h1>Sing Up</h1>
                    <input type="text" placeholder="Name" name='name' onChange={handleChange}/>
                    <input type="text" placeholder="Email" name='email' onChange={handleChange}/>
                    <input type="password" placeholder="Password" name='password' onChange={handleChange}/>
                    <button type='submit'>Sing Up</button>
                </form>
            </section>
            
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.apiUrl

    }
}


export default connect(mapStateToProps,null)(SingUp) 
