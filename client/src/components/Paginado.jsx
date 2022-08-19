import React from "react";

export default function Paginated({
  countriesPerPage,
  allCountries,
  paginated,
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
      <ul>
        {pageNumbers?.map((n) => {
          return (
            <li key={n}>
              <button onClick={() => paginated(n)}>{n}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
