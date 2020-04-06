import React, { useReducer } from 'react';
//import uuid from 'react-uuid';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    ERROR_TAREA
} from '../../types/index.js';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
        mensajetarea: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTareas = async proyectoId => {
        try {
            const resultado = await clienteAxios.get('api/tareas', { params: { proyectoId } } );
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_TAREA,
                payload: alerta
            });
        }
    }

    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_TAREA,
                payload: alerta
            });
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    const eliminarTarea = async tareaId => {
        try {
            const resultado = await clienteAxios.delete(`api/tareas/${tareaId}`);
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            });
            console.log(resultado.data.msg);
            const alerta = {
                msg: resultado.data.msg,
                categoria: 'alerta-ok'
            }
            dispatch({
                type: ERROR_TAREA,
                payload: alerta
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_TAREA,
                payload: alerta
            });
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_TAREA,
                payload: alerta
            });
        }
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    }

    // Funciones
    

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                mensajetarea: state.mensajetarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;