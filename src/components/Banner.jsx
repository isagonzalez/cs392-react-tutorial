import "./Banner.css";
import Navigation from "./Navigation";

const Banner = ({ title }) => (
  <div className="banner">
    <h1>{title}</h1>
    <Navigation />
  </div>
);

export default Banner;
