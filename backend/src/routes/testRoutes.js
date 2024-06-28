const express = require('express');
const { createTest, getTests, getTest, deleteTest } = require('../controller/testController');
const testRouter = express.Router();

testRouter.post('/', createTest);
testRouter.get('/', getTests);
testRouter.get('/:id', getTest);
testRouter.delete('/:id', deleteTest);

module.exports = testRouter;
