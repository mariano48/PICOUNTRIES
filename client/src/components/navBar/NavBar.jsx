import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar() {
  return (
    <>
      <div className="navMain">
        <h1 className="navText">World Countries</h1>
      </div>
      <div className="navContainer">
        <div>
          <Link to="/countries" className="textLinks" reloadDocument={true}>
            TO COUNTRIES
          </Link>
          <Link to="/activities/create" className="textLinks">
            CREATE ACTIVITY
          </Link>
        </div>
      </div>
    </>
  );
}
