const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path')

app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    return res.render('dashboard')
})
app.get('/dashboard', (req, res) => {
    return res.render('dashboard')
})

app.get('/icons', (req, res) => {
    return res.render('icons')
})

app.get('/map', (req, res) => {
    return res.render('map')
})

app.get('/notifications', (req, res) => {
    return res.render('notifications')
})

app.get('/tables', (req, res) => {
    return res.render('tables')
})

app.get('/typography', (req, res) => {
    return res.render('typography')
})

app.get('/upgrade', (req, res) => {
    return res.render('upgrade')
})

app.get('/user', (req, res) => {
    return res.render('user')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})