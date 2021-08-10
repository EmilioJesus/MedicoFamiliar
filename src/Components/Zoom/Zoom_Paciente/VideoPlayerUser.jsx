import React, { useContext } from "react";
import { SocketContext } from "./../../../SocketContext";
import MenuLoggedUser from "./../../Menu/MenuLoggedUser";

const VideoPlayerUser = () => {
   const {
      me,
      call,
      callAccepted,
      callEnded,
      myVideo,
      userVideo,
      stream,
      name,
   } = useContext(SocketContext);

   console.log(me);
   return (
      <>
         <MenuLoggedUser />
         <h2 className="titulo">
            Mí cita <i className="ri-video-chat-fill"></i>
         </h2>
         <div className="contentVideo contenedor">
            {stream ? (
               <div className="video">
                  <h5 className="nombreTitulo">{name}</h5>
                  <video
                     style={{ height: "100%", width: "100%" }}
                     playsInline
                     muted
                     ref={myVideo}
                     autoPlay
                  />
               </div>
            ) : (
               <>
                  <h1
                     style={{
                        color: "var(--colormorado)",
                        letterSpacing: "1px",
                        lineHeight: "45px",
                        padding: "1rem 2rem",
                     }}
                  >
                     Concede los permisos de tu cámara y microfono para poder
                     ingresar a la reunion
                  </h1>
               </>
            )}
            {callAccepted && !callEnded && (
               <div className="video">
                  <h5 className="nombreTitulo">{call.name}</h5>
                  <video
                     style={{ height: "100%", width: "100%" }}
                     playsInline
                     ref={userVideo}
                     autoPlay
                  />
               </div>
            )}
         </div>
      </>
   );
};

export default VideoPlayerUser;
