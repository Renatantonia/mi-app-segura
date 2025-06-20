import { Navigate } from 'react-router-dom';

function RutaPrivada({ children }) {
  const usuario = localStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/login" replace />;
}

export default RutaPrivada;
