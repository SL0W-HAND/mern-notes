import axios from 'axios'
import React, {useState} from 'react'
import Navbar from '../components/Navbar'

const SingUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (event:any) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/users/signup', {
            email: email,
            password: password,
            name:  name
        }).then(res => {
            console.log(res.data)
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }
    const handleChange = (e:any) => {
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
                </form>
            </section>
            
        </main>
    )
}

export default SingUp
