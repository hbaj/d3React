import React, { useState, useReducer } from "react";

const formReducer = (state, action) => {
  // console.log('state variable',state);

  // console.log('state variable',state);

  // console.log('event object',action);
 
  if (action.reset){
   return{
     name:'',
     scanType:'',
     count:'',
     check:false
   } 
  }
  const isCheckedbox = action.target.type === 'checkbox';
  return {
    ...state,

    [action.target.name]: isCheckedbox ?  action.target.checked : action.target.value,
  };
};

function Form() {
  /* 
  useReducer will help creating an object with 
  user input information prior submission
  */

  const [formData, setFormData] = useReducer(formReducer, {name:'hbaj',scanType:'bf',count:2, check:true});
  // console.log('formdata state', formData);
    /* 
  setSubmitting assist with text presentaion ontop of form 
  after user submits  form
  */
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData object after submit", formData);
    setSubmitting(true);
    // setTimeout functino is emulating Fetching data from server
    setTimeout(() => {
      setSubmitting(false);
      /*
      the following instruction can reset the form
      form after submission will empty all values
      */
      // setFormData({
      //   reset:true
      // })
    }, 3000);
  };

  return (
    <div className="wrapper">
      {submitting && (
        <div>
          Submtting Form...
          <ul>
            {Object.entries(formData).map(([index, value]) => (
              <li key={index}>
                <strong>{index}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset  disabled = {submitting}>
          <label>
            <p>Name</p>
            <input name="name" onChange={setFormData} value ={formData.name || ''}/>
          </label>

          <label>
            <p>Scan Type</p>
            <select name="scanType" onChange={setFormData} value ={formData.scanType || ''}>
              <option value="">--Please choose an option--</option>
              <option value="BF">bf</option>
              <option value="DF">df</option>
            </select>
          </label>
          <label>
            <p>Count</p>
            <input type="number" name="count" onChange={setFormData} step="1" value ={formData.count || ''}/>
          </label>
          <label>
            <p>Check</p>
            <input type="checkbox" name="check" onChange={setFormData}  value ={formData.check || true} disabled = {formData.scanType !== 'DF'}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
