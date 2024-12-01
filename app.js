const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Trang chính: Hiển thị danh sách nhân viên
app.get('/', (req, res) => {
    db.all('SELECT * FROM employees', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.render('index', { employees: rows });
        }
    });
});

// Trang thêm nhân viên
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, dob, position } = req.body;
    db.run('INSERT INTO employees (name, dob, position) VALUES (?, ?, ?)', [name, dob, position], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.redirect('/');
        }
    });
});

// Xóa nhân viên
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM employees WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.redirect('/');
        }
    });
});

// Tìm kiếm nhân viên
app.get('/search', (req, res) => {
    res.render('search', { employees: null });
});

app.post('/search', (req, res) => {
    const query = req.body.query;
    db.all('SELECT * FROM employees WHERE name LIKE ?', [`%${query}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.render('search', { employees: rows });
        }
    });
});

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
