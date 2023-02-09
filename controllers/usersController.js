const connection = require('../src/database');
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')


const selectAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const selectUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE id = ${id}`, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
    
const addUser = (userData) => {
  return new Promise((resolve, reject) => {
    if (!userData.username || !userData.email || !userData.password) {
      reject(new Error("username, email and password are required"));
    }
    const allowedData = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    };
    connection.query('INSERT INTO users SET ?', allowedData, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM users WHERE id = ${id}`, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
      
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET ? WHERE id = ${id}`, userData, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const comparePassword = (password1, password2) =>{
  if (password1 === password2){
    return true
  } else {
    return false
  }
}

const generateJWTToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "1800s"})
}

const checkUser = async (userData) => {
  try {  
    if (!userData.username || !userData.password) {  
      throw new Error("Missing username or password")
    }
    const checkUsername = await new Promise((resolve, reject) => {
      connection.query(`SELECT username FROM users WHERE username = '${userData.username}' LIMIT 1`, function (err, results){
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }})
      })
    if (!checkUsername){
      throw new Error("Username not found")
    }
    const checkPassword = await new Promise((resolve, reject) => {
      connection.query(`SELECT password FROM users where username = '${userData.username}' LIMIT 1`, function (err, results){
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
    const passwordMatching = comparePassword(userData.password, checkPassword[0].password)
      if(passwordMatching == false){
        throw new Error("Password incorrect")
      }
    return generateJWTToken(userData)
  } catch (err) {
    console.error(err)
    throw error
  }
}

    module.exports = {
  selectAllUsers,
  selectUser,
  addUser,
  deleteUser,
  updateUser,
 checkUser
};