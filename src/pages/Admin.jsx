import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Users, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const withAuth = (getToken) => async (path, options = {}) => {
  const token = await getToken();
  const res = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const Admin = () => {
  const { user, getAccessToken } = useAuth();
  const fetchJson = withAuth(getAccessToken);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', price: '', description: '' });
  // Removed unused loading variable:
  // const [loading, setLoading] = useState(false);

  const loadAll = useCallback(async () => {
    // setLoading(true); // removed since loading state removed
    try {
      const [p, o, u] = await Promise.all([
        fetchJson('/.netlify/functions/admin-products'),
        fetchJson('/.netlify/functions/admin-orders'),
        fetchJson('/.netlify/functions/admin-users'),
      ]);
      setProducts(p);
      setOrders(o);
      setUsers(u);
    } catch (e) {
      console.error(e);
    } finally {
      // setLoading(false);
    }
  }, [fetchJson]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const submitProduct = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    await fetchJson('/.netlify/functions/admin-products', { method, body: JSON.stringify(form) });
    setForm({ id: null, name: '', price: '', description: '' });
    loadAll();
  };

  const removeProduct = async (id) => {
    await fetchJson('/.netlify/functions/admin-products', { method: 'DELETE', body: JSON.stringify({ id }) });
    loadAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Signed in as {user?.email} ({user?.role})</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2"><Package className="h-5 w-5" /> Products</h2>
              </div>
              <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="input-field" required />
                <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="input-field" required />
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input-field" />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary inline-flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" /> {form.id ? 'Update' : 'Create'}
                </motion.button>
              </form>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-600 dark:text-gray-400">
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Description</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t dark:border-gray-800">
                        <td className="py-2">{p.name}</td>
                        <td className="py-2">${Number(p.price).toFixed(2)}</td>
                        <td className="py-2 truncate max-w-xs">{p.description}</td>
                        <td className="py-2 flex gap-2">
                          <button className="btn-secondary inline-flex items-center gap-1" onClick={() => setForm({ id: p.id, name: p.name, price: p.price, description: p.description })}><Edit2 className="h-4 w-4" /> Edit</button>
                          <button className="btn-secondary inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => removeProduct(p.id)}><Trash2 className="h-4 w-4" /> Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-600 dark:text-gray-400">
                    <tr>
                      <th className="py-2">Order #</th>
                      <th className="py-2">Customer</th>
                      <th className="py-2">Total</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-t dark:border-gray-800">
                        <td className="py-2">{o.id}</td>
                        <td className="py-2">{o.customer_email}</td>
                        <td className="py-2">${Number(o.total).toFixed(2)}</td>
                        <td className="py-2">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Users className="h-5 w-5" /> Users</h2>
            <ul className="space-y-3">
              {users.map((u) => (
                <li key={u.id} className="flex items-center justify-between border-b dark:border-gray-800 pb-2">
                  <div>
                    <div className="font-medium">{u.full_name || u.id}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{u.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
