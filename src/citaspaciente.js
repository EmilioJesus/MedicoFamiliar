import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuLoggedUser from "./Components/Menu/MenuLoggedUser";

class citaspaciente extends React.Component {
   componentDidMount() {
      this.citas();
      this.cancelar();
      this.citascanceladas();
      this.citasrealizadas();
   }

   citas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            let uid = user.uid;
            let citas = document.getElementById("resultadocitas");
            db.collection("Usuarios/" + uid + "/Citas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     console.log(`${doc.id} => ${doc.data()}`);
                     let imagen = doc.data().Imagenperfil;
                     let nombre = doc.data().Nombrecita;
                     let apellidop = doc.data().ApellidoPcita;
                     let apellidom = doc.data().ApellidoMcita;
                     let nombre1 = nombre + " " + apellidop + " " + apellidom;
                     let email = doc.data().Email;
                     let especialidad = doc.data().Especialidad;
                     let telefono = doc.data().Telefono;
                     let primeracita = doc.data().Primeracita;
                     let motivo = doc.data().Motivocita;
                     let tipocita = doc.data().Tipocita;
                     let fecha = doc.data().Fechacita;
                     let cita = Date.parse(fecha);
                     let horario = doc.data().Horariocita;
                     let comentario = doc.data().Comentarios;
                     let iddoctor = doc.data().iddoctor;
                     let dia = doc.data().Diacita;
                     let indice = doc.data().Indice;
                     let costo = doc.data().Costoconsulta;
                     let id = doc.id;
                     let hoy = new Date();
                     let fechahoy = Date.parse(
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
                              timestamp:
                                 firebase.firestore.FieldValue.serverTimestamp(),
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
                                             iddoctor +
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
                                             iddoctor +
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
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
                          <a href="/citaspaciente?id=${id}&iddoctor=${iddoctor}">Cancelar</a>
                          
                          
                          `;
                     }
                  });
                  if (citas.innerHTML == "") {
                     citas.innerHTML += `<h2 class="tituloTabla">Todavia no hay resultados</h2></br>`;
                  }
               });
         }
      });
   }

   cancelar() {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      let id = urlParams.get("id");
      let iddoctor = urlParams.get("iddoctor");
      if (id != null) {
         firebase.auth().onAuthStateChanged((user) => {
            let uid = user.uid;
            db.collection("Usuarios/" + uid + "/Citas")
               .doc(id)
               .onSnapshot((doc) => {
                  if (doc.exists) {
                     let imagen = doc.data().Imagenperfil;
                     let nombre = doc.data().Nombrecita;
                     let apellidop = doc.data().ApellidoPcita;
                     let apellidom = doc.data().ApellidoMcita;
                     let email = doc.data().Email;
                     let especialidad = doc.data().Especialidad;
                     let telefono = doc.data().Telefono;
                     let primeracita = doc.data().Primeracita;
                     let motivo = doc.data().Motivocita;
                     let tipocita = doc.data().Tipocita;
                     let fecha = doc.data().Fechacita;
                     let horario = doc.data().Horariocita;
                     let comentario = doc.data().Comentarios;
                     let dia = doc.data().Diacita;
                     let indice = doc.data().Indice;
                     let costo = doc.data().Costoconsulta;

                     db.collection("Usuarios")
                        .doc(uid)
                        .collection("Citascanceladas")
                        .add({
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
                           Especialidad: especialidad,
                           Costoconsulta: costo,
                           iddoctor: iddoctor,
                           timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                           db.collection("Usuarios/" + iddoctor + "/Citas")
                              .doc(id)
                              .onSnapshot((doc) => {
                                 if (doc.exists) {
                                    let imagen = doc.data().Imagenperfil;
                                    let nombre = doc.data().Nombrecita;
                                    let apellidop = doc.data().ApellidoPcita;
                                    let apellidom = doc.data().ApellidoMcita;
                                    let email = doc.data().Email;
                                    let telefono = doc.data().Telefono;
                                    let primeracita = doc.data().Primeracita;
                                    let motivo = doc.data().Motivocita;
                                    let tipocita = doc.data().Tipocita;
                                    let fecha = doc.data().Fechacita;
                                    let horario = doc.data().Horariocita;
                                    let comentario = doc.data().Comentarios;
                                    let dia = doc.data().Diacita;
                                    let indice = doc.data().Indice;
                                    db.collection("Usuarios")
                                       .doc(iddoctor)
                                       .collection("Citascanceladas")
                                       .doc(docRef.id)
                                       .set({
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
                                          Costoconsulta: costo,
                                          idpaciente: uid,
                                          timestamp:
                                             firebase.firestore.FieldValue.serverTimestamp(),
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
                                                db.collection("Usuarios")
                                                   .doc(iddoctor)
                                                   .collection("Citas")
                                                   .doc(id)
                                                   .delete()
                                                   .then(() => {
                                                      console.log(
                                                         "Document successfully deleted!"
                                                      );
                                                      if (
                                                         tipocita ==
                                                         "Presencial"
                                                      ) {
                                                         db.collection(
                                                            "Usuarios/" +
                                                               iddoctor +
                                                               "/HorariosPresencial"
                                                         )
                                                            .doc(dia)
                                                            .collection(
                                                               dia + "1"
                                                            )
                                                            .doc(indice)
                                                            .update({
                                                               hora: horario,
                                                            });
                                                         window.location.href =
                                                            "/citaspaciente";
                                                      } else {
                                                         db.collection(
                                                            "Usuarios/" +
                                                               iddoctor +
                                                               "/HorariosLinea"
                                                         )
                                                            .doc(dia)
                                                            .collection(
                                                               dia + "1"
                                                            )
                                                            .doc(indice)
                                                            .update({
                                                               hora: horario,
                                                            });
                                                         window.location.href =
                                                            "/citaspaciente";
                                                      }
                                                      //window.location.href = "/citaspaciente";
                                                   })
                                                   .catch((error) => {
                                                      console.error(
                                                         "Error removing document: ",
                                                         error
                                                      );
                                                   });
                                             });
                                       })
                                       .catch((error) => {
                                          console.error(
                                             "Error removing document: ",
                                             error
                                          );
                                       });
                                 }
                              })
                              .catch((error) => {
                                 console.error(
                                    "Error removing document: ",
                                    error
                                 );
                              });
                        })
                        .catch((error) => {
                           console.error("Error removing document: ", error);
                        });
                  }
               });
         });
      }
   }

   citascanceladas() {
      let citas1 = (document.getElementById("citascanceladas").innerHTML = "");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            let uid = user.uid;
            let citas = document.getElementById("citascanceladas");
            db.collection("Usuarios/" + uid + "/Citascanceladas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     let imagen = doc.data().Imagenperfil;
                     let nombre = doc.data().Nombrecita;
                     let apellidop = doc.data().ApellidoPcita;
                     let apellidom = doc.data().ApellidoMcita;
                     let nombre1 = nombre + " " + apellidop + " " + apellidom;
                     let email = doc.data().Email;
                     let especialidad = doc.data().Especialidad;
                     let telefono = doc.data().Telefono;
                     let primeracita = doc.data().Primeracita;
                     let motivo = doc.data().Motivocita;
                     let tipocita = doc.data().Tipocita;
                     let fecha = doc.data().Fechacita;
                     let horario = doc.data().Horariocita;
                     let comentario = doc.data().Comentarios;
                     let iddoctor = doc.data().iddoctor;
                     let dia = doc.data().Diacita;
                     let indice = doc.data().Indice;
                     let costo = doc.data().Costoconsulta;
                     let id = doc.id;
                     citas.innerHTML += `
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
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
            let uid = user.uid;
            let citas = document.getElementById("citasrealizadas");
            db.collection("Usuarios/" + uid + "/Citasrealizadas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     let imagen = doc.data().Imagenperfil;
                     let nombre = doc.data().Nombrecita;
                     let apellidop = doc.data().ApellidoPcita;
                     let apellidom = doc.data().ApellidoMcita;
                     let nombre1 = nombre + "" + apellidop + "" + apellidom;
                     let email = doc.data().Email;
                     let especialidad = doc.data().Especialidad;
                     let telefono = doc.data().Telefono;
                     let primeracita = doc.data().Primeracita;
                     let motivo = doc.data().Motivocita;
                     let tipocita = doc.data().Tipocita;
                     let fecha = doc.data().Fechacita;
                     let horario = doc.data().Horariocita;
                     let comentario = doc.data().Comentarios;
                     let iddoctor = doc.data().iddoctor;
                     let dia = doc.data().Diacita;
                     let indice = doc.data().Indice;
                     let costo = doc.data().Costoconsulta;
                     let id = doc.id;
                     citas.innerHTML += `
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
                          
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

   render() {
      return (
         <div onLoad={this.citas}>
            <MenuLoggedUser cerrar_sesion={this.cerrar_sesion} />

            <h2 className="titulo">
               Mis Citas <i class="ri-hospital-fill"></i>
            </h2>
            <div className="contenedor contentBlanco">
               <h2 className="tituloCitas">Citas recientes</h2>
               <div id="resultadocitas"></div>
               <h2 className="tituloCitas">Citas canceladas</h2>
               <div id="citascanceladas"></div>
               <h2 className="tituloCitas">Citas realizadas</h2>
               <div id="citasrealizadas"></div>
            </div>
         </div>
      );
   }
}

export default citaspaciente;
