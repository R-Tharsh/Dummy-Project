import React, { useEffect, useState } from "react";
import {
  fetchAllUsersAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../services/apiService";

const CrudPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchAllUsersAPI();
      setUsers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email });
  };

  // Submit the edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserAPI(editingUser.id, formData);
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      setError(err);
    }
  };

  // Handle delete user
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserAPI(id);
        fetchUsers(); // Refresh the user list
      } catch (err) {
        setError(err);
      }
    }
  };

  // Render loading state or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
                placeholder="Username"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteClick(user.id)}
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

export default CrudPage;
