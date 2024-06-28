const db = require('../conn/db');

const createSubmission = async (req, res) => {
    const { student_id, test_id, submission, grade } = req.body;

    try {
        const newSubmission = { student_id, test_id, submission: JSON.stringify(submission), grade };
        db.query('INSERT INTO submissions SET ?', newSubmission, (error, result) => {
            if (error) {
                console.error('Error creating submission:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).json({ message: 'Submission created successfully', data: result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getSubmissions = (req, res) => {
    try {
        db.query('SELECT * FROM submissions', (error, results) => {
            if (error) {
                console.error('Error fetching submissions:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(200).json(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getSubmission = (req, res) => {
    const { id } = req.params;

    try {
        db.query('SELECT * FROM submissions WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Error fetching submission:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(404).send('Submission not found');
            }

            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteSubmission = (req, res) => {
    const { id } = req.params;

    try {
        db.query('DELETE FROM submissions WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.error('Error deleting submission:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Submission not found');
            }

            res.status(200).json({ message: 'Submission deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createSubmission, getSubmissions, getSubmission, deleteSubmission };
