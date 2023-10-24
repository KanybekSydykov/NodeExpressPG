const express = require('express')
const User = require('../models/User');
const UsersHistory = require('../models/UsersHistory');

const router = express.Router();

router.post('/user-create',async(req,res)=>{
    try {
        const {firstName,lastName} = req.body;
        const newUser = await User.create({
            firstName,lastName
        })
        res.status(200).send(`User ${newUser.firstName} ${newUser.lastName} created successfully`);
    } catch (error) {
        res.status(500).send('Error creating user ' + error);
    }
})

router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });

  router.get('/users-history', async (req, res) => {
    try {

      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;

      const offset = (page - 1) * limit;
  
      const order = [['userId', 'ASC']];
  
      const userHistory = await UsersHistory.findAndCountAll({
        limit: limit,
        offset: offset,
        order: order,
      });
  
      res.status(200).json({
        data: userHistory.rows,
        totalRecords: userHistory.count,
        currentPage: page,
      });
    } catch (error) {
      res.status(500).send('Error fetching user history');
    }
  });

  router.put('/users/:userId',async (req,res)=>{
    const {firstName,lastName} = req.body;
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId)

        if(!user){
            
            return res.status(404).send('User not found')
        }

        if(firstName){
            user.firstName = firstName.trim()
        }

        if(lastName){
            user.lastName = lastName.trim()
        }
        await user.save()
        res.status(200).send(`User ${user.firstName} and ${user.lastName} updated succesfuly`)


    } catch (error) {
         res.status(500).send('Error updating user: ' + error);
    }
  })

module.exports = router;