import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Mapa from "./pages/Mapa";
import Formulario from "./pages/Formulario";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;