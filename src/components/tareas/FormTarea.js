import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, actualizarTarea, limpiarTarea } = tareasContext;

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    useEffect( () => {
        if(tareaseleccionada !== null)
            guardarTarea(tareaseleccionada);
    }, [tareaseleccionada] );

    if(proyecto === null) return null;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }
    
    const onSubmitTarea = e => {
        e.preventDefault();

        //validar
        if(tarea.nombre.trim() === '')
        {
            validarTarea();
            return;
        }

        if(Object.keys(tarea).length === 1) {
            //adaptar tarea
            tarea.proyectoId = proyecto._id;

            //agregar tarea
            agregarTarea(tarea);            
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }

        //obtenerTareas(proyecto._id);
        
        //reiniciar el form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la Tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={tarea.nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={Object.keys(tarea).length === 1 ? "Agregar Tarea" : "Actualizar Tarea"}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio.</p> : null}
        </div>
    );
}
 
export default FormTarea;