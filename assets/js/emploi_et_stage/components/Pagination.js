import React, {useState} from 'react'

const Pagination = ({offersPerPage, totalOffers, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalOffers / offersPerPage); i++) {
    pageNumbers.push(i);
  }

  const [isActive, setIsActive] = useState(null);

  const handlePaginate = (index, number) => {

    paginate(number);

    setIsActive((prev) => {
      return prev === index ? null : index;
  });
  }
  return (
    <nav className='pagination-container'>
    <ul>
      {pageNumbers.map((number, index) => (
        <li key={number} className="page-item">
        <a onClick={() => handlePaginate(index, number)} className={`page-link ${isActive === index ? 'active' : ''}`}>
            {number}
          </a>
        </li>
      ))}
      </ul>
    </nav>
  )
}

export default Pagination