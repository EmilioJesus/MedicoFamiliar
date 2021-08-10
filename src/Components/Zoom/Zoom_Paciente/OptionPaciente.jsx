import React, { useContext, useState } from "react";
import { SocketContext } from "./../../../SocketContext";

const OptionPaciente = ({ children }) => {
   const {
      me, // ID del paciente
      callAccepted,
      name,
      callEnded,
      setName,
      leaveCall,
      callUser,
      call,
      stream,
   } = useContext(SocketContext);

   const [idToCall, setIdToCall] = useState("");

   return (
      <div>
         <div>
            {stream && (
               <form noValidate autoComplete="of">
                  <div>
                     <h5 className="tituloTabla">Ingresa tu nombre</h5>
                     <input
                        className="input"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                           e.preventDefault();
                           setName(e.target.value);
                        }}
                     />

                     {/*  <CopyToClipboard text={me}>
                     <button
                        className="btn-principal seconbtn"
                        onClick={(e) => e.preventDefault()}
                     >
                        Copy id <i className="ri-file-copy-2-fill"></i>
                     </button>
                  </CopyToClipboard> */}
                  </div>
               </form>
            )}
         </div>
         <div>
            <form noValidate autoComplete="of">
               {stream && (
                  <div>
                     <h5 className="tituloTabla">Make a call</h5>
                     <input
                        className="input"
                        placeholder="Id to call"
                        value={idToCall}
                        onChange={(e) => {
                           e.preventDefault();
                           setIdToCall(e.target.value);
                        }}
                     />

                     {callAccepted && !callEnded ? (
                        <button
                           className="btn-principal seconbtn"
                           onClick={(e) => {
                              e.preventDefault();
                              leaveCall();
                           }}
                        >
                           hang up <i className="ri-phone-fill"></i>
                        </button>
                     ) : (
                        <button
                           className="btn-principal seconbtn"
                           onClick={(e) => {
                              e.preventDefault();
                              callUser(idToCall);
                           }}
                        >
                           call <i className="ri-phone-fill"></i>
                        </button>
                     )}
                  </div>
               )}
            </form>
         </div>
         {children}
      </div>
   );
};

export default OptionPaciente;
