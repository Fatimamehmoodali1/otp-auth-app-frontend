"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", email: "", phone: "" });

  // 📥 Fetch all users on load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("https://backend-auth-app-production.up.railway.app/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  };

  // 📝 Start editing a user
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedData({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
  };

  // 💾 Save updated user
  const handleSave = async (id) => {
    const res = await fetch(`https://backend-auth-app-production.up.railway.app/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    });
    if (res.ok) {
      alert("✅ User updated successfully!");
      setEditingUser(null);
      fetchUsers();
    } else {
      alert("❌ Failed to update user.");
    }
  };

  // 🗑️ Delete user
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`https://backend-auth-app-production.up.railway.app/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑️ User deleted!");
        fetchUsers();
      } else {
        alert("❌ Failed to delete user.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-100 via-emerald-100 to-lime-100 p-6">
      <div className="bg-white border border-green-200 shadow-2xl rounded-3xl p-10 w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-center text-emerald-600 mb-10">
          👥 All Registered Users
        </h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-100 text-emerald-700">
                  <th className="p-3">👤 Name</th>
                  <th className="p-3">📧 Email</th>
                  <th className="p-3">📱 Phone</th>
                  <th className="p-3 text-center">⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-emerald-50 transition"
                  >
                    <td className="p-3">
                      {editingUser === user._id ? (
                        <input
                          type="text"
                          value={editedData.name ?? ""}
                          onChange={(e) =>
                            setEditedData({ ...editedData, name: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="p-3">
                      {editingUser === user._id ? (
                        <input
                          type="email"
                          value={editedData.email ?? ""}
                          onChange={(e) =>
                            setEditedData({ ...editedData, email: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="p-3">
                      {editingUser === user._id ? (
                        <input
                          type="text"
                          value={editedData.phone ?? ""}
                          onChange={(e) =>
                            setEditedData({ ...editedData, phone: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        user.phone || "-"
                      )}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      {editingUser === user._id ? (
                        <>
                          <button
                            onClick={() => handleSave(user._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-xl"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-xl"
                          >
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl"
                          >
                            📝 Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}