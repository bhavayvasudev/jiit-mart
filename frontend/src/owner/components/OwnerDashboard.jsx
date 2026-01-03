import { useState, useEffect } from 'react';
import axios from 'axios';
import { STATUS_COLORS, getNextStatus } from '../utils/statusHelpers';

export default function OwnerDashboard() {
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  useEffect(() => {
    fetchOrders();
    // Optional: SetInterval for polling every 30s
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('/api/orders/admin/all', { headers: { Authorization: `Bearer ${token}` } });
    setOrders(res.data);
  };

  const updateStatus = async (orderId, newStatus) => {
    await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus }, ...);
    fetchOrders(); // Refresh UI
  };

  return (
    <div className="p-4 grid gap-4">
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded shadow bg-white">
          <div className="flex justify-between">
            <h3 className="font-bold">Order #{order._id.slice(-6)}</h3>
            <span className={`px-2 py-1 rounded ${STATUS_COLORS[order.status]}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
          <p className="font-medium mt-2">Location: {order.location}</p>
          
          <ul className="mt-2 text-sm">
            {order.items.map((item, idx) => (
              <li key={idx}>{item.quantity}x {item.name}</li>
            ))}
          </ul>
          
          <div className="mt-4 flex gap-2">
            {/* Status Button Logic */}
            {getNextStatus(order.status) && (
              <button 
                onClick={() => updateStatus(order._id, getNextStatus(order.status))}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Mark as {getNextStatus(order.status)}
              </button>
            )}
            {order.status === 'PENDING' && (
              <button 
                 onClick={() => updateStatus(order._id, 'REJECTED')}
                 className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}