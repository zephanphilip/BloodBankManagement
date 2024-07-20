const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>
    {
        return jwt.sign(
            {_id,},process.env.SECRET,{expiresIn: '3d'}
    )}


//login user
const loginUser = async (req, res) => {

    const {email, password}= req.body

    try{
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(err){
            res.status(500).json({error: err.message})
    }
}
//signup user
const signupUser = async (req, res) => {
    const {email, password}= req.body

    try{
        const user = await User.signup(email, password)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(err){
            res.status(500).json({error: err.message})
    }

}

// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
    const user_id = req.user._id;
    console.log(user_id);

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Sort notifications by date in descending order (latest first)
        const sortedNotifications = user.notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(sortedNotifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a notification
const addNotification = async (req, res) => {
    
    const {userId, message } = req.body;
    console.log(message, userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.notifications.push({ message, date: new Date() });
        await user.save();

        res.status(200).json({ message: 'Notification added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signupUser, loginUser, addNotification, getNotifications}