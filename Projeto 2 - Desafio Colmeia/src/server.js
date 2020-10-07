const app = require('./app')

const PORT = 4000;

app.listen(process.env.PORT || PORT || 4000, function() {
    console.log("Server is running on Port: " + PORT);
})
