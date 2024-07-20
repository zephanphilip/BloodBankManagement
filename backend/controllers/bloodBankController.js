const BloodBank = require('../models/bloodBankModel')
const mongoose = require('mongoose');

//get all workout
const getBloodBanks = async (req, res) =>{ 
    // const user_id = req.user._id
    const workouts = await BloodBank.find({ role: 'Donor' }).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//post a workout

const createBloodBank = async (req, res) =>{
const {name,age,email,phone,bloodType,role} = req.body;
let user_id = req.user._id;
const isApproved = !user_id;
// If user_id is not present, set it to admin
if (!user_id) {
    user_id = "admin";
}
console.log(name,age,email,phone,bloodType,role,isApproved,user_id);


try {
    

    const workout = await BloodBank.create({ name, age, email, phone, bloodType, role, isApproved, user_id });
 
    
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json(error)
    }
}

//update a workout
const updateBloodBank = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout= await BloodBank.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)

}



//delete a workout
const deleteBloodBank = async (req, res) =>{
const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await BloodBank.findOneAndDelete({ _id: id})

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)
}

//approve
const approveBloodBank = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const updatedBloodBank = await BloodBank.findByIdAndUpdate(
            id,
            { isApproved: true },
            { new: true }
        );

        if (!updatedBloodBank) {
            return res.status(400).json({ error: 'Not Found' });
        }

        res.status(200).json(updatedBloodBank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {createBloodBank,getBloodBanks,deleteBloodBank,updateBloodBank,approveBloodBank}