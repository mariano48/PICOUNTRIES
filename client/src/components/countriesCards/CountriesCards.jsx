import { Link } from "react-router-dom";
import Card from "../countryCard/CountryCard";
import "./countriesCard.css";

export default function Cards({ countries }) {
  return (
    <div className="gridContainer">
      {countries?.map((c) => {
        return (
          <Link to={`/countries/${c.id}`} key={c.id}>
            <Card
              name={c.name}
              image={c.flag}
              continent={c.continent}
              key={c.id}
            />
          </Link>
        );
      })}
    </div>
  );
}
