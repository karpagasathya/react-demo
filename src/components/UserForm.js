import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const API_URL = 'https://react-demo-77dq.onrender.com/api/users';

function UserForm() {
  const [form, setForm] = useState({
    userId: '',
    userName: '',
    email: '',
    _id: null
  });
  const [submitted, setSubmitted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setSubmitted(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      // Update existing user
      const res = await fetch(`${API_URL}/${form._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const updatedUser = await res.json();
      setSubmitted(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
    } else {
      // Add new user
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: form.userId, userName: form.userName, email: form.email })
      });
      const newUser = await res.json();
      setSubmitted(prev => [...prev, newUser]);
    }
    setForm({ userId: '', userName: '', email: '', _id: null });
    setEditIndex(null);
  };

  const handleRowClick = (idx) => {
    const user = submitted[idx];
    setForm({ ...user });
    setEditIndex(idx);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa', p: 4 }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'left', color: '#1976d2', marginBottom: 32 }}>User Entry Form</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', mb: 4 }}>
        <TextField label="User Identifier" name="userId" value={form.userId} onChange={handleChange} required />
        <TextField label="User Name" name="userName" value={form.userName} onChange={handleChange} required />
        <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} required />
        <Button variant="contained" color="primary" type="submit" size="large">
          {form._id ? 'Update' : 'Save'}
        </Button>
      </Box>
      {submitted.length > 0 && (
        <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User Identifier</strong></TableCell>
                <TableCell><strong>User Name</strong></TableCell>
                <TableCell><strong>Email Address</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submitted.map((entry, idx) => (
                <TableRow key={entry._id} hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(idx)}>
                  <TableCell>{entry.userId}</TableCell>
                  <TableCell>{entry.userName}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default UserForm;
