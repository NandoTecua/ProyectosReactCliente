import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, actualizarTarea, guardarTareaActual } = tareasContext;

    const { nombre, estado, _id } = tarea;

    // funcion que modifica el estado de la tarea
    const cambiarEstado = tarea => {
        tarea.estado = tarea.estado ? false : true;
        actualizarTarea(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{nombre}</p>
            <div className="estado">
                {estado ?

                    <button
                        type="button"
                        className="completo"
                        onClick={ () => cambiarEstado(tarea) }
                    >Completo</button>    
                
                :
                    
                <button
                    type="button"
                    className="incompleto"
                    onClick={ () => cambiarEstado(tarea) }
                >Incompleto</button> 

                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => guardarTareaActual(tarea) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => eliminarTarea(_id) }
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;