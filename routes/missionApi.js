const express = require('express');
const router = express.Router();
const {createMission,listMissions, findMission,updatedMission, 
    deletMission,affectEmployee, desaffectEmployee} = require('../controllers/mission.controller');
const passport = require('passport');


// Post Request create new mission
router.post('/createMission',passport.authenticate('bearer', { session: false }),createMission)

// Get request get all missions
router.get('/missions',passport.authenticate('bearer', { session: false }), listMissions)
 
// Get by id request get mission by Id
router.get('/missions/:id',passport.authenticate('bearer', { session: false }),findMission);

// Update Request
router.put('/missions/:id',passport.authenticate('bearer', { session: false }),updatedMission)


//push employee to team array and update mission
router.put('/missions/push/:idMission/:idEmployee',passport.authenticate('bearer', { session: false }),affectEmployee)

// pull delete employee from team array and update mission
router.put('/missions/pull/:idMission/:idEmployee',passport.authenticate('bearer', { session: false }),desaffectEmployee)

// Delete Request delete mission
router.delete('/missions/:id',passport.authenticate('bearer', { session: false }),deletMission)

module.exports = router;