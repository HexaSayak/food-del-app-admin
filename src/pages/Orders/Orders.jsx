import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from "axios"
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Orders = ({ url }) => {
//const Orders = () => {
  // const url = "http://localhost:4000"
  //const url = "https://food-del-app-backend-x861.onrender.com"
  
  const [orders,setOrders] = useState([]);

  // const fetchAllOrders = async () => {

  //   const response = await axios.get(url+"api/order/list");
  //   if (response.data.success) {
  //       setOrders(response.data.data);
  //       console.log(response.data.data);
  //   }
  //   else{
  //       toast.error("Error");
  //   }
  // }
  const fetchAllOrders = async () => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      toast.error("Invalid URL provided.");
      return;
    }
    try {
      const response = await axios.get(url+"/api/order/list");
      // const response = await axios.get("http://localhost:4000/api/order/list"); 
      //const response = await axios.get("http://food-del-app-backend-x861.onrender.com/api/order/list"); 
      //const response = await axios.get(`${url}/api/order/list`);
      
      if (response.data.success) {
          setOrders(response.data.data);
          console.log(response.data.data);
      }
      else{
          toast.error("Error");
      }
     
    } catch (error) {
      toast.error("Server error!");
      console.error(error);
    }

  
    // const response = await axios.get(url+"api/order/list");
    // if (response.data.success) {
    //     setOrders(response.data.data);
    //     console.log(response.data.data);
    // }
    // else{
    //     toast.error("Error");
    // }
  }

  const statusHandler = async (event,orderId) => {
    if(!url){
      toast.error("URL is not defined");
      return;
    }
    //const response = await axios.post(url+"api/order/status",{
    // const response = await axios.post("http://localhost:4000/api/order/status",{
    //const response = await axios.post("http://food-del-app-backend-x861.onrender.com/api/order/status",{
    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
        await fetchAllOrders();
    }
    
  }

  useEffect(()=>{
    fetchAllOrders();
  })
  // useEffect(()=>{
  //   fetchAllOrders();
  // },[])

  

  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order,index)=>(
            <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                      {order.items.map((item,index)=>{
                          if (index===order.items.length-1) {
                              return item.className + " x " + item.quantity
                              // return item.name + " x " + item.quantity
                          }
                          else{
                            return item.name + " x " + item.quantity + ", "
                          }
                      })}
                  </p>
                  <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                  <div className="order-item-address">
                    <p>{order.address.street+", "}</p>
                    <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>₹{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Orders;
