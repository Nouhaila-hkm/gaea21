import React from 'react'

export default function Text({ content }) {

    const items = content.items.map((item) =>
        <p className='text'>{item.text}</p>

    );

    return (
        <div>{items}</div>
    )
}