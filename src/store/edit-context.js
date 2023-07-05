import React from "react";

 const EditContext =  React.createContext({
  item: {},
  isEdit: false,
  sureEdit: false,
  onEdit: ()=>{},
  offEdit: ()=>{},
  offSureEdit: ()=>{}
  })
export default EditContext;