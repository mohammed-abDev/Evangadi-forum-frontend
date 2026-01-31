import React, { Suspense, lazy } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";

// Lazy-loaded pages
const Login = lazy(() => import("../Auth/Login"));
const Register = lazy(() => import("../Auth/Register"));

function LandingPage({ page }) {
  const renderPage = () => {
    switch (page) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <LayOut>
      <Suspense fallback={<Loader />}>
        {renderPage()}
      </Suspense>
    </LayOut>
  );
}

export default LandingPage;
