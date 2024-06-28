const express = require('express');
const db = require('../conn/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = (req, res) => {
    const { email, password } = req.body;
    try {
        db.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                throw res.status(500).send('Internal Server Error');
                
            }

            console.log(results);
    
            if (results.length === 0) {
                return res.status(401).json({message: 'Invalid username or password'});
                
            }
    
            const user = results[0];
            console.log(user, "checking");
    
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({message: 'Invalid username or password'});
                    
                }
                
                console.log(result);
                // Passwords match, create a JWT token
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({message: "Login Successfully",token: token, status: "success", data: user});
    
                // Attach the token to the response header or payload
               
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if the user with the given email already exists
        const existingUser = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
                if (error) {
                    console.error('Error querying database:', error);
                    reject('Internal Server Error');
                    return;
                }

                resolve(results);
            });
        });

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'user already exists' });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = { email: email, password: hashPassword, name: name, role: role };

        const insertResult = await new Promise((resolve, reject) => {
            db.query('INSERT INTO users SET ?', newUser, (error, result) => {
                if (error) {
                    console.error('Error creating user:', error);
                    reject('Internal Server Error');
                    return;
                }

                resolve(result);
            });
        });

        // After successfully signing up, create a JWT token
        const token = jwt.sign({ id: insertResult.insertId }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({ message: 'success', token, data: insertResult });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {signin, signup}