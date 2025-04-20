'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Order {
  id: string;
  buyerName: string;
  contactNumber: string;
  deliveryAddress: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  }[];
  createdAt: string;
}

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!orderId) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Track Your Order</h2>
        <div className="card">
          <p className="text-gray-600">Enter your order ID to track your order status.</p>
          {/* Add order ID input form here if needed */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>
      
      <div className="card space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">Order #{order.id}</h3>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status.replace('_', ' ')}
          </span>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Delivery Details</h4>
          <p className="text-gray-600">{order.buyerName}</p>
          <p className="text-gray-600">{order.contactNumber}</p>
          <p className="text-gray-600">{order.deliveryAddress}</p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}kg</span>
                <span className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}