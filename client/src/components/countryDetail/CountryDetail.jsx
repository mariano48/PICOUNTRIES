import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById } from "../../actions";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import ActivityCard from "../activityCard/ActivityCard";
import Error from "../error/Error";
import "./countryDetail.css";

export default function CountryDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.countryDetail);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  if (error) return <Error error={error} />;
  if (!country) return <Loading />;
  return (
    <div className="detailContainer">
      <div>
        <h2>{country.name}</h2>
        <h1>{country.id}</h1>
        <img src={country.flag} alt="" />
      </div>
      <div className="detailsShade">
        <div className="detailsText">
          <p key="a">Capital city: {country.capital}</p>
          <p key="b">Subregion: {country.subregion}</p>
          <p key="c">Area: {country.area}</p>
          <p key="d">Population: {country.population}</p>
          <div>
            <p>Activities:</p>
            {country.activities?.map((a) => (
              <ActivityCard
                name={a.name}
                duration={a.duration}
                season={a.season}
                difficulty={a.difficulty}
                key={a.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
