const db = require('../conn/db');

const createTest = async (req, res) => {
    const { title, teacher_id } = req.body;

    try {
        const newTest = { title, teacher_id };
        db.query('INSERT INTO tests SET ?', newTest, (error, result) => {
            if (error) {
                console.error('Error creating test:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).json({ message: 'Test created successfully', data: result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getTests = (req, res) => {
    try {
        db.query('SELECT * FROM tests', (error, results) => {
            if (error) {
                console.error('Error fetching tests:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(200).json(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getTest = (req, res) => {
    const { id } = req.params;

    try {
        db.query('SELECT * FROM tests WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Error fetching test:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(404).send('Test not found');
            }

            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteTest = (req, res) => {
    const { id } = req.params;

    try {
        db.query('DELETE FROM tests WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.error('Error deleting test:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Test not found');
            }

            res.status(200).json({ message: 'Test deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createTest, getTests, getTest, deleteTest };
