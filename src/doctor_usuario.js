import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuLoggedUser from "./Components/Menu/MenuLoggedUser";

class doctor_usuario extends Component {
   //fincion para ejecutar una funcion en cuanto se cargue la pagina
   componentDidMount() {
      this.inicio();
      this.mostraralergias();
      this.mostrarhabitos();
      this.mostrarpatologicos();
      this.mostrarquirurgicos();
      this.mostrarvacunas();
   }

   //si es usuario quiere entrar sin estar logeado esta funcion lo manda al login principal
   inicio() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var codijo = urlParams.get("codijo");
            db.collection("Usuarios")
               .doc(codijo)
               .onSnapshot((doc) => {
                  const apeliidomaterno = doc.data().ApellidoMaterno;
                  const apeliidopaterno = doc.data().ApellidoPaterno;
                  const nombre = doc.data().Nombre;
                  const correo = doc.data().Email;
                  const telefono = doc.data().Telefono;
                  const estado = doc.data().Estado;
                  const nacimiento = doc.data().Fecha;
                  const imagenperfil = doc.data().ImagenPerfil;
                  const peso = doc.data().Peso;
                  const altura = doc.data().Altura;
                  const imc = doc.data().Imc;
                  document.getElementById("nombre").innerText =
                     nombre + " " + apeliidopaterno + " " + apeliidomaterno;
                  document.getElementById("correo").innerText = correo;
                  document.getElementById("telefono").innerText = telefono;
                  document.getElementById("imagenperfil").src = imagenperfil;
                  document.getElementById("peso").innerText = peso;
                  document.getElementById("altura").innerText = altura;
                  document.getElementById("imc").innerText = imc;
                  var convercion = new Date(nacimiento);
                  var hoy = new Date();
                  var edad = hoy.getFullYear() - convercion.getFullYear();
                  document.getElementById("edadPacientes").innerText = edad;
               });
         } else {
            window.location.href = "/";
         }
      });
   }




   mostraralergias() {
      var vacio = (document.getElementById("alergias").innerText = " ");
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var codijo = urlParams.get("codijo");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + codijo + "/Alergias").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("alergias").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostraralergias = document.getElementById("alergias");
                     mostraralergias.innerHTML += `
              <table class="tabla">
               <tr>
               <td >${doc.data().descripcion}</td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }



   mostrarhabitos() {
      var vacio = (document.getElementById("habitos").innerText = " ");
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var codijo = urlParams.get("codijo");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + codijo + "/Habitos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("habitos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarhabitos = document.getElementById("habitos");
                     mostrarhabitos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }
  
 
   mostrarpatologicos() {
      var vacio = (document.getElementById("patologicos").innerText = " ");
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var codijo = urlParams.get("codijo");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + codijo + "/Patologicos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("patologicos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarpatologicos =
                        document.getElementById("patologicos");
                     mostrarpatologicos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }




   mostrarquirurgicos() {
      var vacio = (document.getElementById("quirurgicos").innerText = " ");
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var codijo = urlParams.get("codijo");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + codijo + "/Quirurgicos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("quirurgicos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarpatologicos =
                        document.getElementById("quirurgicos");
                     mostrarpatologicos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   

   mostrarvacunas() {
      var vacio = (document.getElementById("vacunas").innerText = " ");
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var codijo = urlParams.get("codijo");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + codijo + "/Vacunas").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("vacunas").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarvacunas = document.getElementById("vacunas");
                     mostrarvacunas.innerHTML += `
              <table class="tabla">
               <tr>
               <td >${doc.data().descripcion}</td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   render() {
      return (
         <div onload={this.inicio}>
            <div className="App" id="datos">
               <h1 className="titulo">
                  Mi perfil <i className="ri-user-heart-fill"></i>
               </h1>

               <div className="contenedor contentBlanco">
                  <div className="marcoFoto">
                     <img
                        src=""
                        style={{
                           borderRadius: "50%",
                           width: "100%",
                           height: "100%",
                        }}
                        id="imagenperfil"
                     />
                  </div>
                  <br />
                  <div className="variables">
                     <label className="tituloTabla">
                        Nombre <i className="ri-user-heart-fill"></i>
                     </label>
                     <label id="nombre"></label>
                     <br />
                     <label className="tituloTabla">
                        Correo <i className="ri-mail-fill"></i>
                     </label>
                     <label id="correo"></label>
                     <br />
                     <label className="tituloTabla">
                        Telefono <i className="ri-phone-fill"></i>
                     </label>
                     <label id="telefono"></label>
                     <br />
                  </div>
                  <div className="Salud">
                     <div className="itemSalud">
                        <label>IMC:</label> <label id="imc"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Edad:</label> <label id="edadPacientes"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Peso:</label> <label id="peso"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Altura:</label> <label id="altura"></label>
                     </div>
                  </div>
               </div>
            </div>
            <div className="contenedor " id="tablas">
               <h1 className="titulo">
                  Variables de Salud <i className="ri-capsule-fill"></i>
               </h1>

               <div className="contentApricot gridTabla ">
                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                    
                     <label className="tituloTabla">Lista de Alergias</label>
                     <div id="alergias"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     
                     
                     <label className="tituloTabla">
                        Lista de Habitos y Estilo de vida
                     </label>
                     <div id="habitos"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     
                     <label className="tituloTabla">
                        Lista de antecedente Patologicos
                     </label>
                     <div id="patologicos"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                   
                     <label className="tituloTabla">
                        Lista de antecedentes Quirurgicos
                     </label>
                     <div id="quirurgicos"></div>
                     <br />
                  </div>
                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     
                     <label className="tituloTabla">Lista de Vacunas</label>
                     <div id="vacunas"></div>
                     <br />
                  </div>
               </div>
            </div>

          </div>
      );
   }
}

export default doctor_usuario;
