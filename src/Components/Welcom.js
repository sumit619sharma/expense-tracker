import React, { useState ,useEffect, useContext, useRef} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';
import EditContext from '../store/edit-context';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';
import { themeAction } from '../redux-store/theme-reducer';
import axios from 'axios'
import { authAction } from '../redux-store/auth-reducer';

const Welcom = () => {


const [isVerified ,setIsVerified] = useState(false);
const [expense,setExpense] =useState([]);
const [href,setHref] = useState(null);
const [leaderBoard,setLeaderBoard] = useState([]);
const [showBoard, setShowLeaderBoard] = useState(false);
//const [paginationInfo ,setPaginationData] = useState();
const downloadLinkRef = useRef();
 const dispatch = useDispatch();
 const editCtx = useContext(EditContext);
   const totalExpense = useSelector(state=>state.expense.expenseTotal);
   const paginationInfo = useSelector(state=>state.expense.paginationInfo) || null;
   const rowChange = useSelector(state=>state.expense.rowChange) ;
   const user = useSelector(state=>state.auth.userDetail);
  console.log("WELCOME SCREEN");
    const modifiedEmail = user.email.replace(/[@.]/g, '');
     console.log('redux paginationInfo==',paginationInfo);
   console.log('row chabge==',rowChange)
     useEffect(() => {
      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        // Cleanup: remove the script when the component is unmounted
        document.body.removeChild(script);
      };
    }, []);



    const editExpense =async (item,id)=>{
  // maybe i can remove id from item 
  item = {...item,id}
  console.log("edit item==",item);
  try {
    //`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`
    const resp=  await fetch('http://localhost:3000/expense',{
      method:'PUT',
      body: JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json',
          'Authorization': user.idToken
        }
     })
     if(!resp.ok){
      throw new Error("succesful request but no response ")
     }
     const resArr =await resp.json();
   
     
    
  } catch (error) {
    console.log("post error==",error);   
  }
 }


const deleteExpense =async (id)=>{
  
  
  try {
    //`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`
   const resp=  await fetch(`http://localhost:3000/expense/delete/${id}`,{
    method:'DELETE',
    headers:{
      'Authorization': user.idToken
    }
     })
  
   if(!resp.ok){
     throw new Error("succesful request but no response ")
    }
    //const resObj = await resp.json();
    console.log('Successfully Deleted Expense==', resp); 
  
      
  
   
  } catch (error) {
   console.log("post error==",error);   
  }
  } 

const getAllExpense =async (page)=>{
  const limit = localStorage.getItem('row')?localStorage.getItem('row'): 5;
  
try {
  
//`https://react-http-2f680-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`
  const resp=  await fetch(`http://localhost:3000/expense?page=${page}&limit=${limit}`,
  {headers: {'Authorization': user.idToken}})

 if(!resp.ok){
   throw new Error("succesful request but no response ")
  }
  const resArr = await resp.json();

  console.log("resArr===getAllExoense",resArr)
  const resObj= resArr.products.reduce((result, obj) => {
    result[obj.id] = obj;
    return result;
  }, {});
  
    onRefreshGetExpense(resObj,resArr.paginationInfo);
    setExpense(resArr.products);
    //setPaginationData(resArr.paginationInfo)
} catch (error) {
 console.log("post error==",error);   
}
} 

const onRefreshGetExpense = (resObj,paginationInfo)=>{
 dispatch((expenseAction.getRefreshExpense({resObj,paginationInfo})));
  // const expenseArr = [];
  // for(let key in resObj){
  //   const currExpDetail = resObj[key];
  //   expenseArr.push( {... currExpDetail,id:key} );
  // }

  // setExpense(expenseArr);  
}

const newExpenseHandler= (newItem,id)=>{
//  const passItem = {...newItem,id};
// const passItem = newItem   

  // setExpense( 
  //   [
  //    ...expense, passItem ,
  //           ])
  //  dispatch(expenseAction.addExpense(passItem))

          getAllExpense();
          showLeaderBoard();
          OnDownloadExpense();
}


const deleteExpenseeHandler= async (deleteId)=>{
 dispatch(expenseAction.removeExpense({id: deleteId}));
   await deleteExpense(deleteId);

   await getAllExpense();
   await showLeaderBoard();
   OnDownloadExpense();

}

const editExpenseeHandler= async (item,id)=>{
  console.log('edit habdler==',item,id);
//  dispatch(expenseAction.updateExpense({item,id}));
   await editExpense(item,id);
   editCtx.offSureEdit();
 await getAllExpense();
 showLeaderBoard();
 OnDownloadExpense();
 //  getAllExpense();
  // await deleteExpense(deleteId);
  // await getAllExpense();

}


useEffect(()=>{
  
   getAllExpense(1);
  //  OnDownloadExpense();
},[rowChange]);


const categories=["Electronic","Food", "SkinCare"]; 


