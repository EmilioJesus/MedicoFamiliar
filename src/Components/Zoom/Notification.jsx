import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const Notification = () => {
   const { answerCall, call, callAccepted } = useContext(SocketContext);

   return (
      <>
         {call.isReceivingCall && !callAccepted && (
            <div className="alertaLlamada animate__animated animate__fadeIn ">
               <div className="contentBlanco contentLLamada">
                  <h1>{call.name} is calling</h1>
                  <button
                     className="btn-principal seconbtn"
                     onClick={answerCall}
                  >
                     Answer <i className="ri-phone-fill"></i>
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default Notification;
