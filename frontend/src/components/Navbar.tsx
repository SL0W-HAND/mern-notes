import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <nav className='Navbar__container'>
                <div>
                    <span><Link to='/'>Your notes</Link></span>
                </div>
                <div className='Navbar__container_buttons' >
                    <span><Link to='/singup' className='signUp'> Sign-UP </Link></span>
                    <span><Link to='/login' className='login'> Sign-In </Link></span>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
