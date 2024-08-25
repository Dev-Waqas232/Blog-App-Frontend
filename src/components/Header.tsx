import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TiThMenuOutline } from "react-icons/ti";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { logout } from "../redux/slices/auth-slice";

export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transitions = useTransition(openDrawer, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
  });

  // Function to handle link click and close the drawer
  const handleLinkClick = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    handleLinkClick();
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className="w-full bg-primaryBackground">
      <nav className="w-[90%] flex justify-between items-center m-auto p-4">
        <div className="flex gap-6">
          <div className="text-2xl font-headingFont">InsightfulPages</div>
          {isAuthenticated && (
            <div className="bg-white w-[300px] rounded-md pe-3 max-[1050px]:hidden">
              <div className="flex gap-2 ps-2 justify-center h-8 items-center">
                <IoSearch />
                <input className="outline-none w-[100%]" />
              </div>
            </div>
          )}
        </div>
        <div className="space-x-4 font-bodyFont max-[760px]:hidden">
          <Link to="/">Home</Link>
          <Link to="/blog/add-blog">Add Blog</Link>
          <Link to="/feed">Your Feed</Link>
          <Link to="/">Contact Us</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn w-20">
              Logout
            </button>
          ) : (
            <button className="btn w-20">
              <Link to="/auth/login">Login</Link>
            </button>
          )}
        </div>
        <div
          onClick={() => {
            setOpenDrawer(!openDrawer); // Toggles drawer open/close
          }}
          className="min-[760px]:hidden bg-buttonBg w-10 h-9 cursor-pointer flex justify-center items-center rounded-md"
        >
          <TiThMenuOutline size={24} color="white" />
        </div>
      </nav>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="min-[760px]:hidden absolute top-0 right-0 z-10 w-[300px] min-h-screen bg-primaryBackground"
            >
              <div className=" mt-5 ms-5 flex justify-between me-5 items-center">
                <div className="text-2xl font-headingFont">InsightfulPages</div>
                <div
                  onClick={() => setOpenDrawer(false)}
                  className="btn w-10 h-5 cursor-pointer flex justify-center items-center"
                >
                  <IoClose size={20} />
                </div>
              </div>
              <div className="space-y-4 ms-5 mt-10 font-bodyFont">
                <Link to="/" onClick={handleLinkClick} className="block">
                  Home
                </Link>
                <Link
                  to="/blog/add-blog"
                  onClick={handleLinkClick}
                  className="block"
                >
                  Add Blog
                </Link>
                <Link to="/feed" onClick={handleLinkClick} className="block">
                  Your Feed
                </Link>
                <Link to="/" onClick={handleLinkClick} className="block">
                  Contact Us
                </Link>
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="btn w-20">
                    Logout
                  </button>
                ) : (
                  <button onClick={handleLinkClick} className="btn w-20">
                    <Link to="/auth/login">Login</Link>
                  </button>
                )}
              </div>
            </animated.div>
          )
      )}
    </section>
  );
}
