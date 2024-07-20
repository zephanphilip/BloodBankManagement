import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Paper, Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function AdminBbDetails({ bdetail }) {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const [open, setOpen] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(bdetail);

  const sendNotification = async (userId, message) => {
    try {
      console.log(userId, message);
      await fetch('http://localhost:4000/api/user/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId, message })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleClickApprove = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/approve/${bdetail._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ isApproved: true })  // changed key name to match
      });

      const json = await response.json();

      if (response.ok) {
        // Update the local state
        setUpdatedDetails(prevDetails => ({ ...prevDetails, isApproved: true }));
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been approved.`);
      } else {
        console.error('Failed to approve:', json.error);
      }
    } catch (error) {
      console.error('Error approving workout:', error);
    }
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('http://localhost:4000/api/workouts/' + bdetail._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been rejected.`);
    }
  };

  const handleUpdate = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${bdetail._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedDetails)
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        setOpen(false);
        await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been updated.`);
      } else {
        console.error('Failed to update:', json.error);
      }
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" component="h4" gutterBottom>
        {updatedDetails.name} {/* Changed to display updated details */}
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>AGE:</strong> {updatedDetails.age}
        </Typography>
        <Typography variant="body1">
          <strong>EMAIL:</strong> {updatedDetails.email}
        </Typography>
        <Typography variant="body1">
          <strong>PHONE:</strong> {updatedDetails.phone}
        </Typography>
        <Typography variant="body1">
          <strong>BLOOD TYPE:</strong> {updatedDetails.bloodType}
        </Typography>
        <Typography variant="body1">
          <strong>ROLE:</strong> {updatedDetails.role}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDistanceToNow(new Date(updatedDetails.createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {!updatedDetails.isApproved && (
          <Button
            variant="contained"
            color="success"
            sx={{ mb: 1 }}
            onClick={handleClickApprove}
          >
            APPROVE
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={handleClick}
        >
          REJECT
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          onClick={() => setOpen(true)}
        >
          UPDATE
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={updatedDetails.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={updatedDetails.age}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={updatedDetails.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={updatedDetails.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="bloodType"
            label="Blood Type"
            type="text"
            fullWidth
            value={updatedDetails.bloodType}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={updatedDetails.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AdminBbDetails;


// import React, { useState } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { Paper, Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// function AdminBbDetails({ bdetail }) {
//   const { user } = useAuthContext();
//   const { dispatch } = useWorkoutsContext();
//   const [open, setOpen] = useState(false);
//   const [updatedDetails, setUpdatedDetails] = useState(bdetail);

//   const sendNotification = async (userId, message) => {
//     try {
//       console.log(userId, message);
//       await fetch('http://localhost:4000/api/user/notifications', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ userId, message })
//       });
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }
//   };

//   const handleClickApprove = async () => {
//     if (!user) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/approve/${bdetail._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ isApprove: true })
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//         await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been approved.`);
//       } else {
//         console.error('Failed to approve:', json.error);
//       }
//     } catch (error) {
//       console.error('Error approving workout:', error);
//     }
//   };

//   const handleClick = async () => {
//     if (!user) {
//       return;
//     }

//     const response = await fetch('http://localhost:4000/api/workouts/' + bdetail._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     });
//     const json = await response.json();
//     if (response.ok) {
//       dispatch({ type: 'DELETE_WORKOUT', payload: json });
//       await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been rejected.`);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!user) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/${bdetail._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify(updatedDetails)
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//         setOpen(false);
//         await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been updated.`);
//       } else {
//         console.error('Failed to update:', json.error);
//       }
//     } catch (error) {
//       console.error('Error updating workout:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedDetails({ ...updatedDetails, [name]: value });
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//       <Typography variant="h6" component="h4" gutterBottom>
//         {bdetail.name}
//       </Typography>
//       <Box>
//         <Typography variant="body1">
//           <strong>AGE:</strong> {bdetail.age}
//         </Typography>
//         <Typography variant="body1">
//           <strong>EMAIL:</strong> {bdetail.email}
//         </Typography>
//         <Typography variant="body1">
//           <strong>PHONE:</strong> {bdetail.phone}
//         </Typography>
//         <Typography variant="body1">
//           <strong>BLOOD TYPE:</strong> {bdetail.bloodType}
//         </Typography>
//         <Typography variant="body1">
//           <strong>ROLE:</strong> {bdetail.role}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {formatDistanceToNow(new Date(bdetail.createdAt), { addSuffix: true })}
//         </Typography>
//       </Box>
//       <Box sx={{ mt: 2 }}>
//         {!bdetail.isApproved && (
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ mb: 1 }}
//             onClick={handleClickApprove}
//           >
//             APPROVE
//           </Button>
//         )}
//         <Button
//           variant="contained"
//           color="error"
//           onClick={handleClick}
//         >
//           REJECT
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 1 }}
//           onClick={() => setOpen(true)}
//         >
//           UPDATE
//         </Button>
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Update Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             name="name"
//             label="Name"
//             type="text"
//             fullWidth
//             value={updatedDetails.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="age"
//             label="Age"
//             type="number"
//             fullWidth
//             value={updatedDetails.age}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="email"
//             label="Email"
//             type="email"
//             fullWidth
//             value={updatedDetails.email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="phone"
//             label="Phone"
//             type="text"
//             fullWidth
//             value={updatedDetails.phone}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="bloodType"
//             label="Blood Type"
//             type="text"
//             fullWidth
//             value={updatedDetails.bloodType}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="role"
//             label="Role"
//             type="text"
//             fullWidth
//             value={updatedDetails.role}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// }

// export default AdminBbDetails;


