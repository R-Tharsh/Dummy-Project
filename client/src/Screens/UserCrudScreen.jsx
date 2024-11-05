import React, { useEffect, useState } from "react";
import {
  fetchAllUsersAPI,
  deleteUserAPI,
  registerUserAPI,
  updateUserAPI,
} from "../services/apiService"; // Ensure all necessary API functions are imported

const UserCrudScreen = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" }); // State for new user form
  const [editingUser, setEditingUser] = useState(null); // State for editing a user

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsersAPI(); // Fetch users
      setUsers(response.data); // Set users state
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      await registerUserAPI(newUser); // Call the API to create a new user
      setNewUser({ name: "", email: "", password: "" }); // Reset form
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUser(user); // Set the selected user in the state for editing
  };

  // Handle updating an existing user
  const handleUpdateUser = async () => {
    try {
      await updateUserAPI(editingUser.id, editingUser); // Update user API call
      setEditingUser(null); // Clear the editing state
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUserAPI(id); // Delete user API call
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add User Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddUser} className="bg-blue-500 text-white p-2">
          Add User
        </button>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white p-2"
          >
            Update User
          </button>
        </div>
      )}

      {/* User List */}
      <div className="user-list">
        <h3 className="text-xl font-semibold">User List</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex justify-between border-b py-2">
              <div>
                <strong>{user.name}</strong> - {user.email}
              </div>
              <div>
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserCrudScreen;
