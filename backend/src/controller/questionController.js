const db = require('../conn/db');

const createQuestion = async (req, res) => {
    const { test_id, question_type, question_text, options, answer } = req.body;

    try {
        const newQuestion = { test_id, question_type, question_text, options: JSON.stringify(options), answer };
        db.query('INSERT INTO questions SET ?', newQuestion, (error, result) => {
            if (error) {
                console.error('Error creating question:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).json({ message: 'Question created successfully', data: result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getQuestions = (req, res) => {
    try {
        db.query('SELECT * FROM questions', (error, results) => {
            if (error) {
                console.error('Error fetching questions:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(200).json(results);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const getQuestion = (req, res) => {
    const { id } = req.params;

    try {
        db.query('SELECT * FROM questions WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error('Error fetching question:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (results.length === 0) {
                return res.status(404).send('Question not found');
            }

            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteQuestion = (req, res) => {
    const { id } = req.params;

    try {
        db.query('DELETE FROM questions WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.error('Error deleting question:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Question not found');
            }

            res.status(200).json({ message: 'Question deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createQuestion, getQuestions, getQuestion, deleteQuestion };
