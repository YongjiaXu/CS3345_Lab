require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// mysql connection
var connection = mysql.createPool({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
  database: process.env.MYSQL_DB
});

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});


// POST /reset
app.post('/reset', (req, res) => {
  connection.query('drop table if exists test_table', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table test_table");
  });
  res.status(200).send('created the table');
});

// POST /multplynumber
app.post('/multplynumber', (req, res) => {
  console.log(req.body.product);

  connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the table!`);
    }
  });
});

// GET /checkdb
app.get('/values', (req, res) => {
  connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

////////////////////////////////////////////////////////// COMMANDS (SAM) //////////////////////////////////////////////////////////////


// GET all countries
app.get('/getit/countries', (req, res) => {
  connection.query('SELECT * FROM countries', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific country
app.get('/getit/country', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT * FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific country's population
app.get('/getit/population', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT Population FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific country's case numb er
app.get('/getit/casenum', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT CaseNum FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});


// GET a specific country's death number
app.get('/getit/deathnum', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT DeathNum FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific country's death number
app.get('/getit/alertlevel', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT AlertLevel FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific country's alert description
app.get('/getit/alertdesc', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT AlertDesc FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET all ratings
app.get('/getit/ratings', (req, res) => {
  connection.query('SELECT * FROM ratings', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific rating number
app.get('/getit/rating', (req, res) => {
  var details = req.param("Rating")

  connection.query('SELECT * FROM ratings WHERE Rating = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific countries ratings
app.get('/getit/ratingscountry', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT * FROM ratings WHERE Country = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific users ratings
app.get('/getit/ratingsuser', (req, res) => {
  var details = req.param("User")

  connection.query('SELECT * FROM ratings WHERE User = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET all cities
app.get('/getit/cities', (req, res) => {

  connection.query('SELECT * FROM cities', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific city
app.get('/getit/city', (req, res) => {
  var details = req.param("City")

  connection.query('SELECT * FROM cities WHERE City = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific city
app.get('/getit/allcities', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT * FROM cities WHERE Country = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET all users
app.get('/getit/users', (req, res) => {

  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// GET a specific user
app.get('/getit/user', (req, res) => {
  var details = req.param("Username")

  connection.query('SELECT * FROM users WHERE Username = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET all users with a specifc permission level
app.get('/getit/userperms', (req, res) => {
  var details = req.param("Perms")

  connection.query('SELECT * FROM users WHERE UserPerms = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET all users from a certain country
app.get('/getit/userperms', (req, res) => {
  var details = req.param("Country")

  connection.query('SELECT * FROM users WHERE Country = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// DELETES
// /api/deleteit/rating
app.delete('/deleteit/rating', (req, res) => {
  var ID = req.param('ID');

  connection.query('DELETE FROM ratings WHERE id = ?', ID, function (err, rows, fields) {
    if (err){
      logger.error("Problem deleting from table");
    }
    else {
      res.status(200).send(`Rating deleted!`);
    }
  });
});


// PUT increment NumUp
// /api/putit/increment
app.put('/putit/incrementNumUp', (req, res) => {
  var ID = req.param('ID');

  connection.query('UPDATE ratings SET NumUp = NumUp + 1 WHERE id = ?', ID, function (err, rows, fields) {
    if (err){
      logger.error("Problem incrementing NumUp!");
    }
    else {
      res.status(200).send(`NumUp incremented!`);
    }
  });
});

// PUT decrement rating
// /api/putit/decrement
app.put('/putit/incrementNumDown', (req, res) => {
  var ID = req.param('ID');

  connection.query('UPDATE ratings SET NumDown = NumDown + 1 WHERE id = ?', ID, function (err, rows, fields) {
    if (err){
      logger.error("Problem incrementing NumDown!");
    }
    else {
      res.status(200).send(`NumDown incrementing!`);
    }
  });
});

// DELETES
// /api/deleteit/city
app.delete('/deleteit/city', (req, res) => {
  var Name = req.param('Name');

  connection.query('DELETE FROM cities WHERE City = ?', Name, function (err, rows, fields) {
    if (err){
      logger.error("Problem deleting from table");
    }
    else {
      res.status(200).send(`City deleted!`);
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

/////////////////////////////////////////////////////////////////////////////// COMMANDS (ALEX) ///////////////////////////////////////////

// POST insert new country
app.post('/postit/countries', (req, res) => {
  var country = req.param('country');
  var population = req.param('population');
  var caseNum = req.param('caseNum');
  var deathNum = req.param('deathNum');
  var alertLevel = req.param('alertLevel');
  var alertDesc = req.param('alertDesc');
  var disabledStatus = req.param('disabledStatus');
  var imageMap = req.param('imageMap');
  
  connection.query('INSERT INTO countries (Name, Population, CaseNum, DeathNum, AlertLevel, AlertDesc, disabledStatus, imageMap) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [country, population, caseNum, deathNum, alertLevel, alertDesc, disabledStatus, imageMap], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// POST insert new city
app.post('/postit/city', (req, res) => {
  var city = req.param('city');
  var country = req.param('country');
  var caseNum = req.param('caseNum');
  var deathNum = req.param('deathNum');


  connection.query('INSERT INTO cities (City, Country, CaseNum, DeathNum) VALUES (?, ?, ?, ?)', [city, country, caseNum, deathNum], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// POST insert new rating
app.post('/postit/rating', (req, res) => {
  var rating = req.param('rating');
  var comment = req.param('comment');
  var user = req.param('user');
  var numup = req.param('numup');
  var numdown = req.param('numdown');
  var country = req.param('country');
  

  connection.query('INSERT INTO ratings (Rating, Comment, User, NumUp, NumDown, Country) VALUES (?, ?, ?, ?, ?, ?)', [rating, comment, user, numup, numdown, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// POST add new user
app.post('/postit/user', (req, res) => {
  var username = req.param('username');
  var password = req.param('password');
  var homeCountry = req.param('homeCountry');
  var userPerms = req.param('userPerms');
  

  connection.query('INSERT INTO users (Username, Password, HomeCountry, UserPerms) VALUES (?, ?, ?, ?)', [username, password, homeCountry, userPerms], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a city's caseNum 
app.put('/putit/cityCaseNum', (req, res) => {
  var city = req.param('city');
  var caseNum = req.param('caseNum');
  

  connection.query('UPDATE cities SET CaseNum = ? WHERE City = ?', [caseNum, city], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a city's deathNum 
app.put('/putit/cityDeathNum', (req, res) => {
  var city = req.param('city');
  var deathNum = req.param('deathNum');
  

  connection.query('UPDATE cities SET DeathNum = ? WHERE City = ?', [deathNum, city], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a city's name 
app.put('/putit/cityName', (req, res) => {
  var oldCityName = req.param('oldCityName');
  var newCityName = req.param('newCityName');
  
  connection.query('UPDATE cities SET City = ? WHERE City = ?', [newCityName, oldCityName], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a country's population 
app.put('/putit/countryPopulation', (req, res) => {
  var country = req.param('country');
  var population = req.param('population');
  
  connection.query('UPDATE countries SET Population = ? WHERE Name = ?', [population, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a country's case number 
app.put('/putit/countryCaseNumber', (req, res) => {
  var country = req.param('country');
  var caseNum = req.param('caseNum');
  
  connection.query('UPDATE countries SET CaseNum = ? WHERE Name = ?', [caseNum, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a country's death number 
app.put('/putit/countryDeathNumber', (req, res) => {
  var country = req.param('country');
  var deathNum = req.param('deathNum');
  
  connection.query('UPDATE countries SET DeathNum = ? WHERE Name = ?', [deathNum, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a country's alert level 
app.put('/putit/countryAlertLevel', (req, res) => {
  var country = req.param('country');
  var alertLevel = req.param('alertLevel');
  
  connection.query('UPDATE countries SET AlertLevel = ? WHERE Name = ?', [alertLevel, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT change a country's alert description 
app.put('/putit/countryAlertDesc', (req, res) => {
  var country = req.param('country');
  var alertDesc = req.param('alertDesc');
  
  connection.query('UPDATE countries SET AlertDesc = ? WHERE Name = ?', [alertDesc, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT update alert description 
app.put('/putit/AlertDesc', (req, res) => {
  var oldAlertDesc = req.param('oldAlertDesc');
  var newAlertDesc = req.param('newAlertDesc');
  
  connection.query('UPDATE countries SET AlertDesc = ? WHERE AlertDesc = ?', [newAlertDesc, oldAlertDesc], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

// PUT update alert level 
app.put('/putit/AlertLevel', (req, res) => {
  var oldAlertLevel = req.param('oldAlertLevel');
  var newAlertLevel = req.param('newAlertLevel');
  
  connection.query('UPDATE countries SET AlertLevel = ? WHERE AlertLevel = ?', [newAlertLevel, oldAlertLevel], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//PUT update imageMapURL
app.put('/putit/imageMapURL', (req, res) => {
  var imageMapURL = req.param('imageMapURL');
  var country = req.param('country');
  
  connection.query('UPDATE countries SET imageMap = ? WHERE Name = ?', [imageMapURL, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//GET imageMapURL
app.get('/getit/imageMapURL', (req, res) => {
  var details = req.param("country")

  connection.query('SELECT imageMap FROM countries WHERE Name = ?', details, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT update disabledStatus
app.put('/putit/disabledStatus', (req, res) => {
  var disabledStatus = req.param('disabledStatus');
  var country = req.param('country');
  
  connection.query('UPDATE countries SET disabledStatus = ? WHERE Name = ?', [disabledStatus, country], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//GET disabledStatus
app.get('/getit/disabledStatus', (req, res) => {
  var country = req.param("country")

  connection.query('SELECT disabledStatus FROM countries WHERE Name = ?', country, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query: \n", err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

// Delete for Countries
app.delete('/deleteit/Countries', (req, res) => {
  var countryName = req.param('countryName');
  
  connection.query('delete from ratings where Country = ?; delete from cities where Country = ?; delete from countries where Name = ?;', [countryName, countryName, countryName], function (err, rows, fields) {
    if (err){
      logger.error("Problem deleting from table countries");
    }
    else {
      res.status(200).send(`deleted country from the table!`);
    }
  });
});

//////////////////////////////////////////////////////////commands (Chad)////////////////////////////////////////////////////////
// PUT change username 
app.put('/putit/username', (req, res) => {
  var usernameNew = req.param('usernameNew');
  var usernameOld = req.param('usernameOld');
  var passwordOld = req.param('passwordOld');
  var permsOld = req.param('permsOld');
  var countryOld = req.param('countryOld');
  
  connection.query('INSERT INTO users (Username, Password, HomeCountry, UserPerms) VALUES (?, ?, ?, ?); UPDATE ratings SET User = ? WHERE User = ?; DELETE FROM users WHERE Username = ?;', [usernameNew, passwordOld, countryOld, permsOld, usernameNew, usernameOld, usernameOld, usernameOld], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`updated!`);
    }
  });
});

// PUT change password
app.put('/putit/password', (req, res) => {
  var passwordNew = req.param('passwordNew');
  var usernameOld = req.param('usernameOld');
  
  connection.query('UPDATE users SET Password = ? WHERE Username = ?', [passwordNew, usernameOld], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`updated!`);
    }
  });
});

// PUT alternative change password
app.put('/putit/altpassword', (req, res) => {
  var passwordNew = req.param('passwordNew');
  var passwordOld = req.param('passwordOld');
  var usernameOld = req.param('usernameOld');
  
  connection.query('UPDATE users SET Password = ? WHERE Username = ? && Password = ?', [passwordNew, usernameOld, passwordOld], function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`updated!`);
    }
  });
});

// PUT change UserPerms
app.put('/putit/userperms', (req, res) => {
  var permsNew = req.param('permsNew');
  var username = req.param('username');
  
  connection.query('UPDATE users SET UserPerms = ? WHERE Username = ?', [permsNew, username], function (err, rows, fields) {
    if (err){
      logger.error("Problem changing user perms");
    }
    else {
      res.status(200).send(`updated!`);
    }
  });
});

// PUT change HomeCountry
app.put('/putit/homecountry', (req, res) => {
  var countryNew = req.param('countryNew');
  var username = req.param('username');
  
  connection.query('UPDATE users SET HomeCountry = ? WHERE Username = ?', [countryNew, username], function (err, rows, fields) {
    if (err){
      logger.error("Problem changing user perms");
    }
    else {
      res.status(200).send(`updated!`);
    }
  });
});

// DELETES
// /api/deleteit/user
app.delete('/deleteit/user', (req, res) => {
  var usernameOld = req.param('usernameOld');

  connection.query('DELETE FROM ratings WHERE user = ?; DELETE FROM users WHERE username = ?', [usernameOld, usernameOld], function (err, rows, fields) {
    if (err){
      logger.error("Problem deleting from tables");
    }
    else {
      res.status(200).send(`User deleted tables!`);
    }
  });
});


// DELETE
// /api/deleteit/country
app.delete('/deleteit/country', (req, res) => {
  var countryOld = req.param('countryOld')
  
  connection.query('DELETE FROM countries WHERE Name = ?', countryOld, function (err, rows, fields) {
    if (err){
      logger.error("Problem deleting from table");
    }
    else {
      res.status(200).send(`Country deleted!`);
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
