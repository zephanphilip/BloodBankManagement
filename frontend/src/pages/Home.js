import React, { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import Notification from '../components/Notification';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
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

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false); // State to handle visibility

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

    const fetchNotifications = async () => {
      const response = await fetch('http://localhost:4000/api/user/notifications', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setNotifications(json);
      }
    };

    if (user) {
      fetchWorkouts();
      fetchNotifications();
    }
  }, [dispatch, user]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Toggle the visibility
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4 }}>
          <Button variant="contained" color="primary" onClick={toggleNotifications}>
            Notifications ({notifications.length})
          </Button>
          {showNotifications && notifications.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Paper elevation={3} sx={{ p: 2 }}>
                {notifications.map((notification, index) => (
                  <Notification key={index} notification={notification} />
                ))}
              </Paper>
            </Box>
          )}
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              APPROVED BLOOD DONOR DETAILS
            </Typography>
            <Box>
              {workouts && workouts.map((bdetail) => (
                bdetail.isApproved && <WorkoutDetails key={bdetail._id} bdetail={bdetail} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkoutForm />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;



// import React, { useState, useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';
// import Notification from '../components/Notification';
// import { Button } from '@mui/material'

// function Home() {
//     const { workouts, dispatch } = useWorkoutsContext();
//     const { user } = useAuthContext();
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false); // State to handle visibility

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             const response = await fetch('http://localhost:4000/api/workouts', {
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             });
//             const json = await response.json();

//             if (response.ok) {
//                 dispatch({ type: 'SET_WORKOUTS', payload: json });
//             }
//         };

//         const fetchNotifications = async () => {
//             const response = await fetch('http://localhost:4000/api/user/notifications', {
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             });
//             const json = await response.json();

//             if (response.ok) {
//                 setNotifications(json);
//             }
//         };

//         if (user) {
//             fetchWorkouts();
//             fetchNotifications();
//         }
//     }, [dispatch, user]);

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications); // Toggle the visibility
//     };

//     return (
//       <div>
//       <Button onClick={toggleNotifications} >
//                 Notifications ({notifications.length})
//             </Button>
//         <div className='home'>
            
//             {showNotifications && notifications.length > 0 && (
//                 <div className="notifications">
//                     {notifications.map((notification, index) => (
//                         <Notification key={index} notification={notification} />
//                     ))}
//                 </div>
//             )}
//             <div className="workouts">
//                 {workouts && workouts.map((bdetail) => (
//                     bdetail.isApproved && <WorkoutDetails key={bdetail._id} bdetail={bdetail} />
//                 ))}
//             </div>
//             <WorkoutForm />
//         </div>
//         </div>
//     );
// }

// export default Home;


// import React, { useState } from 'react';
// import {  useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';
// import Notification from '../components/Notification';


// function Home() {

//     const{workouts, dispatch} = useWorkoutsContext();
//     const{user} = useAuthContext();
//     const [notifications, setNotifications] = useState([]);
    
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
//                 const fetchNotifications = async () => {
//                   const response = await fetch('http://localhost:4000/api/user/notifications', {
//                       headers: {
//                           'Authorization': `Bearer ${user.token}`
//                       }
//                   });
//                   const json = await response.json();
      
//                   if (response.ok) {
//                       setNotifications(json);
//                   }
//               };
//                 if(user){
//                   fetchWorkouts();
//                   fetchNotifications();
//                 }
                
//         },[dispatch,user])


//   return (
//     <div className='home'>
//       {notifications.length > 0 && (
//       <div className="notifications">
//                 {notifications.map((notification, index) => (
//                     <Notification key={index} notification={notification} />
//                 ))}
//             </div>
//             )}
//       <div className="workouts">
//         {
//             workouts && workouts.map((bdetail)=>(
//                 bdetail.isApproved &&<WorkoutDetails key={workouts._id} bdetail={bdetail}/>
                
//             ))
//         }
//       </div>
//       <WorkoutForm/>
//     </div>
//   )
// }

// export default Home
