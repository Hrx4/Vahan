import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    alert(
      "As i am using render for backend api , so it will take some time to make the api call first time....Please wait after calling the api....."
    );
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
