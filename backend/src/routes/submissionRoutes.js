const express = require('express');
const { createSubmission, getSubmissions, getSubmission, deleteSubmission } = require('../controller/submissionController');
const submissionRouter = express.Router();

submissionRouter.post('/', createSubmission);
submissionRouter.get('/', getSubmissions);
submissionRouter.get('/:id', getSubmission);
submissionRouter.delete('/:id', deleteSubmission);

module.exports = submissionRouter;
