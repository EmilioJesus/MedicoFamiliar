import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuDoctor from "./Components/Menu/MenuDoctor";

class principaldoctor extends Component {
   componentDidMount() {
      this.inicio();
      this.citas();
      this.citascanceladas();
      this.citasrealizadas();
   }

   inicio() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var hoy = new Date();
            var fechahoy = Date.parse(
               hoy.getUTCFullYear() +
                  "-" +
                  (hoy.getMonth() + 1) +
                  "-" +
                  hoy.getDate()
            );
            var citas = document.getElementById("citas");
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  var fechatermino = Date.parse(doc.data().Terminoinscripcion);
                  if (fechatermino > fechahoy) {
                     alert("todavia no se vence la inscripcion");
                  } else {
                     alert("la inscripcion ya se vencio");
                     window.location.href = "/perfil_doctor";
                  }
               });
         } else {
            window.location.href = "/";
         }
      });
   }

   citas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("citas");
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  if (doc.data().TipoUsuario == "Doctor") {
                     db.collection("Usuarios/" + uid + "/Citas")
                        .orderBy("timestamp", "asc")
                        .onSnapshot((querySnapshot) => {
                           querySnapshot.forEach((doc) => {
                              var imagen = doc.data().Imagenperfil;
                              var nombre = doc.data().Nombrecita;
                              var apellidop = doc.data().ApellidoPcita;
                              var apellidom = doc.data().ApellidoMcita;
                              var nombre1 =
                                 nombre + " " + apellidop + " " + apellidom;
                              var email = doc.data().Email;
                              var telefono = doc.data().Telefono;
                              var primeracita = doc.data().Primeracita;
                              var motivo = doc.data().Motivocita;
                              var tipocita = doc.data().Tipocita;
                              var fecha = doc.data().Fechacita;
                              var cita = Date.parse(fecha);
                              var horario = doc.data().Horariocita;
                              var comentario = doc.data().Comentarios;
                              var dia = doc.data().Diacita;
                              var indice = doc.data().Indice;
                              var costo = doc.data().Costoconsulta;
                              var id = doc.id;
                              var hoy = new Date();
                              var fechahoy = Date.parse(
                                 hoy.getUTCFullYear() +
                                    "/" +
                                    (hoy.getMonth() + 1) +
                                    "/" +
                                    hoy.getDate()
                              );
                              if (fechahoy > cita) {
                                 db.collection("Usuarios")
                                    .doc(uid)
                                    .collection("Citasrealizadas")
                                    .doc(id)
                                    .set({
                                       iddoctor: id,
                                       Imagenperfil: imagen,
                                       Motivocita: motivo,
                                       Primeracita: primeracita,
                                       Nombrecita: nombre,
                                       ApellidoPcita: apellidop,
                                       ApellidoMcita: apellidom,
                                       Telefono: telefono,
                                       Email: email,
                                       Fechacita: fecha,
                                       Horariocita: horario,
                                       Tipocita: tipocita,
                                       Diacita: dia,
                                       Comentarios: comentario,
                                    })
                                    .then((docRef) => {
                                       db.collection("Usuarios")
                                          .doc(uid)
                                          .collection("Citas")
                                          .doc(id)
                                          .delete()
                                          .then(() => {
                                             console.log(
                                                "Document successfully deleted!"
                                             );
                                             if (tipocita == "Presencial") {
                                                db.collection(
                                                   "Usuarios/" +
                                                      uid +
                                                      "/HorariosPresencial"
                                                )
                                                   .doc(dia)
                                                   .collection(dia + "1")
                                                   .doc(indice)
                                                   .update({
                                                      hora: horario,
                                                   });
                                             } else {
                                                db.collection(
                                                   "Usuarios/" +
                                                      uid +
                                                      "/HorariosLinea"
                                                )
                                                   .doc(dia)
                                                   .collection(dia + "1")
                                                   .doc(indice)
                                                   .update({
                                                      hora: horario,
                                                   });
                                             }
                                          })
                                          .catch((error) => {
                                             console.error(
                                                "Error removing document: ",
                                                error
                                             );
                                          });
                                    });
                              } else {
                                 citas.innerHTML += `
                                 <div class="cita">
                                 <div class="fotoCita"><img  src=${imagen}/></div>
                                 <label><b>Nombre:</b>${nombre1}</label>
                                 <label><b>Email:<//b> ${email}</label>
                                 <label><b>Telefono:</b> ${telefono}</label>
                                 <label><b>Costo consulta:$</b>${costo}</label>
                                 <label><b>Primera cita:</b> ${primeracita}</label>
                                 <label><b>Motivo:</b> ${motivo}</label>
                                 <label><b>Tipo cita:</b> ${tipocita}</label>
                                 <label><b>Dia:</b> ${dia}</label>
                                 <label><b>Fecha:</b> ${fecha}</label>
                                 <label><b>Horario:</b> ${horario}</label>
                                 <label><b>Comentario:</b> ${comentario}</label>
                                 </div>
                       
                        `;
                              }
                           });
                           if (citas.innerHTML == "") {
                              citas.innerHTML += `<h2 class="tituloTabla">Todavia no hay resultados</h2></br>`;
                           }
                        });
                  } else {
                     window.location.href = "/";
                  }
               });
         } else {
            window.location.href = "/";
         }
      });
   }

   citascanceladas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("citascanceladas");
            db.collection("Usuarios/" + uid + "/Citascanceladas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var nombre1 = nombre + "" + apellidop + "" + apellidom;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var iddoctor = doc.data().iddoctor;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;
                     var id = doc.id;
                     citas.innerHTML += `
                     <div class="cita">
                     <div class="fotoCita"><img  src=${imagen}/></div>
                     <label><b>Nombre:</b>${nombre1}</label>
                     <label><b>Email:</b> ${email}</label>
                     <label><b>Telefono:</b> ${telefono}</label>
                     <label><b>Costo consulta:$</b>${costo}</label>
                     <label><b>Primera cita:</b> ${primeracita}</label>
                     <label><b>Motivo:</b> ${motivo}</label>
                     <label><b>Tipo cita:</b> ${tipocita}</label>
                     <label><b>Dia:</b> ${dia}</label>
                     <label><b>Fecha:</b> ${fecha}</label>
                     <label><b>Horario:</b> ${horario}</label>
                     <label><b>Comentario:</b> ${comentario}</label>
                     </div>
                        `;
                  });
                  if (citas.innerHTML == "") {
                     citas.innerHTML += `<h2 class="tituloTabla">Todavia no hay resultados</h2></br>`;
                  }
               });
         }
      });
   }

   citasrealizadas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("citasrealizadas");
            db.collection("Usuarios/" + uid + "/Citasrealizadas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var nombre1 = nombre + "" + apellidop + "" + apellidom;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var iddoctor = doc.data().iddoctor;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;
                     var id = doc.id;
                     citas.innerHTML += `
                         <div class="cita">
                                 <div class="fotoCita"><img  src=${imagen}/></div>
                                 <label><b>Nombre:</b>${nombre1}</label>
                                 <label><b>Email:</b> ${email}</label>
                                 <label><b>Telefono:</b>${telefono}</label>
                                 <label><b>Costo consulta:$</b>${costo}</label>
                                 <label><b>Primera cita:</b> ${primeracita}</label>
                                 <label><b>Motivo:</b> ${motivo}</label>
                                 <label><b>Tipo cita:</b> ${tipocita}</label>
                                 <label><b>Dia:</b> ${dia}</label>
                                 <label><b>Fecha:</b> ${fecha}</label>
                                 <label><b>Horario: </b>${horario}</label>
                                 <label><b>Comentario: </b>${comentario}</label>
                                 </div>
                          
                          `;
                  });
                  if (citas.innerHTML == "") {
                     citas.innerHTML += `<h2 class="tituloTabla">Todavia no hay resultados</h2></br>`;
                  }
               });
         }
      });
   }
   cerrar_sesion() {
      firebase
         .auth()
         .signOut()
         .then(() => {
            // Sign-out successful.
            alert("La sesion se a cerrado");
            window.location.href = "/";
         })
         .catch((error) => {
            // An error happened.
         });
   }

   //html que se muestra en la pagina
   render() {
      return (
         <div onload={(this.logeado, this.especialidad, this.estado)}>
            <MenuDoctor cerrar_sesion={this.cerrar_sesion} />

            <h2 className="titulo">
               Mis Citas <i className="ri-hospital-fill"></i>
            </h2>

            <div className="contenedor contentBlanco">
               <h2 className="tituloCitas">Citas pendientes</h2>
               <div id="citas"></div>
               <h2 className="tituloCitas">Citas canceladas</h2>
               <div id="citascanceladas"></div>
               <h2 className="tituloCitas">Citas realizadas</h2>
               <div id="citasrealizadas"></div>
            </div>
         </div>
      );
   }
}

export default principaldoctor;
