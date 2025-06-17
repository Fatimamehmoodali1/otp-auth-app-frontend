"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  // ✅ Fetch Users
  const fetchUsers = async () => {
    const res = await fetch("https://backend-auth-app-production.up.railway.app/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete User
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`https://backend-auth-app-production.up.railway.app/api/admin/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers(); // Refresh list
  };

  // ✅ Start Edit
  const startEdit = (user) => {
    setEditingUser(user._id);
    setEditData({ name: user.name, email: user.email, phone: user.phone });
  };

  // ✅ Submit Edit
  const handleEdit = async (e) => {
    e.preventDefault();
    await fetch(`https://backend-auth-app-production.up.railway.app/api/admin/users/${editingUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingUser(null);
    fetchUsers(); // Refresh
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
        🛠️ Admin Dashboard
      </h1>

      {/* Users Table */}
      <div className="overflow-auto shadow-xl rounded-xl bg-white p-4">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2">👤 Name</th>
              <th className="px-4 py-2">📧 Email</th>
              <th className="px-4 py-2">📱 Phone</th>
              <th className="px-4 py-2">✅ Verified</th>
              <th className="px-4 py-2">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-orange-100 transition"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone || "-"}</td>
                <td className="px-4 py-2">
                  {user.verified ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <form
          onSubmit={handleEdit}
          className="bg-white shadow-xl p-6 mt-6 rounded-xl max-w-md mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-4 text-orange-600">
            ✏️ Edit User
          </h3>
          {["name", "email", "phone"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={editData[field]}
              placeholder={`Edit ${field}`}
              onChange={(e) =>
                setEditData({ ...editData, [field]: e.target.value })
              }
              className="w-full mb-4 border p-3 rounded-xl"
            />
          ))}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
            >
              ✅ Save
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}