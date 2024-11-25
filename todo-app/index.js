import express from 'express';

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
    res.render('index', { users }); 
});

app.get('/add', (req, res) => {
    res.render('adduser'); 
});

app.post('/insertuser', (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        console.log('Invalid input');
        return res.redirect('/add');
    }

    const newUser = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
    };
    users.push(newUser);
    console.log('User added successfully');
    res.redirect('/');
});

app.get('/deleteuser', (req, res) => {
    const { id } = req.query;

    if (!id) {
        console.log('Invalid ID for deletion');
        return res.redirect('/');
    }

    users = users.filter(user => user.id != id);
    console.log('User deleted successfully');
    res.redirect('/');
});

app.get('/edituser', (req, res) => {
    const { id } = req.query;

    const user = users.find(user => user.id == id);
    if (!user) {
        console.log('User not found');
        return res.redirect('/');
    }

    res.render('edituser', { user }); 
});

app.post('/updateuser', (req, res) => {
    const { id, name, phone } = req.body;

    users = users.map(user => {
        if (user.id == id) {
            return {
                ...user,
                name: name.trim(),
                phone: phone.trim(),
            };
        }
        return user;
    });

    console.log('User updated successfully');
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
