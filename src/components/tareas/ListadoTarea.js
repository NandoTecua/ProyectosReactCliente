import React, { Fragment, useContext, useEffect } from 'react';
import alertaContext from '../../context/alertas/alertaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTarea = () => {
    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { mensajetarea, tareasproyecto } = tareasContext;

    useEffect( () => {

        if(mensajetarea) {
            mostrarAlerta(mensajetarea.msg, mensajetarea.categoria);
        }
        // eslint-disable-next-line
    }, [mensajetarea] );

    if(proyecto === null) return <h2>Selecciona un proyecto.</h2>;

    return (
        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>
            { alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null }
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 ?
                <li className="tarea"><p>No hay tareas</p></li> :
                    <TransitionGroup>
                        {
                            tareasproyecto.map( tarea => (
                                <CSSTransition 
                                    key={tarea._id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ) )
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => { eliminarProyecto(proyecto._id) }}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTarea;