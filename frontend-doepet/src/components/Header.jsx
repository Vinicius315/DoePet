import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo">🐾 DoePet</div>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/formulario">Formulário</Link>
          <Link to="/login" className="btn-login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;