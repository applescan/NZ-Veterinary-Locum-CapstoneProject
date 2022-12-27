import React from 'react'

export default function PageHeader(props) {
    return (
        <div className='Page-header' style={{ backgroundImage: `url(${props.background})` }}>
            <h4>{props.maoriTitle}</h4>
            <h1>{props.englishTitle}</h1>
            <p>{props.text}</p>
        </div>
    )
}
