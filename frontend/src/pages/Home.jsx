import React from 'react'

//components
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <main className='Home_container'>
            <Navbar />
            <section className='Home_content'>
                <div>
                    <h1>Welcome to mern notes</h1>
                    <p>
                        This is a simple note taking app built with <strong>MERN</strong> stack.
                    </p>
                </div>
                <div>
                    
                </div>

            </section>
        </main>
    )
}

export default Home
