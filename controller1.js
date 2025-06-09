const mysql = require('mysql2')
const {config} = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {setUserToken, deleteUserToken} = require('../helper-functions/redis-helper')

// const Connection = require("mysql2/typings/mysql/lib/Connection")

exports.createUser = function (req, res) {
    const connection = mysql.createConnection(config)

    let sql = `insert into user_data(userName, userEmail, userPassword) values (? ,?, ?)`
    let sqlInsert = [req.body.name, req.body.email, req.body.password]
    connection.query(sql, sqlInsert, (err, results) => {
        if (err) res.send(err.message)

        res.json(results)
    })

    connection.end(() => {
        console.log('mysql connection closed');
    })

}

exports.loginUser = function (req, res) {
    //   this will login the user

    const connection = mysql.createConnection(config)
    let sql = 'select * from user_data where userEmail = ?'

    connection.query(sql, req.body.email, (err, results) => {
      if(err) return res.send(err.message)

      if(bcrypt.compareSync(req.body.password, results[0].userPassword)){
        const userResults = {
            email: results[0].userEmail,
            password: results[0].userPassword
        }
        const userToken = jwt.sign(userResults, process.env.ACCESS_TOKEN_KEY, {expiresIn: '24h'})

        setUserToken(req.body.email, userToken)
        res.json({
            message: 'logged in',
            accessToken: userToken
        })
      }else{
        res.json("no access")
      }
    })

    connection.end(() => {
        console.log('mysql connection closed');
    })
}

exports.getAllPerson = (req, res) => {

    const accessToken = req.body.access
    console.log(accessToken);

    const connection = mysql.createConnection(config)

    let sql = 'select * from user_data;'

    connection.query(sql, (err, results) => {
        if (err) res.json(err.message)

        
        res.json(results)

    })

    connection.end(() => {
        console.log('mysql connection closed');
    })
    // connection.destroy()

}

exports.logoutUser = (req, res) => {

    deleteUserToken(req.body.access.email)
    res.send('Token Deleted')

}

exports.redirect = (req, res) => {
    console.log('redirected to google')
    // req.redirect = "redirected to google from local 3000"
    res.redirect('https://www.google.com/')
}

const start = new Date('2025-06-01');
const end = new Date('2025-06-25');

// Calculate difference in milliseconds
const diffTime = end - start;

// Convert to days (ms → sec → min → hr → day)
const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1; // +1 for inclusive

console.log(`Total days: ${diffDays}`); // Output: 25
