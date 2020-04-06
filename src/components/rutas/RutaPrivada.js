import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    const authenticationContext = useContext(authContext);
    const { autenticado, cargando, usuarioAutenticado } = authenticationContext;

    useEffect( () => {
        usuarioAutenticado();

        // eslint-disable-next-line
    }, [] );

    return (
        <Route {...props} render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
    );
}
 
export default RutaPrivada;