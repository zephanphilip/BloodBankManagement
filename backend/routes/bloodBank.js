const express = require('express');
const { createBloodBank,getBloodBanks,deleteBloodBank,updateBloodBank, approveBloodBank } = require('../controllers/bloodBankController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

//require auth for all
router.use(requireAuth);

//get all workouts
router.get('/',getBloodBanks);


//post a workout
router.post('/',createBloodBank)

// Approve a blood bank
router.patch('/approve/:id', approveBloodBank);


//update workouts
router.patch('/:id',updateBloodBank);

//delete a workout
router.delete('/:id',deleteBloodBank);


module.exports = router