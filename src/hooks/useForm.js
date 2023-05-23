import { useState } from "react"

export default function useForm(initialInputValues= {}){

  const [inputValues, setInputValues]= useState(initialInputValues);
  
  const handleInputChanges= (e)=> {
    // console.log(e);

    if(e.target.type === "checkbox"){
      setInputValues({
        ...inputValues,
        [e.target.name]: e.target.checked
      });
    }else{
      setInputValues({
        ...inputValues,
        [e.target.name]: e.target.value
      });
    }
  }

  const clearInputValues= ()=> {
    setInputValues(initialInputValues);
  }

  return({inputValues, setInputValues, handleInputChanges, clearInputValues});
}