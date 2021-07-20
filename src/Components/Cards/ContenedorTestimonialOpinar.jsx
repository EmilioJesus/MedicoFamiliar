import React, { useState } from "react";

const ContenedorTestimonialOpinar = ({ opinar }) => {
   const [viewForm, setViewForm] = useState(false);

   return (
      <>
         {viewForm && (
            <div className="animate__animated animate__fadeInDown  animate__faster contenedor contentBlanco">
               <label className="label">
                  ¿Que opinas de nuestro servicio?
                  <br />
                  <textarea className="textArea" id="opinar"></textarea>
               </label>
               <br />
               <button className="btn-principal" onClick={opinar}>
                  Enviar
               </button>
            </div>
         )}

         <button
            className="btn-principal seconbtn"
            onClick={() => setViewForm(!viewForm)}
         >
            Opinar
         </button>
      </>
   );
};

export default ContenedorTestimonialOpinar;
