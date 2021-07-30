import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import MenuLoggedUser from "../Menu/MenuLoggedUser";

const VideoPlayer = () => {
   const { call, callAccepted, callEnded, myVideo, userVideo, stream, name } =
      useContext(SocketContext);

   return (
      <>
         <MenuLoggedUser />
         <h2 className="titulo">
            Mí cita <i className="ri-video-chat-fill"></i>
         </h2>
         <div className="contentVideo contenedor">
            {stream && (
               <div className="video">
                  <h5>{name}</h5>
                  <video
                     style={{ height: "100%" }}
                     playsInline
                     muted
                     ref={myVideo}
                     autoPlay
                  />
               </div>
            )}
            {callAccepted && !callEnded && (
               <div className="video">
                  <h5>{call.name}</h5>
                  <video
                     style={{ height: "100%" }}
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

export default VideoPlayer;
