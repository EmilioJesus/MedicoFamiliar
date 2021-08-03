import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import ContenedorCard from "./Components/Cards/ContentCard";
import ContenedorTestimonialOpinar from "./Components/Cards/ContenedorTestimonialOpinar";
import MenuLoggedUser from "./Components/Menu/MenuLoggedUser";

const img = require.context("./imagenes", true);
class principalpaciente extends Component {
   componentDidMount() {
      this.logeado();
      this.especialidad();
      this.estado();
      this.opiniones();
   }

   especialidad() {
      const select = document.getElementById("selectespecialidad");
      let especialidad = [];
      db.collection("Administrador")
         .doc("Especialidades")
         .collection("Especialidad1")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               especialidad.push(doc.data().Especialidad);
            });
            for (let x = 0; x <= especialidad.length; x++) {
               select.options[x] = new Option(especialidad[x]);
            }
         });
   }
   estado() {
      const select = document.getElementById("selectestado");
      let estado = [];
      db.collection("Administrador")
         .doc("Estado")
         .collection("Estado1")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               estado.push(doc.data().Estado);
            });
            for (let x = 0; x <= estado.length; x++) {
               select.options[x] = new Option(estado[x]);
            }
         });
   }
   logeado() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
         } else {
            window.location.href = "/";
         }
      });
   }

   buscardocores() {
      let hoy = new Date();
      let dia = hoy.getDay();
      let lunesfecha,
         martesfecha,
         miercolesfecha,
         juevesfecha,
         viernesfecha,
         sabadofecha,
         domingofecha;
      if (dia == 1) {
         lunesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let martessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         let miercolessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         let juevessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         let viernessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         let sabadosuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         let domingosuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 2) {
         let lunessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         martesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let miercolessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         let juevessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         let viernessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         let sabadosuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         let domingosuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 3) {
         let lunessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         let martessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         miercolesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let juevessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         let viernessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         let sabadosuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         let domingosuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 4) {
         let lunessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         let martessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         let miercolessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         juevesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let viernessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         let sabadosuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         let domingosuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }

      if (dia == 5) {
         let lunessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         let martessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         let miercolessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         let juevessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         viernesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let sabadosuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         let domingosuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }

      if (dia == 6) {
         let lunessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         let martessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         let miercolessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         let juevessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         let viernessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         sabadofecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         let domingosuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 0) {
         let lunessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         let lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         let martessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         let martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         let miercolessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         let miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         let juevessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         let juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         let viernessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         let viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         let sabadosuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         let sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         domingofecha =
            hoy.getFullYear() +
            "-" +
            (hoy.getMonth() + 1) +
            "-" +
            hoy.getDate();
      }

      let vacio = (document.getElementById("resultadosbusqueda1").innerHTML =
         "");
      const especialidad = document.getElementById("selectespecialidad").value;
      const estado = document.getElementById("selectestado").value;
      const consultatipo = document.getElementById("selecconsultatipo").value;
      const resultados = document.getElementById("resultadosbusqueda1");
      const horarios = document.getElementById("horarios");
      if (consultatipo == "En linea") {
         db.collection("Usuarios")
            .where("Especialidad", "==", especialidad)
            .where("TipoUsuario", "==", "Doctor")
            .where("Estado", "==", estado)
            .onSnapshot((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  let codijo = doc.id;
                  let nombre1 = doc.data().Nombre;
                  let apellidopaterno = doc.data().ApellidoPaterno;
                  let apellidomaterno = doc.data().ApellidoMaterno;
                  let nombre =
                     nombre1 + " " + apellidopaterno + " " + apellidomaterno;
                  let cedula = doc.data().Cedula;
                  let email = doc.data().Email;
                  let especialidad = doc.data().Especialidad;
                  let descripcion = doc.data().Descripcion;
                  let estadores = doc.data().Estado;
                  let imagenperfil = doc.data().ImagenPerfil;
                  let costo = doc.data().Costoconsulta;
                  let lunes = [];
                  let martes = [];
                  let miercoles = [];
                  let jueves = [];
                  let viernes = [];
                  let sabado = [];
                  let domingo = [];
                  let lunes1 = [];
                  let martes1 = [];
                  let miercoles1 = [];
                  let jueves1 = [];
                  let viernes1 = [];
                  let sabado1 = [];
                  let domingo1 = [];

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Lunes/Lunes1"
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
                     "Usuarios/" + doc.id + "/HorariosLinea/Martes/Martes1"
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
                     "Usuarios/" +
                        doc.id +
                        "/HorariosLinea/Miercoles/Miercoles1"
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
                     "Usuarios/" + doc.id + "/HorariosLinea/Jueves/Jueves1"
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
                     "Usuarios/" + doc.id + "/HorariosLinea/Viernes/Viernes1"
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
                     "Usuarios/" + doc.id + "/HorariosLinea/Sabado/Sabado1"
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
                     "Usuarios/" + doc.id + "/HorariosLinea/Domingo/Domingo1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           domingo.push(doc.data().hora);
                           domingo1.push(doc.id);
                        });
                        resultados.innerHTML += `
                        <div class="animate__animated animate__fadeIn contentBlanco resultados">
        
                        <div class="foto"><img src=${imagenperfil} /></div>
        
                        <div class="infoDoc"> 
                        <h3>Datos Generales <i class="ri-nurse-fill"></i> </h3>
                        <label> <b>Nombre:</b> </br> Dr.${nombre}</label>
                        <label><b>Email:</b> </br> ${email}</label>
                        <label><b>Especialidad:</b> </br>${especialidad}</label>
                        <label><b>Costo de la consulta:$</b> </br> ${costo}</label>
                        <label><b>Estado:</b> </br>${estadores}</label></br>
                        </div>
                        
                        <div class="descripcion">
                        <label><b>Cedula:</b> </br>${cedula}</label>
                        <label><b>Descripcion:</b> </br> ${descripcion}</label>
                        </div> 
                        
                        <div class="horarios"> 
                        <h3>Horarios de atención <i class="ri-time-fill"></i></h3>
                        <label>Lunes-${lunesfecha}:</lable>${lunes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${lunes1[index]}&dia=Lunes&fecha=${lunesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Martes-${martesfecha}:</lable>${martes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${martes1[index]}&dia=Martes&fecha=${martesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Miercoles-${miercolesfecha}:</lable>${miercoles
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${miercoles1[index]}&dia=Mircoles&fecha=${miercolesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Jueves-${juevesfecha}:</lable>${jueves
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${jueves1[index]}&dia=Jueves&fecha=${juevesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Viernes-${viernesfecha}:</lable>${viernes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${viernes1[index]}&dia=Viernes&fecha=${viernesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Sabado-${sabadofecha}:</lable>${sabado
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${sabado1[index]}&dia=Sabado&fecha=${sabadofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Domingo-${domingofecha}:</lable>${domingo
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${domingo1[index]}&dia=Domigo&fecha=${domingofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}  
                                   </div>   
                         </div>`;
                     });
               });
            });
      } else {
         db.collection("Usuarios")
            .where("Especialidad", "==", especialidad)
            .where("TipoUsuario", "==", "Doctor")
            .where("Estado", "==", estado)
            .onSnapshot((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  let codijo = doc.id;
                  let nombre1 = doc.data().Nombre;
                  let apellidopaterno = doc.data().ApellidoPaterno;
                  let apellidomaterno = doc.data().ApellidoMaterno;
                  let nombre =
                     nombre1 + " " + apellidopaterno + " " + apellidomaterno;
                  let cedula = doc.data().Cedula;
                  let email = doc.data().Email;
                  let especialidad = doc.data().Especialidad;
                  let descripcion = doc.data().Descripcion;
                  let estadores = doc.data().Estado;
                  let imagenperfil = doc.data().ImagenPerfil;
                  let costo = doc.data().Costoconsulta;
                  let lunes = [];
                  let martes = [];
                  let miercoles = [];
                  let jueves = [];
                  let viernes = [];
                  let sabado = [];
                  let domingo = [];
                  let lunes1 = [];
                  let martes1 = [];
                  let miercoles1 = [];
                  let jueves1 = [];
                  let viernes1 = [];
                  let sabado1 = [];
                  let domingo1 = [];

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Lunes/Lunes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           lunes.push(doc.data().hora);
                           lunes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Martes/Martes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           martes.push(doc.data().hora);
                           martes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Miercoles/Miercoles1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           miercoles.push(doc.data().hora);
                           miercoles1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Jueves/Jueves1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           jueves.push(doc.data().hora);
                           jueves1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Viernes/Viernes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           viernes.push(doc.data().hora);
                           viernes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Sabado/Sabado1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           sabado.push(doc.data().hora);
                           sabado1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Domingo/Domingo1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           console.log(`${doc.id} => ${doc.data()}`);
                           domingo.push(doc.data().hora);
                           domingo1.push(doc.id);
                        });
                        resultados.innerHTML += `
                        <div class="animate__animated animate__fadeIn contentBlanco resultados">
        
                        <div class="foto"><img src=${imagenperfil} /></div>
        
                        <div class="infoDoc"> 
                        <h3>Datos Generales <i class="ri-nurse-fill"></i> </h3>
                        <label> <b>Nombre:</b> </br> Dr.${nombre}</label>
                        <label><b>Email:</b> </br> ${email}</label>
                        <label><b>Especialidad:</b> </br>${especialidad}</label>
                        <label><b>Costo de la consulta:$</b> </br> ${costo}</label>
                        <label><b>Estado:</b> </br>${estadores}</label></br>
                        </div>
                        
                        <div class="descripcion">
                        <label><b>Cedula:</b> </br>${cedula}</label>
                        <label><b>Descripcion:</b> </br> ${descripcion}</label>
                        </div> 
                        
                        <div class="horarios"> 
                        <h3>Horarios de atención <i class="ri-time-fill"></i></h3>
                        <label>Lunes-${lunesfecha}:</lable>${lunes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${lunes1[index]}&dia=Lunes&fecha=${lunesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Martes-${martesfecha}:</lable>${martes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${martes1[index]}&dia=Martes&fecha=${martesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Miercoles-${miercolesfecha}:</lable>${miercoles
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${miercoles1[index]}&dia=Mircoles&fecha=${miercolesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Jueves-${juevesfecha}:</lable>${jueves
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${jueves1[index]}&dia=Jueves&fecha=${juevesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Viernes-${viernesfecha}:</lable>${viernes
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${viernes1[index]}&dia=Viernes&fecha=${viernesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Sabado-${sabadofecha}:</lable>${sabado
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${sabado1[index]}&dia=Sabado&fecha=${sabadofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br></br>
                        <label>Domingo-${domingofecha}:</lable>${domingo
                           .map(
                              (val, index) =>
                                 `<a class="btnAgregar" href="/agendar?id=${codijo}&horario=${val}&indice=${domingo1[index]}&dia=Domigo&fecha=${domingofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}  
                                   </div>   
                         </div>`;
                     });
               });
            });
      }
   }

   opinar() {
      let opinion = document.getElementById("opinar").value;
      if (opinion != "") {
         firebase.auth().onAuthStateChanged((user) => {
            let uid = user.uid;
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  let imagen = doc.data().ImagenPerfil;
                  let email = doc.data().Email;
                  let nombre =
                     doc.data().Nombre +
                     " " +
                     doc.data().ApellidoPaterno +
                     " " +
                     doc.data().ApellidoMaterno;
                  db.collection("Administrador")
                     .doc("Usuarios")
                     .collection("Opiniones")
                     .add({
                        IdUsuario: uid,
                        Imagenperfil: imagen,
                        Nombre: nombre,
                        Email: email,
                        Opinion: opinion,
                     });
               });
            document.getElementById("opinar").value = "";
         });
      } else {
         alert("El campo no debe estar vacio");
      }
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

   //se mandan atraer las opiniones a la base de datos
   opiniones() {
      db.collection("Administrador/Usuarios/Opiniones")
         .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               //div donde se mandan a imprimir
               var opiniones = document.getElementById("opiniones");
               opiniones.innerHTML += `
               <div class="contentTest">
               <div  >
               <img class="imgTestimonial" src=${doc.data().Imagenperfil} />
               </div>

               <div class="textTestimonial">
               <h3>${doc.data().Email}</h3>
               <p>${doc.data().Opinion}</p>
               </div>
            
             `;
              
            });
         });
   }

   //html que se muestra en la pagina
   render() {
      return (
         <>
            <div
               className="head"
               onLoad={(this.logeado, this.especialidad, this.estado)}
            >
               <MenuLoggedUser cerrar_sesion={this.cerrar_sesion} />

               <div className="iconoForm">
                  <img src={img("./medico-header.svg").default} alt="" />
                  <h1 className="tituloForm">Mi Médico Familiar</h1>
               </div>

               <div className="form formgrid contenedor">
                  <div>
                     <label>
                        Especialidad:
                        <i className="ri-contacts-book-fill"></i>
                     </label>
                     <br />
                     <select className="input" id="selectespecialidad"></select>
                  </div>

                  <div>
                     <label>
                        Estado: <i className="ri-user-location-fill"></i>
                     </label>
                     <br />
                     <select className="input" id="selectestado"></select>
                  </div>

                  <div>
                     <label>
                        Tipo de consulta: <i className="ri-user-fill"></i>
                     </label>
                     <br />
                     <select className="input" id="selecconsultatipo">
                        <option>En linea</option>
                        <option>Presencial</option>
                     </select>
                  </div>
                  <div>
                     <input
                        className="btn-principal seconbtn"
                        type="button"
                        id="comenzar"
                        onClick={this.buscardocores}
                        value="Comenzar"
                     />
                  </div>
               </div>
            </div>

            <div className="contenedor">
               <div id="resultadosbusqueda1" style={{ overflow: "auto" }}></div>
            </div>

            <div>
               <h1 className="titulo">
                  Te ofrecemos <i className="ri-service-fill"></i>
               </h1>
               <ContenedorCard />
            </div>

            <h1 className="titulo">
               ¿Qué opinan <br /> de nosotros? <i className="fa fa-users"></i>
            </h1>
            <div
               id="opiniones"
               className="contenedor contenedorCardTest "
            ></div>
            <div>
               <ContenedorTestimonialOpinar opinar={this.opinar} />
            </div>
         </>
      );
   }
}

export default principalpaciente;
