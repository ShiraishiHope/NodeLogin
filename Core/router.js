    const express = require ('express');
    const app = express()
    const users = require ('../controllers/usersController')
    const authentificateToken = require ('./config/auth.config.js')
    

     
app.get('/users',authentificateToken, (req,res) => {
    users.selectAllUsers()
    .then((data) => res.send(data))})

app.get('/users/:id',authentificateToken, (req, res) => {
    users.selectUser(req.params.id).then((data)=> res.send(data))})

app.post('/sign-up', (req, res) => {
    users.addUser(req.body)
        .then((data)=>res.send(data))
        .catch((err) => {
            res.status(400).send({ error: err.message });
          });})
        

app.delete("/users/:id",authentificateToken, (req,res) => {
    users.deleteUser(req.params.id)
        .then((data)=>res.send(data))
        .catch((err) => {
            res.status(400).send({ error: err.message });
          });})

app.put('/users/:id',authentificateToken, (req, res) => {
    console.log(req.params.id)
    users.updateUser(req.params.id,req.body)
                .then((data)=>res.send(data))
                .catch((err) => {
                    res.status(400).send({ error: err.message });
                  });})

app.post('/login', (req, res) => {
    users.checkUser(req.body)
        .then((accessToken)=>res.send({accessToken}))
        .catch((err) => {
        res.status(400).send({ error: "Invalid Credentials" });
});})

app.get('/test', authentificateToken, (req,res) => {
    res.send(req.user)
})

module.exports = app;