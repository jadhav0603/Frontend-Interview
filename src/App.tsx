import './App.css'
import Blogs from './Components/Blogs.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBlogForm from "./components/AddBlogForm.jsx";



function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/add-blog" element={<AddBlogForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
