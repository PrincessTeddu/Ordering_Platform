'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface Order {
  id: string;
  buyerName: string;
  contactNumber: string;
  deliveryAddress: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
  items: {
    id: string;
    quantity: number;
    product: Product;
  }[];
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    } else {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order status');
      fetchOrders(); // Refresh orders list
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          price: parseFloat(formData.get('price') as string),
          description: formData.get('description'),
        }),
      });

      if (!response.ok) throw new Error('Failed to add product');
      fetchProducts(); // Refresh products list
      form.reset();
    } catch (err) {
      setError('Failed to add product');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>

      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-green-600 text-green-600' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Manage Orders
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-green-600 text-green-600' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                  className="input max-w-xs"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>

              <div className="space-y-2">
                <p><strong>Customer:</strong> {order.buyerName}</p>
                <p><strong>Contact:</strong> {order.contactNumber}</p>
                <p><strong>Address:</strong> {order.deliveryAddress}</p>
                <div className="mt-4">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.product.name} - {item.quantity}kg
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleAddProduct} className="card">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per kg
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  required
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="input"
                  rows={3}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Products</h3>
            {products.map((product) => (
              <div key={product.id} className="card flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-gray-600">${product.price.toFixed(2)} per kg</p>
                  {product.description && (
                    <p className="text-sm text-gray-500">{product.description}</p>
                  )}
                </div>
                <button className="btn btn-secondary">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}