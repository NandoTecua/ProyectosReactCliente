import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types/index.js';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Funciones
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('api/proyectos');
 
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    const agregarProyecto = async proyecto => {
       try {
           const resultado = await clienteAxios.post('api/proyectos', proyecto);

           dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data.proyecto
            });
       } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
       }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        });
    }

    const eliminarProyecto = async proyectoID => {
        try {
            const resultado = await clienteAxios.delete(`api/proyectos/${proyectoID}`);
 
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoID
            });

            const alerta = {
                msg: resultado.data.msg,
                categoria: 'alerta-ok'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });


        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;