const sendEmailVerification = async (idToken, apiKey) => {
   console.log("request started" ,idToken, apiKey);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
  
    const payload = {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email verification');
      }
          setIsVerified(true);
      console.log('Email verification sent successfully');
    } catch (error) {
      console.log('Error sending email verification:', error);
    }
  };
   const makeEmailRequest = () =>{
      const token = user.idToken
      const api ='AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4';
        sendEmailVerification(token,api);
   }
   const onPremiumTheme = async (e)=>{
  //dispatch(themeAction.darkTheme());
 try {
  const resp = await axios.get('http://localhost:3000/purchase/premiummembership',{
    headers: {'Authorization': user.idToken}
  })
  console.log("is order created===",resp)
  const options = {
    "key": resp.data.key_id,
    "order_id": resp.data.order.id,
    "handler": async function (response) {
 // This function will be called when the payment is successful
      
        console.log('Payment successful!', response);
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
          status: "SUCCESSFUl",
          isPremium: true,
        },{
          headers: {'Authorization': user.idToken}
        })
      
         dispatch(authAction.onPayment());
         // You can perform any actions after a successful payment here
    }
     };

  const rzp = new window.Razorpay(options);
  rzp.open();
  e.preventDefault();
  rzp.on('payment.failed', async function (response){
    console.log("payment failed==",response)
    await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
      order_id: options.order_id,
      payment_id: null,
      status: "FAILED",
      isPremium: false,
    },{
      headers: {'Authorization': user.idToken}
    })
  
  })

 } catch (error) {
  console.log("got error with api==",error);
 }
   }
   const onToggleTheme = ()=>{
    dispatch(themeAction.toggleTheme());
     }
     const OnDownloadExpense = async ()=>{
      
      //  const blob = new Blob(expense,{type: 'text/plain'})
        //  setHref(URL.createObjectURL(blob) );
       try {
     const resp = await  axios.get('http://localhost:3000/expense/download',{headers:{'Authorization': user.idToken}})
   console.log('downlad link==',resp);
     if(resp.status===200){
     setHref(resp.data.fileUrl);
     
      //downloadLinkRef.current.click();
       }    
    
    } catch (error) {
          console.log(error);
        }
       }

        const showLeaderBoard =async () =>{
          console.log("inot show leaderboarcd ");
     const resp=     await axios.get('http://localhost:3000/purchase/showLeaderboard',{
            headers: {'Authorization': user.idToken}
          })
          const leaderList = await resp.data.leaderList;
          console.log("leader list===",resp);
        setLeaderBoard(leaderList);
      setShowLeaderBoard(!showBoard);  
      }

      
        
  
  return (
    <div style={{marginTop: '7%'}} >
    <div style={{color: 'black' , display: 'flex' , justifyContent:'space-between'}}>
    
      <div>profile is incomplete.<Link to='/profile' >Complete Now</Link> </div>
    </div>
    <div style={{display:'flex', justifyContent: 'space-around'}} >
    <Button   style={{ backgroundColor: isVerified? 'green': 'red', }} onClick={makeEmailRequest}> { isVerified? 'verified': 'Verify Email'}  </Button>
   {!user.isPremium && <Button   variant='success'  onClick={onPremiumTheme}>Activate-premium</Button> }
   {user.isPremium && <Button   variant='success' >You are a Premium User</Button>  }  
   {user.isPremium && <Button   variant='dark'  onClick={showLeaderBoard}>show-Leaderoard</Button> }  
     {user.isPremium && <Button   variant='info'  > <a  ref={downloadLinkRef} download="expense.csv" href={href} >DownLoad-Expense</a> </Button>}
    <Button   variant='warning'  onClick={onToggleTheme}>change-theme</Button>    
    </div>
    <NewExpense setExpense={newExpenseHandler} editExp ={editExpenseeHandler}  />
      <Expenses item = {expense} cat={categories[0]} deleteExp={deleteExpenseeHandler} editExp ={editExpenseeHandler} />
      <Expenses item = {expense} cat={categories[1]} deleteExp={deleteExpenseeHandler}   editExp ={editExpenseeHandler} />
      <Expenses item = {expense} cat={categories[2]} deleteExp={deleteExpenseeHandler}  editExp ={editExpenseeHandler} />
    {paginationInfo && 
      <div style={{display:'flex',justifyContent:'space-around',alignItems: 'center', padding:'10px',margin:'7px'}}>
     {paginationInfo.hasPreviousPage && <Button  onClick={()=> getAllExpense(paginationInfo.currentPage-1)} >PREV{'<<'} </Button> } 
      <Button  variant='warning' onClick={()=> getAllExpense(paginationInfo.currentPage)} >PAGE {paginationInfo.currentPage}</Button>
     {paginationInfo.hasNextPage && <Button  onClick={()=> getAllExpense(paginationInfo.currentPage+1)} >NEXT{'>>'} </Button> } 
      <Button  onClick={()=> getAllExpense(paginationInfo.lastPage)} >LAST-PAGE </Button>
     </div>
     } 
     
     
       { showBoard && 
         <>
       <h1 >LeaderBoard:</h1>
           <div style={{display: 'flex',flexDirection:'column', justifyContent:"center",alignItems:'center',width:'90%'}}>
            {
              leaderBoard.map(rank => {
                return (
                  <div style={{margin:'8px',padding:'10px',backgroundColor: 'Highlight',width:'100%'}}>
                    <li style={{fontWeight: 'bold'}} >
                      {rank.name}:: expenseAmount: {rank.totalCost}
                    </li>
                  </div>
                )
              })
            }
           </div>  
           </>    
        }
       </div>
       
  )
}

export default Welcom;
