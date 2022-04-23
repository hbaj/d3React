
import React, { useState,useReducer } from 'react';


const formReducer = (state, action) => {
  console.log('state variable',state);
 
  // console.log('state variable',state);
  
  console.log('event object',action);
   return {
     ...state,[action.target.name]:action.target.value

   }
 }

function Form() {
  const [formData,setFormData] = useReducer(formReducer, {});
  console.log('formdata state', formData);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
   setSubmitting(true);

   setTimeout(() => {
     setSubmitting(false);
   }, 3000)
 }



  return(
    <div className="wrapper">
      <h1>How About Them Apples</h1>
      {submitting &&
       <div>Submtting Form...
         <ul>
           {Object.entries(formData).map(([index,value]) => (
             <li key = {index}><strong>
               {index}
             </strong>:{value.toString()}
               
             </li>
           ))}
         </ul>
       </div>
     }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name"  onChange = {setFormData}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;