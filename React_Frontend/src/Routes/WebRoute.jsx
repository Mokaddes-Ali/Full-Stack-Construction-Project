import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/homePage";


const AppRoute = () => {


  return (
    <>
 <Routes>
      <Route path="/" element={<HomePage/>} />
            
          </Routes>
    </>
  )
}

export default AppRoute
