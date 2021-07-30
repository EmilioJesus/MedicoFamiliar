import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const Notification = () => {
   const { answerCall, call, callAccepted } = useContext(SocketContext);

   console.log(call);
   return (
      <>
         {call.isReceivingCall && !callAccepted && (
            <div>
               <h1>{call.name} is calling</h1>
               <button className="btn-principal seconbtn" onClick={answerCall}>
                  Answer
               </button>
            </div>
         )}
      </>
   );
};

export default Notification;
