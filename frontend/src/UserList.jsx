// frontend/src/UserList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditUsername(user.username);
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, {
      username: editUsername
    });
    setEditingId(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="user-list">
      <h2>Registered Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {editingId === user._id ? (
              <>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
                <button onClick={() => handleUpdate(user._id)}>Save</button>
              </>
            ) : (
              <>
                <span>{user.username}</span>
                <button onClick={() => handleEdit(user)}>✏️</button>
                <button onClick={() => handleDelete(user._id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;