import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, EditableUser } from '../types/allTypes';

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editableUser, setEditableUser] = useState<EditableUser | null>(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    profileImage: '',
    profileImageFile: null as File | null,
  });

  const defaultProfileImages = [
    'Prof1.jpg',
    'Prof6.jpg',
    'Prof4.jpg',
    'Prof8.jpg'
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/admin/user', { 
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users. Maybe not allowed?');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: unknown) {
      console.error('Fetch error:', err);
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditableUser({ ...user });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isNewUser = false
  ) => {
    const { name, value } = e.target;
    if (isNewUser) {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'profileImage' && { profileImageFile: null }),
      }));
    } else if (editableUser) {
      setEditableUser({
        ...editableUser,
        [name]: value,
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNewUser = false
  ) => {
    const file = e.target.files?.[0] || null;
    if (isNewUser) {
      setNewUser((prev) => ({
        ...prev,
        profileImageFile: file,
        ...(file && { profileImage: '' }),
      }));
    } else if (editableUser) {
      setEditableUser({
        ...editableUser,
        profileImageFile: file,
        ...(file && { profileImage: '' }),
      });
    }
  };

  const handleDefaultImageSelect = (img: string) => {
    setNewUser((prev) => ({
      ...prev,
      profileImage: `/asserts/images/profilePictures/${img}`,
      profileImageFile: null,
    }));
  };

  const handleDefaultImageSelectEdit = (img: string) => {
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        profileImage: `/asserts/images/profilePictures/${img}`,
        profileImageFile: null,
      });
    }
  };

  const handleSave = async (id: string) => {
    if (!editableUser) return;
    try {
      const formData = new FormData();
      if (editableUser.name) formData.append('name', editableUser.name);
      if (editableUser.email) formData.append('email', editableUser.email);
      if (editableUser.role) formData.append('role', editableUser.role);

      if (editableUser.profileImageFile) {
        formData.append('profileImage', editableUser.profileImageFile);
      } else {
        formData.append('profileImage', editableUser.profileImage || '');
      }

      const response = await fetch(`/admin/user/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      await fetchUsers();
      setEditableUser(null);
    } catch (err: unknown) {
      alert('Error updating user: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/admin/user/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        await fetchUsers();
      } catch (err: unknown) {
        alert('Error deleting user: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    }
  };

  const handleAddUser = async () => {
    try {
      const { name, email, password, role, profileImage, profileImageFile } = newUser;

      if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('role', role);
      formData.append('password', password);

      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      } else if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await fetch('/admin/user', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      await fetchUsers();
      setNewUser({
        name: '',
        email: '',
        role: 'user',
        password: '',
        profileImage: '',
        profileImageFile: null,
      });
    } catch (err) {
      alert('Error adding user: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{user ? `Hello ${user.name}, welcome to ` : ''}Admin Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Profile Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editableUser && editableUser._id === user._id ? (
              <tr key={user._id}>
                <td className="border p-2">{user._id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="name"
                    value={editableUser.name}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="email"
                    name="email"
                    value={editableUser.email}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <select
                    name="role"
                    value={editableUser.role}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-1 w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="border p-2">********</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="profileImage"
                    value={editableUser.profileImage}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Profile Image URL"
                    className="border p-1 w-full mb-1"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    className="border p-1 mb-1 w-full"
                  />
                  <div className="flex gap-2 mb-1">
                    {defaultProfileImages.map((img) => (
                      <img
                        key={img}
                        src={`/asserts/images/profilePictures/${img}`}
                        alt={img}
                        className={`w-10 h-10 rounded-full cursor-pointer ${editableUser.profileImage === `/asserts/images/profilePictures/${img}`
                            ? 'border-2 border-blue-500'
                            : ''
                          }`}
                        onClick={() => handleDefaultImageSelectEdit(img)}
                      />
                    ))}
                  </div>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleSave(user._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditableUser(null)}
                    className="px-2 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user._id}>
                <td className="border p-2">{user._id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">********</td>
                <td className="border p-2">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}

          <tr>
            <td className="border p-2">Create New User</td>
            <td className="border p-2">
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Name"
                className="border p-1 w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Email"
                className="border p-1 w-full"
              />
            </td>
            <td className="border p-2">
              <select
                name="role"
                value={newUser.role}
                onChange={(e) => handleInputChange(e, true)}
                className="border p-1 w-full"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
            <td className="border p-2">
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Password"
                className="border p-1 w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                name="profileImage"
                value={newUser.profileImage}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Profile Image URL"
                className="border p-1 w-full mb-1"
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, true)}
                className="border p-1 mb-1 w-full"
              />
              <div className="flex gap-2 mb-1">
                {defaultProfileImages.map((img) => (
                  <img
                    key={img}
                    src={`/asserts/images/profilePictures/${img}`}
                    alt={img}
                    className={`w-10 h-10 rounded-full cursor-pointer ${newUser.profileImage === `/asserts/images/profilePictures/${img}`
                        ? 'border-2 border-blue-500'
                        : ''
                      }`}
                    onClick={() => handleDefaultImageSelect(img)}
                  />
                ))}
              </div>
            </td>
            <td className="border p-2">
              <button
                onClick={handleAddUser}
                className="px-2 py-1 bg-green-500 text-white rounded w-full"
              >
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