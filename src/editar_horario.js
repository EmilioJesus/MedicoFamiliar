import React, { Component, useImperativeHandle } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import logo from "./imagenes/perfil_predeterminada.jpg";
import MenuDoctor from "./Components/Menu/MenuDoctor";

class editar_horario extends Component {
   //fincion para ejecutar una funcion en cuanto se cargue la pagina
   componentDidMount() {
      this.inicio();
      this.editar();
     
   }

   //si es usuario quiere entrar sin estar logeado esta funcion lo manda al login principal
   inicio() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
           
         } else {
            alert("Usuario no logeado");
            window.location.href = "/";
         }
      });
   }
   //funcion para cerrar sesion firebase te la da por default
  
    editar()
    {
        firebase.auth().onAuthStateChanged((user) => {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var codijo= urlParams.get('codijo');
            var dia = urlParams.get('dia');
            var tipocita = urlParams.get('tipocita');
            var horario = urlParams.get('horario');
            document.getElementById('horariocita').innerText=horario;
            document.getElementById('dia').innerText=dia;
            document.getElementById('tipocita').innerText=tipocita;
        })
    }

    editarhorario()
    {
        firebase.auth().onAuthStateChanged((user) => {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var codijo= urlParams.get('codijo');
            var dia = urlParams.get('dia');
            var tipocita = urlParams.get('tipocita');
            var horario = urlParams.get('horario');
            var horainicio = document.getElementById("horainicio").value;
            var horatermino = document.getElementById("horatermino").value;
            var horacita = horainicio + "-" + horatermino;
            if(tipocita=="Linea")
            {
                db.collection("Usuarios/"+uid+"/HorariosLinea/"+dia+"/"+dia+"1").doc(codijo).update({
                    hora: horacita
                  }).then(function() {
                    console.log("Frank created");
                    db.collection("Usuarios/"+uid+"/HorariosLineaDoctor/"+dia+"/"+dia+"1").doc(codijo).update({
                        hora: horacita,
                      }).then(function() {
                        console.log("Frank created");
                        window.location.href = "/perfil_doctor";
                      });
                  });

            }else
            {
                if(dia=="Linea")
                {
                    db.collection("Usuarios/"+uid+"/HorariosLinea/"+dia+"/"+dia+"1").doc(codijo).update({
                        hora: horacita,
                      }).then(function() {
                        console.log("Frank created");
                        db.collection("Usuarios/"+uid+"/HorariosLineaDoctor/"+dia+"/"+dia+"1").doc(codijo).update({
                            hora: horacita,
                          }).then(function() {
                            console.log("Frank created");
                            window.location.href = "/perfil_doctor";
                          });
                      });
    
                }else
                {
                    db.collection("Usuarios/"+uid+"/HorariosPresencial/"+dia+"/"+dia+"1").doc(codijo).update({
                        hora: horacita,
                      }).then(function() {
                        console.log("Frank created");
                        db.collection("Usuarios/"+uid+"/HorariosPresencialDoctor/"+dia+"/"+dia+"1").doc(codijo).update({
                            hora: horacita,
                          }).then(function() {
                            console.log("Frank created");
                            window.location.href = "/perfil_doctor";
                          });
                      });
                }


            }
           
        })

    }

    cancelar()
   {
      window.location.href ='/perfil_doctor';

   }

   //html que se muestra en la pagina
   render() {
      return (
         <div >
             <div id="mostrar_datos">
             <h2>Datos de la cita</h2>
             <label>Horario:</label><label id="horariocita"></label><br/>
             <label>Dia:</label><label id="dia"></label><br/>
             <label>Tipo de cita:</label><label id="tipocita"></label><br/>
             </div>
             <div id="recuperar datos">
             <h2>Modificar horario</h2>
             <label>Ingresa la hora de Inicio</label><br />
             <input type="time" name="hora" id="horainicio" /><br />
             <label>Ingresa la hora de Termino</label><br />
             <input type="time" name="hora" id="horatermino" /><br />
             <input type="button" value="Editar"onClick={this.editarhorario}></input><br />
             <input type="button" value="Cancelar"onClick={this.cancelar}></input>
             </div>
         </div>
      );
   }
}

export default editar_horario;
