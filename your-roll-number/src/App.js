import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Contact from "./pages/Contact"
import TopNews from "./pages/Topnews"
import Footer from './components/Footer';
import FormAddEdit from './components/FormAddEdit';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/topnews' element={<TopNews/>}></Route>
        <Route path="/add" element={<FormAddEdit />}></Route>
        <Route path="/update/:id" element={<FormAddEdit />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
