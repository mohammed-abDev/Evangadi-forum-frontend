import { useContext } from "react";
import "./App.css";
import Routing from "./assets/Routing/Routing";
import Loader from "./assets/Components/Loader/Loader";
import { AppContext } from "./assets/context/AppContext";

function App() {
  const { appLoading } = useContext(AppContext);

  return appLoading ? (
    <div className="loader-container">
      <Loader />
    </div>
  ) : (
    <Routing />
  );
}

export default App;
