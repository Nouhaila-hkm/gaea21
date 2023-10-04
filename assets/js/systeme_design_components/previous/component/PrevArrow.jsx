import React from 'react'

function PrevArrow({link}) {
  return (
  

    <div className="previous">
        <svg  className="svg-prev" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fillRule="evenodd" clipRule="evenodd" strokeWidth={4}>
        <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </svg>
        <a href={link}>Précédent</a>
    </div>
  )
}

export default PrevArrow