import React, { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: string; password: string }>({ name: '', email: '', role: 'user', password: '' });

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/admin/user', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users. Maybe not allowed?');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err: unknown) {
      console.error('Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    try {
      const response = await fetch('/admin/user', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      alert('Error refreshing users: ' + err.message);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditableUser({ ...user });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/admin/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      await refreshUsers();
      setEditUserId(null);
      setEditableUser(null);
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/admin/users/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        alert('Error deleting user: ' + err.message);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        alert("Please fill in all fields.");
        return;
      }
      const response = await fetch('/admin/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      await refreshUsers();
      setNewUser({ name: '', email: '', role: 'user', password: '' });
    } catch (err) {
      alert('Error adding user: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
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
  );
};

export default AdminPage;
