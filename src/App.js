import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import AuthState from './context/autenticacion/authState';
import ProyectState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar el token
const token = localStorage.getItem('tokenJWT');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <ProyectState>
        <TareaState>
          <AlertaState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AlertaState>
        </TareaState>      
      </ProyectState>
    </AuthState>
  );
}

export default App;
