const app = require('./app.js');
const db = require('./config/database.js');

const PORT = process.env.PORT || 4000;

db.connect().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on Port ' + PORT);
    });
});