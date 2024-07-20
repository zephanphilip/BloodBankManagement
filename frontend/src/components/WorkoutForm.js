import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

function WorkoutForm() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { name, age, email, phone, bloodType, role };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (response.ok) {
      setName('');
      setAge('');
      setEmail('');
      setPhone('');
      setBloodType('');
      setRole('');
      setError(null);
      console.log('New workout added', json);
      if (role === 'Donor') {
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Request Form
      </Typography>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Phone no."
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Blood Type"
        value={bloodType}
        onChange={(e) => setBloodType(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <FormControl required fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          <MenuItem value="Receiver">Receiver</MenuItem>
          <MenuItem value="Donor">Donor</MenuItem>
        </Select>
        {role === 'Receiver' && (
        <TextField
          required
          label="Blood Units Needed"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit Request
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default WorkoutForm;

