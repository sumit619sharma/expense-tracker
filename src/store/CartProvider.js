import React,{useReducer, useState} from 'react'

import EditContext from './edit-context'



const CartProvider = (props) => {
  const [edit,setEdit] = useState(false);
  const [sureEdit,setSureEdit] = useState(false);
const [data,setData] = useState({});


const onEditHandler=(item)=>{

setEdit(true);
setSureEdit(true);
setData(item);
}

const offEditHandler=()=>{
  setEdit(false);
  
}
const offSureEditHandler=()=>{
  setSureEdit(false);
  setData({});
}


const editContext = {
  item: data,
  isEdit: edit,
  sureEdit: sureEdit,
  onEdit: onEditHandler,
  offEdit: offEditHandler,
  offSureEdit: offSureEditHandler
}
    return  <EditContext.Provider value={editContext} >
   {props.children}
  </EditContext.Provider>
 
  
}

export default CartProvider;
