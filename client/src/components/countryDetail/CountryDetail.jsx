import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById } from "../../actions";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import ActivityCard from "../activityCard/ActivityCard";
import Error from "../error/Error";
import "./countryDetail.css";
import Layout from "../layout/Layout";

export default function CountryDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.countryDetail);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  if (error)
    return (
      <Layout>
        <Error error={error} />
      </Layout>
    );
  if (!country)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <div className="detailContainer">
        <div className="detailsName">
          <div>
            <h1>{country.id}</h1>
            <h2>{country.name}</h2>
            <img src={country.flag} alt="" />
          </div>
        </div>
        <div className="detailsShade">
          <div className="detailsText">
            <div className="keyInfo" key="a">
              <label>Capital city:</label>
              <p> {country.capital}</p>
            </div>

            <div className="keyInfo" key="b">
              <label>Subregion:</label>
              <p> {country.subregion}</p>
            </div>
            <div className="keyInfo" key="c">
              <label>Area:</label>
              <p> {country.area}</p>
            </div>
            <div className="keyInfo" key="d">
              <label>Population:</label>
              <p> {country.population}</p>
            </div>
            <div>
              <div className="activitiesList">
                <div>
                  <label>Activities:</label>
                  {!country.activities.length ? <p>None</p> : null}
                </div>
                <div className="activitiesCard">
                  {country.activities.length
                    ? country.activities.map((a) => (
                        <ActivityCard
                          name={a.name}
                          duration={a.duration}
                          season={a.season}
                          difficulty={a.difficulty}
                          key={a.id}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
