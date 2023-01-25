const e = require('express');
const mysql = require('mysql');
const { get } = require('../routes/user');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.findUser = (searchTerm) => {

    return new Promise((resolve, reject) => {
        // User the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', 
                        ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.createUser = (first_name, last_name, email, phone, comments ) => {

    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',
                            [first_name, last_name, email, phone, comments], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.updateUser = (first_name, last_name, email, phone, comments, id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
                        [first_name, last_name, email, phone, comments, id], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', id], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}
