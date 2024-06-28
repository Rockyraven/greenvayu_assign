const express = require('express');
const { createQuestion, getQuestions, getQuestion, deleteQuestion } = require('../controller/questionController');
const questionRouter = express.Router();

questionRouter.post('/', createQuestion);
questionRouter.get('/', getQuestions);
questionRouter.get('/:id', getQuestion);
questionRouter.delete('/:id', deleteQuestion);

module.exports = questionRouter;
