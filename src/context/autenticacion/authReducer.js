import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index.js';

export default (state, action) => {
    switch(action.type) {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('tokenJWT', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('tokenJWT');
            return {
                ...state,
                token: null,
                mensaje: action.payload,
                usuario: null,
                cargando: false,
                autenticado: false,
            }
        case CERRAR_SESION:
            return {
                ...state,
                token: null,
                autenticado: false,
                usuario: null,
                cargando: false
            }
        default:
            return state;
    }
}
