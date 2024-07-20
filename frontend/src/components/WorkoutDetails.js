import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Paper, Typography, Box } from '@mui/material';

function WorkoutDetails({ bdetail }) {
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
    </Paper>
  );
}

export default WorkoutDetails;

// import React from 'react'
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'


// function WorkoutDetails( {bdetail}) {

//   return (
//     <div className='workout-details'>
//       <h4>{bdetail.name}</h4>
//       <p><strong>AGE        :</strong>{bdetail.age}</p>
//       <p><strong>EMAIL      :</strong>{bdetail.email}</p>
//       <p><strong>PHONE      :</strong>{bdetail.phone}</p>
//       <p><strong>BLOOD TYPE :</strong>{bdetail.bloodType}</p>
//       <p><strong>ROLE       :</strong>{bdetail.role}</p>
//       <p>{formatDistanceToNow(new Date (bdetail.createdAt),{addSuffix: true})}</p>
//     </div>
//   )
// }

// export default WorkoutDetails
