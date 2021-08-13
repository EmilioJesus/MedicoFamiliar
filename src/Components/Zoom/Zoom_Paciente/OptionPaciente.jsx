import React, { useContext } from "react";
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

   return (
      <div>
         <div>
            {stream && (
               <form noValidate autoComplete="of">
                  <div>
                     <h2 style={{ userSelect: "auto" }}>{me}</h2>
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

         {children}
      </div>
   );
};

export default OptionPaciente;
