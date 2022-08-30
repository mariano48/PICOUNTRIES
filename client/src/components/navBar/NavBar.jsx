import { Link } from "react-router-dom";
import "./navBar.css";

import SearchBar from "../searchBar/Searchbar";

export default function NavBar() {
  return (
    <div className="navMain">
      <h1 className="navText">World Countries</h1>
      <div className="navContainer">
        <Link to="/countries" className="textLinks">
          HOME
        </Link>
        <Link to="/activities/create" className="textLinks">
          CREATE ACTIVITY
        </Link>
        <SearchBar />
      </div>
    </div>
  );
}
