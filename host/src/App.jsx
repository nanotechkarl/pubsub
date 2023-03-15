import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
const Mfe1 = React.lazy(() => import("mfe1/mfe1"));
const Mfe2 = React.lazy(() => import("mfe2/mfe2"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback="Loading...">
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <>
              <Mfe1 />
              <Mfe2 />
            </>
          }
        />
        <Route path="mfe2" element={<Mfe2 />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Mfe1</NavLink>
        </li>
        <li>
          <NavLink to="/mfe2">Mfe2</NavLink>
        </li>
      </ul>
    </nav>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
