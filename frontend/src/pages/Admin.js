import React, { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminReqForm from '../components/AdminReqForm';
import AdminBbDetails from '../components/AdminBbDetails';
import { Container, Grid, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c', // Blood red
    },
    secondary: {
      main: '#ffffff', // White
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
});

function Admin() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
      <Typography variant="h4" component="h1" gutterBottom>
              Blood Donor Details
          </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            
            <Box>
              {workouts && workouts.map((bdetail) => (
                <AdminBbDetails key={bdetail._id} bdetail={bdetail} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <AdminReqForm />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Admin;

// import React from 'react';
// import {  useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import AdminReqForm from '../components/AdminReqForm';
// import AdminBbDetails from '../components/AdminBbDetails';


// function Admin() {
//     const{workouts, dispatch} = useWorkoutsContext();
//     const{user} = useAuthContext();
    
//     useEffect(()=>
//         {
//             const fetchWorkouts = async () =>{
//                     const response = await fetch('http://localhost:4000/api/workouts',
//                      { headers: {
//                         'Authorization':`Bearer ${user.token}`
//                       }}
//                     )
//                     const json = await response.json()

//                     if (response.ok){
//                        dispatch({type:'SET_WORKOUTS',payload:json})
//                     }
//                 }
//                 if(user){
//                   fetchWorkouts();
//                 }
                
//         },[dispatch,user])


//   return (
//     <div className='home'>
//       <div className="workouts">
//         {
//             workouts && workouts.map((bdetail)=>(
//                 <AdminBbDetails key={workouts._id} bdetail={bdetail}/>
                
//             ))
//         }
//       </div>
//       <AdminReqForm/>
//     </div>
//   )
// }

// export default Admin
