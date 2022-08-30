import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing/Landing";
import Home from "./components/home/Home";
import CreateActivity from "./components/createActivity/CreateActivity";
import CountryDetail from "./components/countryDetail/CountryDetail";
import Error from "./components/error/Error";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Layout>
            <Route exact path="/countries" component={Home} />
            <Route exact path="/countries/:id" component={CountryDetail} />
            <Route exact path="/activities/create" component={CreateActivity} />
          </Layout>
          <Route exact path="/error" component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
