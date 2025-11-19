
import Navbar from "./components/Navbar"
import Continder from "./components/Continder"
import Footer from "./components/Footer"
import AllLinks from "./components/AllLinks"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Navbar />
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Continder/>}></Route>
<Route path="/alllinks" element={<AllLinks/>}></Route>
    </Routes>
     
    <Footer />
    </BrowserRouter>
    <ToastContainer position="top-center" />
    </>
  )
}

export default App
