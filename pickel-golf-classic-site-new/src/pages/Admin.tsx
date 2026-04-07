import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  shirt: string;
  paid: boolean;
  friday: boolean;
  monday: boolean;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data: User[] = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePaidToggle = async (id: number, paid: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paid }),
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <PageHeader annualNumber={6} title="Admin" />
      <div className="content-panel">
        <div className="px-6 py-12">
          {loading ? (
            <p className="font-display text-xl text-text-muted text-center">Loading...</p>
          ) : (
            <div className="overflow-x-auto bg-white border border-cream-dark">
              <table className="min-w-full font-sans text-sm">
                <thead>
                  <tr className="bg-primary-color">
                    <th className="px-4 py-3 text-left text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Name</th>
                    <th className="px-4 py-3 text-left text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Shirt</th>
                    <th className="px-4 py-3 text-center text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Paid</th>
                    <th className="px-4 py-3 text-center text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Fri</th>
                    <th className="px-4 py-3 text-center text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Mon</th>
                    <th className="px-4 py-3 text-right text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-secondary-color">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-dark">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3 font-display text-lg text-text-dark">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-4 py-3 text-text-mid uppercase">{user.shirt}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block text-[0.6rem] tracking-wider uppercase font-bold px-2 py-1 border rounded ${
                          user.paid
                            ? 'text-green-800 border-green-700 bg-green-50'
                            : 'text-amber-800 border-amber-500 bg-amber-50'
                        }`}>
                          {user.paid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-text-mid">{user.friday ? 'Y' : '–'}</td>
                      <td className="px-4 py-3 text-center text-text-mid">{user.monday ? 'Y' : '–'}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          className={`text-[0.6rem] tracking-wider uppercase font-bold px-3 py-1.5 border rounded transition-colors ${
                            user.paid
                              ? 'text-amber-700 border-amber-400 hover:bg-amber-50'
                              : 'text-green-700 border-green-600 hover:bg-green-50'
                          }`}
                          onClick={() => handlePaidToggle(user.id, !user.paid)}
                        >
                          {user.paid ? 'Mark Unpaid' : 'Mark Paid'}
                        </button>
                        <button
                          className="text-[0.6rem] tracking-wider uppercase font-bold px-3 py-1.5 border border-red-400 text-red-600 rounded hover:bg-red-50 transition-colors"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
