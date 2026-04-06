import React, { useEffect, useState } from 'react';
import Container from '../components/Container';

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

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center py-8">
          <p className="font-body text-gray-500">Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="font-display text-2xl md:text-3xl text-green-900 text-center font-bold mb-2">
        Admin
      </h1>
      <div className="gold-divider mb-5"></div>

      <div className="overflow-x-auto -mx-6 md:-mx-8">
        <table className="min-w-full font-body text-sm">
          <thead>
            <tr className="bg-green-950 text-gold-300">
              <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wider">Name</th>
              <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wider">Shirt</th>
              <th className="px-4 py-2.5 text-center font-semibold text-xs uppercase tracking-wider">Paid</th>
              <th className="px-4 py-2.5 text-center font-semibold text-xs uppercase tracking-wider">Fri</th>
              <th className="px-4 py-2.5 text-center font-semibold text-xs uppercase tracking-wider">Mon</th>
              <th className="px-4 py-2.5 text-right font-semibold text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-green-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 uppercase">{user.shirt}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span className={`inline-block w-2 h-2 rounded-full ${user.paid ? 'bg-green-500' : 'bg-amber-400'}`}></span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{user.friday ? 'Y' : '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-600">{user.monday ? 'Y' : '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right space-x-2">
                  <button
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      user.paid
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    onClick={() => handlePaidToggle(user.id, !user.paid)}
                  >
                    {user.paid ? 'Unpaid' : 'Paid'}
                  </button>
                  <button
                    className="px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
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
    </Container>
  );
};

export default AdminPage;
