import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Paper, Typography, Box, Button } from '@mui/material';

function AdminBbDetails({ bdetail }) {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

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
        body: JSON.stringify({ isApprove: true })
      });

      const json = await response.json();

      if (response.ok) {
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

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" component="h4" gutterBottom>
        {bdetail.name}
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>AGE:</strong> {bdetail.age}
        </Typography>
        <Typography variant="body1">
          <strong>EMAIL:</strong> {bdetail.email}
        </Typography>
        <Typography variant="body1">
          <strong>PHONE:</strong> {bdetail.phone}
        </Typography>
        <Typography variant="body1">
          <strong>BLOOD TYPE:</strong> {bdetail.bloodType}
        </Typography>
        <Typography variant="body1">
          <strong>ROLE:</strong> {bdetail.role}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDistanceToNow(new Date(bdetail.createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {!bdetail.isApproved && (
          <Button
            variant="contained"
            color='success'
            sx={{ mb: 1}}
            onClick={handleClickApprove}
          >
            APPROVE
          </Button>
        )}
        <Button
          variant="contained"
          color='error'
          
          onClick={handleClick}
        >
          REJECT
        </Button>
      </Box>
    </Paper>
  );
}

export default AdminBbDetails;

// import React from 'react'
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// function AdminBbDetails({bdetail}) {
//     const {user } = useAuthContext()
//   const{dispatch}= useWorkoutsContext()


//   const sendNotification = async (userId, message) => {
//     try {
//       console.log(userId, message);
//         await fetch('http://localhost:4000/api/user/notifications', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//             },
//             body: JSON.stringify({ userId, message })
//         });
//     } catch (error) {
//         console.error('Error sending notification:', error);
//     }
//     };


//   const handleClickApprove = async () => {
//     if (!user) {
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:4000/api/workouts/approve/${bdetail._id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//             },
//             body: JSON.stringify({ isApprove: true }) // Update isApprove to true
//         });

//         const json = await response.json();

//         if (response.ok) {
//             dispatch({ type: 'UPDATE_WORKOUT', payload: json }); // Assuming your reducer handles update action
//             await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been approved.`);
            
//         } else {
//             console.error('Failed to approve:', json.error);
//         }
//     } catch (error) {
//         console.error('Error approving workout:', error);
//     }

//   }
  

//   const handleClick = async () =>{
//     if(!user){
//       return
//     }

//     const response = await fetch('http://localhost:4000/api/workouts/'+bdetail._id,{
//       method: 'DELETE',
//       headers: {
//         'Authorization':`Bearer ${user.token}`
//       }

//     })
//     const json= await response.json()
//     if(response.ok) {
//     dispatch({type: 'DELETE_WORKOUT', payload: json});
//     await sendNotification(bdetail.user_id, `Your blood donation request for ${bdetail.name} has been rejected.`);
//               }
//   }


//   return (
//     <div className='workout-details'>
//       <h4>{bdetail.name}</h4>
//       <p><strong>AGE        :</strong>{bdetail.age}</p>
//       <p><strong>EMAIL      :</strong>{bdetail.email}</p>
//       <p><strong>PHONE      :</strong>{bdetail.phone}</p>
//       <p><strong>BLOOD TYPE :</strong>{bdetail.bloodType}</p>
//       <p><strong>ROLE       :</strong>{bdetail.role}</p>
//       <p>{formatDistanceToNow(new Date (bdetail.createdAt),{addSuffix: true})}</p>
//       {!bdetail.isApproved && <button onClick={handleClickApprove}>APPROVE</button>}
//       <button onClick={handleClick}>REJECT</button>
//     </div>
//   )
// }

// export default AdminBbDetails
