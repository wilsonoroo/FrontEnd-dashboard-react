import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ componente: Componente, permisos = [] }) {
  const { user } = useAuth();
  if (user) {
    // return <Navigate to="/404"/>
    return <Navigate to="/gerencias" />
  } else {
    return <Componente />
  }
}

PublicRoute.propTypes = {
  componente: PropTypes.element,
  permisos: PropTypes.array
}