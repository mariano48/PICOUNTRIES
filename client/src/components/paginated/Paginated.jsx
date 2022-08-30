import React from "react";
import "./paginated.css";

export default function Paginated({
  countriesPerPage,
  allCountries,
  paginated,
  currentPage,
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
        {pageNumbers?.map((n) => {
          return (
            <li key={n}>
              <button
                onClick={() => paginated(n)}
                className={`${currentPage === n ? "active" : null}`}
              >
                {n}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
