import React from 'react'
import { NavLink } from "react-router-dom";


const Pagination = ({ offersPerPage, totalOffers, paginate}) => {


  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalOffers / offersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className='pagination'>
      {pageNumbers.map(number => (
        <li key={number} className="page-item">
          <a onClick={() => paginate(number)} className="page-link">
            {number}
          </a>
          
        </li>
      ))}
    </nav>
  )
}

export default Pagination