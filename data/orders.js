// data/orders.js

export const initialOrders = [
  {
    id: "ORD-001",
    customerName: "Rahul (B-304)",
    location: "Hostel B",
    items: [{ name: "Veg Cheese Maggi", qty: 2 }, { name: "Coke 250ml", qty: 1 }],
    totalAmount: 145,
    paymentMethod: "UPI",
    status: "PENDING",
    timestamp: "10:42 AM"
  },
  {
    id: "ORD-002",
    customerName: "Priya (Girls H-102)",
    location: "Girls Hostel",
    items: [{ name: "Chicken Momos", qty: 1 }],
    totalAmount: 120,
    paymentMethod: "CASH",
    status: "PREPARING",
    timestamp: "10:38 AM"
  },
  {
    id: "ORD-003",
    customerName: "Amit (Library)",
    location: "Library",
    items: [{ name: "Cold Coffee", qty: 1 }, { name: "Sandwich", qty: 1 }],
    totalAmount: 180,
    paymentMethod: "UPI",
    status: "READY",
    timestamp: "10:30 AM"
  },
  {
    id: "ORD-004",
    customerName: "Dev (C-101)",
    location: "Hostel C",
    items: [{ name: "Aloo Paratha", qty: 2 }],
    totalAmount: 90,
    paymentMethod: "CASH",
    status: "PENDING",
    timestamp: "10:45 AM"
  }
];