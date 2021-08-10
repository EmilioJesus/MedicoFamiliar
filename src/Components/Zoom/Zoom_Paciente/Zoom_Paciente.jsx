import React from "react";
import { ContextProvider } from "./../../../SocketContext";
import Notification from "./../Notification";
import OptionPaciente from "./OptionPaciente";
import VideoPlayerUser from "./VideoPlayerUser";

const Zoom_Paciente = () => {
   return (
      <ContextProvider>
         <>
            <VideoPlayerUser />

            <OptionPaciente>
               <Notification />
            </OptionPaciente>
         </>
      </ContextProvider>
   );
};

export default Zoom_Paciente;
