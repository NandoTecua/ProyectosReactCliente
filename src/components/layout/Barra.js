import React, { useContext } from 'react';
import authContext from '../../context/autenticacion/authContext';

const Barra = () => {
    const authenticationContext = useContext(authContext);
    const { usuario, cerrarSesion } = authenticationContext;

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >Cerrar Sesion</button>
            </nav>
        </header>
    );
}
 
export default Barra;