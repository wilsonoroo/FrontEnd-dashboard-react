import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CustomDrawer from '../layouts/Navbar';
export default function PrivateRoute({ componente: Componente, permisos = [] }) {
  const { user } = useAuth();
  console.log(user)
  if (user) {
    console.log(permisos.includes(user.rol))
    return (
      <CustomDrawer>
        <Componente />
      </CustomDrawer>
    );
  } else {
    return <Navigate to="/login" />
  }
}

PrivateRoute.propTypes = {
  componente: PropTypes.element,
  permisos: PropTypes.array
}