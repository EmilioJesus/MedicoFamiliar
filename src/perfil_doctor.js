import React, { Component, useImperativeHandle } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuDoctor from "./Components/Menu/MenuDoctor";

class perfil_doctor extends Component {
   //fincion para ejecutar una funcion en cuanto se cargue la pagina
   componentDidMount() {
      this.inicio();
      this.mostrar_linea();
      this.mostrar_presencial();
      this.eliminarhorario();
   }

   //si es usuario quiere entrar sin estar logeado esta funcion lo manda al login principal
   inicio() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  const apeliidomaterno = doc.data().ApellidoMaterno;
                  const apeliidopaterno = doc.data().ApellidoPaterno;
                  const nombre = doc.data().Nombre;
                  const cedula = doc.data().Cedula;
                  const consulta = doc.data().Costoconsulta;
                  const correo = doc.data().Email;
                  const telefono = doc.data().Telefono;
                  const estado = doc.data().Estado;
                  const especialidad = doc.data().Especialidad;
                  const descripcion = doc.data().Descripcion;
                  const terminoinscripcion = doc.data().Terminoinscripcion;
                  const nacimiento = doc.data().Fecha;
                  const imagenperfil = doc.data().ImagenPerfil;
                  var terminoinscrip = new Date(
                     terminoinscripcion
                  ).toLocaleDateString("en-US");
                  document.getElementById("nombre").innerText =
                     nombre + " " + apeliidopaterno + " " + apeliidomaterno;
                  document.getElementById("cedula").innerText = cedula;
                  document.getElementById("consulta").innerText = consulta;
                  document.getElementById("correo").innerText = correo;
                  document.getElementById("telefono").innerText = telefono;
                  document.getElementById("estado").innerText = estado;
                  document.getElementById("terminoinscripcion").innerText =
                     terminoinscrip;
                  document.getElementById("especialidad").innerText =
                     especialidad;
                  document.getElementById("descripcion").innerText =
                     descripcion;
                  document.getElementById("imagenperfil").src = imagenperfil;

