const express = require('express');
const dotenv = require('dotenv');
const MongoHelper = require('./mongo-helper');

const {
    authController,
    contentController,
    defaultController,
    userController
} = require('./src/controller');
const {
    checker,
    authLimiter,
    defaultLimiter
} = require('./src/utils/middleware');

const app = express();
// Initalise env variable with suitable value for local
dotenv.config();


console.log(process.env.MONGO_URI);
MongoHelper.connect(process.env.MONGO_URI);
// Body parser
app.use(express.json());

//Signup
app.post('/signup', authLimiter, authController.signUp);
// Login API
app.post('/login', authLimiter, authController.login);
// Logout API
app.post('/logout', authLimiter, authController.logout);

// Get user
app.post('/user/:id', defaultLimiter, checker, userController.findOne);
// Update user
app.put('/user/:id', defaultLimiter, checker, userController.updateOne);
// Content save API
app.get('/content', defaultLimiter, checker, () => true);
// Content update API
app.put('/content/:id', defaultLimiter, checker, () => true);
// Content delete API
app.delete('/content/:id', defaultLimiter, checker, () => true);
// Content save like API
app.put('/content/:id/comment', defaultLimiter, checker, () => true);
// Content save upvote API
app.put('/content/:id/upvote', defaultLimiter, checker, () => true);
// Content save  API
app.delete('/content/:id', defaultLimiter, checker, () => true);
// Get all content base on value of query param key=value
app.get('/content', defaultLimiter, checker, () => true);
// Default handler
app.all('/', defaultController);

if (process.env.APP_ENV === 'local') {
    const PORT = process.env.PORT || 3600;
    app.listen(PORT, () => {
        console.log(`Service is running at ${PORT} ...`);
    });
}