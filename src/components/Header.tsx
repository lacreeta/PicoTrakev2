import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-teal-500 text-white py-4 px-8 flex items-center justify-between">
      <div className="text-2xl font-bold flex items-center">
        <Link to="/" className="flex items-center">
          Pic
          <img src="/public/Logo.png" alt="Icono" className="h-8 inline" />
          trake
        </Link>
      </div>
      {/* Navegación */}
      <nav className="flex gap-4">
        <Link to="/registro" className="hover:opacity-80">
          Crear Cuenta
        </Link>
        <Link to="/login" className="hover:opacity-80">
          Iniciar Sesión
        </Link>
      </nav>
    </header>
  );
};

export default Header;