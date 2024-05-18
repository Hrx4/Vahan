import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";

function App() {
  const [alertOpen, setAlertOpen] = useState(true)
  useEffect(() => {
    if(alertOpen){
      console.log('====================================');
      console.log('kdmf');
      console.log('====================================');
      alert('As i am using render for backend api , so it will take some time to make the api call first time....Please wait after calling the api.....')
      return setAlertOpen(false)
    }
      
  }, [])
  
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
