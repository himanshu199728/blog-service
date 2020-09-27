const express = require('express');
const dotenv = require('dotenv')
const app = express();
// Initalise env variable with suitable value for local
if (process.env.APP_ENV == 'local')
    dotenv.config();

//Signup
app.post('/signup', () => true);
// Login API
app.post('/login', () => true);
// Logout API
app.post('/logout', () => true);
// Content save API
app.post('/content', () => true);
// Content update API
app.put('/content/:id', () => true);
// Content save like API
app.put('/content/:id/like', () => true);
// Content save dislike API
app.put('/content/:id/dislike', () => true);
// Content save like API
app.delete('/content/:id', () => true);


if (process.env.APP_ENV === 'local') {
    const PORT = process.env.PORT || 3600;
    app.listen(PORT, () => {
        console.log(`Service is running at ${PORT} ...`);
    });
}