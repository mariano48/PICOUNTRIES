import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1 className="landingText">World Countries</h1>
      <div className="bannerLanding">
        <Link to="/countries" className="landingStart">
          Start...
        </Link>
      </div>
    </div>
  );
}
