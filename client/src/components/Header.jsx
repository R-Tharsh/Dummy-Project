/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../services/apiService";

export default function NavbarAvatar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutUserAPI(); // Call the API to revoke the token
      localStorage.removeItem("token"); // Clear the token from localStorage
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally handle the error (e.g., show a notification)
    }
  };

  return (
    <>
      {/* <!-- Header --> */}
      <header className="relative z-20 w-full border-b shadow-lg bg-white/90 border-slate-200 shadow-slate-700/5 lg:backdrop-blur-sm font-poppins">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[4rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/* <!-- Brand logo --> */}
            <Link
              id="Assignment"
              aria-label="Assignment logo"
              aria-current="page"
              className="flex items-center gap-2 font-bold py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1"
              to="/"
            >
              Mockup Task
            </Link>

            {/* <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }`}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>

            {/* <!-- Navigation links --> */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6 ml-auto">
              <Link
                to="/posts"
                className="text-slate-700 hover:text-emerald-500 transition duration-300 font-medium"
              >
                Posts
              </Link>
              <Link
                to="/crud"
                className="text-slate-700 hover:text-emerald-500 transition duration-300 font-medium"
              >
                CRUD
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-red-500 focus:text-red-600 focus:outline-none lg:px-8"
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
