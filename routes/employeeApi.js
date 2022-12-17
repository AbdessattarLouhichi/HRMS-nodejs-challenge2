const express = require('express');
const { addEmployee,getEmployees,findEmployee,updateEmployee,deleteEmployee} = require('../controllers/employee.controller');
const router = express.Router();
const passport = require('passport');

// create new Employee
router.post('/addEmployee',passport.authenticate('bearer', { session: false }),addEmployee)

// get all employees
router.get('/employees',passport.authenticate('bearer', { session: false }),getEmployees)

// create new Employee
router.get('/emplyees/:id',passport.authenticate('bearer', { session: false }),findEmployee)

// Update EMPLOYEE
router.put('/employees/:id',passport.authenticate('bearer', { session: false }),updateEmployee)

// create new Employee
router.delete('/employees/:id',passport.authenticate('bearer', { session: false }),deleteEmployee)

module.exports = router;