const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//importamos el controller
const PaymentController = require("./controllers/PaymentController");

const PaymentService = require("./services/PaymentService"); 
//importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); 
// Permitimos que el controller pueda usar el service

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

module.exports = app;
