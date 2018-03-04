require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const app = express();

// destructure env file
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

// Connect to Database
massive({ connectionString: CONNECTION_STRING }).then(db => {
    app.set('db', db)
    console.log('database connected')
})

// import middleware
const bodyParser=require('body-parser');

// Top level middleware
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
//// this one is for swip swap with auth 0
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            id: 16,
            role: 'teacher',
            user_name: "Testy",
            first_name: "Testy",
            last_name: "McTesterson",
            email: "Testies@gmail.com",
            img: "http://www.placekitten.com/200/250"
        }
    }
    next()
})

// Controller Imports
const test_controller = require('./controllers/test_controller')
const teacher_controller = require('./controllers/teacher_controller')

// Endpoints
//// test endpoint
app.get('/api/test', test_controller.testGet)
app.get('/api/user', (req, res, next)=>{
    console.log(req.session.user)
    res.status(200).send(req.session.user)
})

//// Auth
/// switch req.session.user <> req.user
app.get('/auth/me', (req, res) => {
    if (!req.session.user) {
        res.status(404).send({})
        // return res.redirect('http://localhost:3000/')
    } else {
        res.status(200).send(req.session.user)
    }
})

//// Teacher
app.post('/api/add/assignment', teacher_controller.addAssignment)
app.get('/api/classes/:id', teacher_controller.getClasses)
app.get('/api/class/assignments/:class_id', teacher_controller.getAssignments)
app.get('/api/class/students/:class_id', teacher_controller.getStudents)
app.get('/api/class/:class_id/student/:student_id', teacher_controller.getStudentAssignments)
app.post('/api/class/assignments/add', teacher_controller.addAssignment)
app.put('/api/class/assignments/update', teacher_controller.updateAssignment)
app.put('/api/class/student/marks/:mark_id', teacher_controller.editMark)
app.delete('/api/class/assignments/delete', teacher_controller.deleteAssignment)

// Run Server
app.listen(SERVER_PORT, ()=>(console.log(`Sailing on port: ${SERVER_PORT}`)))

// use this  to run server and not have to reload database to avoid db error
// nodemon --watch server