                  document.getElementById("nombremodificar").value = nombre;
                  document.getElementById("apellidoPmodificar").value =
                     apeliidopaterno;
                  document.getElementById("apellidoMmodificar").value =
                     apeliidomaterno;
                  document.getElementById("costomodificar").value = consulta;
                  document.getElementById("telefonomodificar").value = telefono;
                  document.getElementById("descripcionmodificar").value =
                     descripcion;
                  var convercion = new Date(nacimiento);
                  var hoy = new Date();
                  var edad = hoy.getFullYear() - convercion.getFullYear();
                  document.getElementById("edadMedico").innerText = edad;
               });
         } else {
            alert("Usuario no logeado");
            window.location.href = "/";
         }
      });
   }
   //funcion para cerrar sesion firebase te la da por default
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

   editar() {
      document.getElementById("modificar").style.display = "block";
      document.getElementById("datos").style.display = "none";
      document.getElementById("pago").style.display = "none";
      document.getElementById("agregarhorario").style.display = "none";
      document.getElementById("mostrarhorarios").style.display = "none";
   }

   editar1() {
      var storage = firebase.storage();
      var nombre = document.getElementById("nombremodificar").value;
      var apellidop = document.getElementById("apellidoPmodificar").value;
      var apellidom = document.getElementById("apellidoMmodificar").value;
      var telefono = document.getElementById("telefonomodificar").value;
      var descripcion = document.getElementById("descripcionmodificar").value;
      var costo = document.getElementById("costomodificar").value;
      firebase.auth().onAuthStateChanged((user) => {
         var uid = user.uid;
         var file = document.getElementById("file").files[0];
         console.log(file);
         if (!file) {
            db.collection("Usuarios").doc(uid).update({
               Nombre: nombre,
               ApellidoPaterno: apellidop,
               ApellidoMaterno: apellidom,
               Telefono: telefono,
               Descripcion: descripcion,
               Costoconsulta: costo,
            });
            document.getElementById("modificar").style.display = "none";
            document.getElementById("datos").style.display = "block";
         } else {
            var storageRef = storage.ref("/userprofileImgs/" + file.name);
            var uploadTask = storageRef.put(file);
            uploadTask.on(
               "satate_chaged",
               function (snapshot) {},
               function (error) {
                  console.log(error);
               },
               function () {
                  var dowloadURL = uploadTask.snapshot.ref
                     .getDownloadURL()
                     .then((url) => {
                        db.collection("Usuarios").doc(uid).update({
                           ImagenPerfil: url,
                           Nombre: nombre,
                           ApellidoPaterno: apellidop,
                           ApellidoMaterno: apellidom,
                           Telefono: telefono,
                           Descripcion: descripcion,
                        });
                     });
               }
            );
         }
      });
      document.getElementById("modificar").style.display = "none";
      document.getElementById("datos").style.display = "block";
      document.getElementById("pago").style.display = "block";
      document.getElementById("agregarhorario").style.display = "block";
      document.getElementById("mostrarhorarios").style.display = "block";
   }

   agregar_horario() {
      firebase.auth().onAuthStateChanged((user) => {
         var uid = user.uid;
         var horainicio = document.getElementById("horainicio").value;
         var horatermino = document.getElementById("horatermino").value;
         var tipo = document.getElementById("tipo").value;
         var dia = document.getElementById("dia").value;
         var horacita = horainicio + "-" + horatermino;
         if (horainicio != "" && horatermino != "") {
            if (tipo == "En linea") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("HorariosLinea")
                  .doc(dia)
                  .collection(dia + "1")
                  .add({
                     hora: horacita,
                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .then((docRef) => {
                     db.collection("Usuarios")
                        .doc(uid)
                        .collection("HorariosLineaDoctor")
                        .doc(dia)
                        .collection(dia + "1")
                        .doc(docRef.id)
                        .set({
                           hora: horacita,
                           timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                           window.location.reload();
                        });
                  });
            } else {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("HorariosPresencial")
                  .doc(dia)
                  .collection(dia + "1")
                  .add({
                     hora: horacita,
                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .then((docRef) => {
                     db.collection("Usuarios")
                        .doc(uid)
                        .collection("HorariosPresencialDoctor")
                        .doc(dia)
                        .collection(dia + "1")
                        .doc(docRef.id)
                        .set({
                           hora: horacita,
                           timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                           window.location.reload();
                        });
                  });
            }
         } else {
            alert("Los campos no deben de estar vacios");
         }
      });
   }

   mostrar_presencial() {
      document.getElementById("presencial").innerText = "";
      firebase.auth().onAuthStateChanged((user) => {
         var horariopresencial = document.getElementById("presencial");
         var uid = user.uid;
         var lunes = [];
         var martes = [];
         var miercoles = [];
         var jueves = [];
         var viernes = [];
         var sabado = [];
         var domingo = [];
         var lunes1 = [];
         var martes1 = [];
         var miercoles1 = [];
         var jueves1 = [];
         var viernes1 = [];
         var sabado1 = [];
         var domingo1 = [];

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Lunes/Lunes1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  lunes.push(doc.data().hora);
                  lunes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Martes/Martes1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  martes.push(doc.data().hora);
                  martes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Miercoles/Miercoles1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  miercoles.push(doc.data().hora);
                  miercoles1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Jueves/Jueves1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  jueves.push(doc.data().hora);
                  jueves1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Viernes/Viernes1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  viernes.push(doc.data().hora);
                  viernes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Sabado/Sabado1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  sabado.push(doc.data().hora);
                  sabado1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosPresencialDoctor/Domingo/Domingo1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  domingo.push(doc.data().hora);
                  domingo1.push(doc.id);
               });

               horariopresencial.innerHTML += `
                <h3>Horarios Presencial</h3> 
                <label className="tituloTabla">Lunes:</label>${lunes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Martes:</label>${martes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Miercoles:</label>${miercoles
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Jueves:</label>${jueves
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Viernes:</label>${viernes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Sabado:</label>${sabado
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Domingo:</label>${domingo.map(
                   (val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`
                )}
                <label>Lunes:</label>${lunes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Lunes&codijo=${lunes1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${lunes1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}
                <label>Martes:</label>${martes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Martes&codijo=${martes1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${martes1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}
                <label>Miercoles:</label>${miercoles
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Miercoles&codijo=${miercoles1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${miercoles1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Jueves:</label>${jueves
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Jueves&codijo=${jueves1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${jueves1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Viernes:</label>${viernes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Viernes&codijo=${viernes1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${viernes1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Sabado:</label>${sabado
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Sabado&codijo=${sabado1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${sabado1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Domingo:</label>${domingo
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Domingo&codijo=${domingo1[index]}&tipocita=Presencial&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${domingo1[index]}&tipocita=Presencial">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                `;
            });
      });
   }

   mostrar_linea() {
      document.getElementById("linea").innerText = "";
      firebase.auth().onAuthStateChanged((user) => {
         var horariolinea = document.getElementById("linea");
         var uid = user.uid;
         var lunes = [];
         var martes = [];
         var miercoles = [];
         var jueves = [];
         var viernes = [];
         var sabado = [];
         var domingo = [];
         var lunes1 = [];
         var martes1 = [];
         var miercoles1 = [];
         var jueves1 = [];
         var viernes1 = [];
         var sabado1 = [];
         var domingo1 = [];

         db.collection("Usuarios/" + uid + "/HorariosLineaDoctor/Lunes/Lunes1")
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  lunes.push(doc.data().hora);
                  lunes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Martes/Martes1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  martes.push(doc.data().hora);
                  martes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Miercoles/Miercoles1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  miercoles.push(doc.data().hora);
                  miercoles1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Jueves/Jueves1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  jueves.push(doc.data().hora);
                  jueves1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Viernes/Viernes1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  viernes.push(doc.data().hora);
                  viernes1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Sabado/Sabado1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  sabado.push(doc.data().hora);
                  sabado1.push(doc.id);
               });
            });

         db.collection(
            "Usuarios/" + uid + "/HorariosLineaDoctor/Domingo/Domingo1"
         )
            .orderBy("timestamp", "asc")
            .get()
            .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  domingo.push(doc.data().hora);
                  domingo1.push(doc.id);
               });

               horariolinea.innerHTML += `
                <h3>Horarios linea</h3> 
                <label className="tituloTabla">Lunes:</label>
                ${lunes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Martes:</label>${martes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Miercoles:</label>${miercoles
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Jueves:</label>${jueves
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Viernes:</label>${viernes
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Sabado:</label>${sabado
                   .map((val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`)
                   .join(" ")}</br>
                <label className="tituloTabla">Domingo:</label>${domingo.map(
                   (val, index) => `<a>${val}</a>&nbsp&nbsp&nbsp&nbsp`
                )}
                <label>Lunes:</label>${lunes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Lunes&codijo=${lunes1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${lunes1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Martes:</label>${martes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Martes&codijo=${martes1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${martes1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Miercoles:</label>${miercoles
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Miercoles&codijo=${miercoles1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${miercoles1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Jueves:</label>${jueves
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Jueves&codijo=${jueves1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${jueves1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Viernes:</label>${viernes
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Viernes&codijo=${viernes1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${viernes1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Sabado:</label>${sabado
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Sabado&codijo=${sabado1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${sabado1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                <label>Domingo:</label>${domingo
                   .map(
                      (val, index) =>
                         `<a>${val}<a href="/editar_horario?dia=Domingo&codijo=${domingo1[index]}&tipocita=Linea&horario=${val}">Editar</a><a href="/perfil_doctor?dia=Lunes&codijoeliminar=${domingo1[index]}&tipocita=Linea">Eliminar</a></a>&nbsp&nbsp&nbsp&nbsp`
                   )
                   .join(" ")}</br>
                `;
            });
      });
   }

   eliminarhorario() {
      firebase.auth().onAuthStateChanged((user) => {
         var uid = user.uid;
         var queryString = window.location.search;
         var urlParams = new URLSearchParams(queryString);
         var codijoeliminar = urlParams.get("codijoeliminar");
         var dia = urlParams.get("dia");
         var tipocita = urlParams.get("tipocita");
         if (tipocita != null) {
            if (tipocita == "Linea") {
               db.collection(
                  "Usuarios/" + uid + "/HorariosLinea/" + dia + "/" + dia + "1"
               )
                  .doc(codijoeliminar)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     db.collection(
                        "Usuarios/" +
                           uid +
                           "/HorariosLineaDoctor/" +
                           dia +
                           "/" +
                           dia +
                           "1"
                     )
                        .doc(codijoeliminar)
                        .delete()
                        .then(() => {
                           console.log("Document successfully deleted!");
                           window.location.href = "/perfil_doctor";
                        })
                        .catch((error) => {
                           console.error("Error removing document: ", error);
                        });
                  })
                  .catch((error) => {
                     console.error("Error removing document: ", error);
                  });
            } else {
               db.collection(
                  "Usuarios/" +
                     uid +
                     "/HorariosPresencial/" +
                     dia +
                     "/" +
                     dia +
                     "1"
               )
                  .doc(codijoeliminar)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     db.collection(
                        "Usuarios/" +
                           uid +
                           "/HorariosPresencialDoctor/" +
                           dia +
                           "/" +
                           dia +
                           "1"
                     )
                        .doc(codijoeliminar)
                        .delete()
                        .then(() => {
                           console.log("Document successfully deleted!");
                           window.location.href = "/perfil_doctor";
                        })
                        .catch((error) => {
                           console.error("Error removing document: ", error);
                        });
                  })
                  .catch((error) => {
                     console.error("Error removing document: ", error);
                  });
            }
         }
      });
   }

   cancelar() {
      window.location.href = "/perfil_doctor";
   }

   //html que se muestra en la pagina
   render() {
      return (
         <div onload={this.inicio}>
            <div className="App" id="datos">
               <MenuDoctor cerrar_sesion={this.cerrar_sesion} />
               <h1 className="titulo">Perfil Doctor</h1>

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
                  <div className="variables">
                     <label className="tituloTabla">Nombre:Dr.</label>
                     <label id="nombre"></label>

                     <label className="tituloTabla">Edad:</label>
                     <label id="edadMedico"></label>

                     <label className="tituloTabla">Correo:</label>
                     <label id="correo"></label>

                     <label className="tituloTabla">Cedula:</label>
                     <label id="cedula"></label>

                     <label className="tituloTabla">
                        Costo de la consulta:
                     </label>
                     <label id="consulta"></label>
                     <label className="tituloTabla">$</label>

                     <label className="tituloTabla">Descripsion:</label>
                     <label id="descripcion"></label>

                     <label className="tituloTabla">Telefono:</label>
                     <label id="telefono"></label>

                     <label className="tituloTabla">Estado:</label>
                     <label id="estado"></label>

                     <label className="tituloTabla">Especialidad:</label>
                     <label id="especialidad"></label>

                     <label className="tituloTabla">
                        Termino de inscripcion:
                     </label>
                     <label id="terminoinscripcion"></label>

                     <button
                        className="btn-principal seconbtn"
                        onClick={this.editar}
                     >
                        Editar
                     </button>
                  </div>
               </div>
            </div>

            <div style={{ display: "none" }} id="modificar">
               <h1 className="titulo">
                  Modifica los valores de tu perfil
                  <i className="ri-capsule-fill"></i>
               </h1>

               <div className="contentModificar contentBlanco">
                  <label className="tituloTabla">Agrega imagen de perfil</label>

                  <input type="file" id="file"></input>

                  <label className="tituloTabla">Nombres</label>

                  <input
                     className="input"
                     type="text"
                     id="nombremodificar"
                  ></input>

                  <label className="tituloTabla">Apellido Paterno</label>

                  <input
                     className="input"
                     type="text"
                     id="apellidoPmodificar"
                  ></input>

                  <label className="tituloTabla">Apellido Materno</label>

                  <input
                     className="input"
                     type="text"
                     id="apellidoMmodificar"
                  ></input>

                  <label className="tituloTabla">Costo de la consulta</label>

                  <input
                     className="input"
                     type="number"
                     id="costomodificar"
                  ></input>

                  <label className="tituloTabla">Telefono</label>

                  <input
                     className="input"
                     type="text"
                     id="telefonomodificar"
                  ></input>

                  <label className="tituloTabla">Descripcion</label>

                  <input
                     className="input"
                     type="text"
                     id="descripcionmodificar"
                  ></input>

                  <button
                     className="btn-principal seconbtn"
                     onClick={this.editar1}
                  >
                     Modificar
                  </button>
                  <button
                     className="btn-principal seconbtn"
                     onClick={this.cancelar}
                  >
                     Cancelar
                  </button>
               </div>
            </div>
            <div id="pago" className="contenedor contentBlanco">
               <h2 className="titulo">
                  Pagar inscripcion
                  <i className="ri-money-dollar-circle-line"></i>
               </h2>
               <a
                  className="btnPagar"
                  href="https://buy.stripe.com/test_6oE17fdYl8pQ2c05kk"
               >
                  Pago Mensual <i className="ri-bank-card-2-line"></i>
               </a>
            </div>

            <div className="contenedor contentApricot" id="agregarhorario">
               <h2 className="titulo">
                  Agregar horario <i class="ri-time-fill"></i>
               </h2>

               <div className="tabla1">
                  <label className="tituloTabla">Selecciona el dia</label>
                  <select className="input" id="dia">
                     <option>Lunes</option>
                     <option>Martes</option>
                     <option>Miercoles</option>
                     <option>Jueves</option>
                     <option>Viernes</option>
                     <option>Sabado</option>
                     <option>Domingo</option>
                  </select>

                  <label className="tituloTabla">Tipo de cita</label>

                  <select className="input" id="tipo">
                     <option>En linea</option>
                     <option>Presencial</option>
                  </select>

                  <label className="tituloTabla">
                     Ingresa la hora de Inicio
                  </label>

                  <input
                     className="input"
                     type="time"
                     name="hora"
                     id="horainicio"
                  />

                  <label className="tituloTabla">
                     Ingresa la hora de Termino
                  </label>

                  <input
                     className="input"
                     type="time"
                     name="hora"
                     id="horatermino"
                  />

                  <button
                     className="btn-principal"
                     onClick={this.agregar_horario}
                  >
                     Agregar
                  </button>
               </div>
            </div>

            <div id="mostrarhorarios">
               <h2>Mostrar Horario</h2>
               <div id="linea"></div>
               <div id="presencial"></div>
            </div>
         </div>
      );
   }
}

export default perfil_doctor;
