import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landing/Landing";
import Home from "./components/home/Home";
import CreateActivity from "./components/createActivity/CreateActivity";
import CountryDetail from "./components/countryDetail/CountryDetail";
import Error from "./components/error/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/countries" element={<Home />} />
          <Route exact path="/countries/:id" element={<CountryDetail />} />
          <Route exact path="/activities/create" element={<CreateActivity />} />
          <Route exact path="/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
