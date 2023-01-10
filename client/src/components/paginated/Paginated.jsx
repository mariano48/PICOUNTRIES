import React from 'react';
import './paginated.css';

export default function Paginated({
  countriesPerPage,
  allCountries,
  paginated,
  currentPage
}) {
  const pageNumbers = [];

  for (
    let i = 0;
    i < Math.ceil((allCountries - 9) / countriesPerPage) + 1;
    i++
  ) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={`listita`}>
        <button disabled={currentPage === 1} onClick={() => paginated(1)}>
          {`<<`}
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => paginated(currentPage - 1)}
        >
          {`<`}
        </button>
        {pageNumbers?.map((n) => {
          if (currentPage === n) {
            return <li key={n}>{n}</li>;
          }
          return null;
        })}
        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => {
            paginated(currentPage + 1);
          }}
        >
          {`>`}
        </button>
        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => {
            paginated(pageNumbers.length);
          }}
        >
          {`>>`}
        </button>
      </ul>
    </nav>
  );
}
