
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Order.css'
import {toast} from 'react-toastify'
import {assets} from "../../assets/assets"

const Order = ({url}) => {
  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.data) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders", error);
      toast.error("Error fetching orders");
    }
  }
  const statusHandler = async (event, orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {Orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            
            <p className="order-item-food">
              {order.items?.map((item, i) => 
                i === order.items.length - 1 
                  ? `${item.name} X ${item.quantity}` 
                  : `${item.name} X ${item.quantity}, `
              )}
            </p>

            <p className="order-item-name">
              {order.address?.firstName} {order.address?.lastName}
            </p>

            <p className="order-item-address">
              {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}
            </p>

            <p>Items: {order.items?.length}</p>
            <p>${order.amount}</p>

            <select onChange={(event)=>statusHandler(event,order._id)}value={order.status}>
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

export default Order;
