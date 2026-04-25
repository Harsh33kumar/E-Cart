const express = require('express');
const admRoutes = express.Router();

const { adminLogin } = require('../controller/admController');


admRoutes.post('/adminlogin', adminLogin);
// admRoutes.post('/logout', Logout);

module.exports = admRoutes;