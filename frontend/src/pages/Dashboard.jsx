import React from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Dashboard = ({user}) => {
    const history = useHistory()
    return (
        <section>
            <h1>Dashboard</h1>
            <p>Welcome</p>
            <Link to="/edit/new_note">Notes</Link>
        </section>
    )
}
const mapDispatchToProps = (state) => {
    return {
        user: state.user
    }
}

export default Dashboard
