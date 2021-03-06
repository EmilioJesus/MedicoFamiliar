import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   onload,
} from "react-router-dom";
import Paciente from "./regis_pacientes";
import Medico from "./regis_medico";
import Iniciar from "./iniciar";
import PerfilPaciente from "./perfil_paciente";
import PerfilDoctor from "./perfil_doctor";
import Contraseña from "./contrasena";
import Principal from "./principalpaciente";
import Agendar from "./agendar";
import CitasPaciente from "./citaspaciente";
import Principaldoctor from "./principaldoctor";
import Medicoprincipal from "./principalmedico";
import Agendarmedico from "./agendarmedico";
import Footer from "./Components/Footer/Footer";
import Editarhorario from "./editar_horario";
import Doctorusuario from "./doctor_usuario";
import Zoom from "./Components/Zoom/Zoom";
import Zoom_Paciente from "./Components/Zoom/Zoom_Paciente/Zoom_Paciente.jsx";
//rutas para poder ingresar a los documentos
function App() {
   return (
      <Router>
         <Switch>
            <Route path="/zoomUser">
               <Zoom_Paciente />
            </Route>
            <Route path="/zoom">
               <Zoom />
            </Route>
            <Route path="/doctor_usuario">
               <Doctorusuario />
            </Route>
            <Route path="/editar_horario">
               <Editarhorario />
            </Route>
            <Route path="/agendarmedico">
               <Agendarmedico />
            </Route>
            <Route path="/principaldoctor">
               <Principaldoctor />
            </Route>
            <Route path="/citaspaciente">
               <CitasPaciente />
            </Route>
            <Route path="/agendar">
               <Agendar />
            </Route>
            <Route path="/principal">
               <Principal />
            </Route>
            <Route path="/contrasena">
               <Contraseña />
            </Route>
            <Route path="/perfil_paciente">
               <PerfilPaciente />
            </Route>
            <Route path="/perfil_doctor">
               <PerfilDoctor />
            </Route>
            <Route path="/registrarpaciente">
               <Paciente />
            </Route>
            <Route path="/registrarmedico">
               <Medico />
            </Route>
            <Route path="/iniciarsesion">
               <Iniciar />
            </Route>
            <Route path="/">
               <Medicoprincipal />
            </Route>
         </Switch>
         <Footer />
      </Router>
   );
}

export default App;
