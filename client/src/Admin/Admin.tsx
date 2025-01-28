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
        const response = await fetch(`/admin/user/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        await refreshUsers();
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
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Password</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="border border-gray-300 p-2">{user._id}</td>
              <td className="border border-gray-300 p-2">
                {editUserId === user._id ? (
                  <input
                    type="text"
                    value={editableUser.name}
                    onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editUserId === user._id ? (
                  <input
                    type="email"
                    value={editableUser.email}
                    onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editUserId === user._id ? (
                  <select
                    value={editableUser.role}
                    onChange={(e) => setEditableUser({ ...editableUser, role: e.target.value })}
                    className="border p-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editUserId === user._id ? (
                  <input
                    type="password"
                    value={editableUser.password || ''}
                    onChange={(e) => setEditableUser({ ...editableUser, password: e.target.value })}
                    className="border p-1"
                    autoComplete="new-password"
                  />
                ) : (
                  '********'
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editUserId === user._id ? (
                  <>
                    <button
                      className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleSave(user._id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 bg-gray-500 text-white rounded"
                      onClick={() => {
                        setEditUserId(null);
                        setEditableUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr className="border-t">
            <td className="border border-gray-300 p-2">Create New User</td>
            <td className="border border-gray-300 p-2">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border p-1"
                placeholder="Name"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border p-1"
                placeholder="Email"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="border p-1"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
            <td className="border border-gray-300 p-2">
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border p-1"
                placeholder="Password"
                autoComplete="new-password"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={handleAddUser}>
                Add User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;