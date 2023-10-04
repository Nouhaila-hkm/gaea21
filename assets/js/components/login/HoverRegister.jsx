import React from 'react'

export default function HoverRegister({content}) {

    const items = content.items.map((item) =>
        <a href={item.link}><button className={item.class}>{item.title}</button></a>

    );

  return (
      <div>{items}</div>
  )
}
