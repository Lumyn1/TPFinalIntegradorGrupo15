import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

import "../../css/Header.css";

const Header = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>Panel Administrador</h2>

      {admin && (
        <div className="header-info">
          <span>
            {admin.nombre} - {admin.sector}
          </span>

          <button onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;