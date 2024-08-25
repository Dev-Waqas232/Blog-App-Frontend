import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  function handleNavigate() {
    const route = isAuthenticated ? "/feed" : "/auth/login";
    navigate(route);
  }
  return (
    <header className="hero flex flex-col justify-center font-bodyFont">
      <div className="w-[90%] m-auto">
        <div className="md:w-[40%] max-md:text-center">
          <h2 className="text-3xl">
            Explore the Depths of Knowledge with
            <span className="font-headingFont"> Insightful Pages</span>
          </h2>
          <p>
            Dive into Thoughtful Insights, Engaging Ideas, and Enlightening
            Perspectives on a Variety of Topics
          </p>
          <button onClick={handleNavigate} className="btn w-40 mt-6">
            Explore Now
          </button>
        </div>
      </div>
    </header>
  );
}
