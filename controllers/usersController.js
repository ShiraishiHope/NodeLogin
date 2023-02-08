const connection = require('../src/database');
const jwt = require ('jsonwebtoken')


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

const generateJWTToken = (username) => {
    const secret = process.env.JWT_SECRET_KEY;
    const expiresIn = "1d";
    const token = jwt.sign({ username }, secret, { expiresIn });
    return token
}

const checkUser = async (userData) => {
    if (!userData.username || !userData.password) {  
    throw new Error("Missing username or password")
    }
    const checkUsername = new Promise((resolve, reject) => {
        connection.query(`SELECT username FROM users WHERE username = '${userData.username}'`, function (err, results){
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }})
        })
const checkPassword = new Promise((resolve, reject) => {
    connection.query(`SELECT password FROM users where username = '${userData.username}'`, function (err, results){
        if (err) {
            reject(err)
        } else {
            resolve(results)
        }})
    })
const comparePassword = (password1, password2) =>{
    if (password1 === password2){
        return true
    } else {
        return false
    }
}

    return async function authentification(){
        try {
            const usernameResult = await checkUsername;
            if (!usernameResult){
                throw new Error("Username not found")
            }
            const passwordResult = await checkPassword;
            if (!passwordResult){
                throw new Error("Password not found")
            }
            const isPasswordMatch = comparePassword(userData.password, passwordResult[0].password);
            if (!isPasswordMatch) {
                throw new Error("Password is incorrect")
            }  
                return generateJWTToken(userData.username);
        } catch (err) {
            console.error(err);
            throw err;
        }
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