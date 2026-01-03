export const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-purple-100 text-purple-800",
  READY: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  REJECTED: "bg-red-100 text-red-800"
};

export const getNextStatus = (currentStatus) => {
  switch(currentStatus) {
    case 'PENDING': return 'ACCEPTED';
    case 'ACCEPTED': return 'PREPARING';
    case 'PREPARING': return 'READY';
    case 'READY': return 'COMPLETED';
    default: return null;
  }
};