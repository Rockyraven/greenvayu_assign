const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

console.log(process.env.SQL_HOST);

const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  });

  module.exports = db;
