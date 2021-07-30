import React from "react";
import { ContextProvider } from "../../SocketContext";
import Notification from "./Notification";
import Option from "./Option";
import VideoPlayer from "./VideoPlayer";

const Zoom = () => {
   return (
      <ContextProvider>
         <>
            <VideoPlayer />

            <Option>
               <Notification />
            </Option>
         </>
      </ContextProvider>
   );
};

export default Zoom;
