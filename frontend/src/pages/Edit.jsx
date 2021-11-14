import React from 'react'

const Edit = (props) => {
    return (
        <section>
            
            <h1>{props.match.params.id == 'new_note'? 'new note': 'edit note'}</h1>

        </section>
    )
}

export default Edit
