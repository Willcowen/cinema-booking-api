// Load our .env file
require('dotenv').config();

// Import express and cors
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");

// Set up express
const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan())
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));





// Tell express to use your routers here
const customerRouter = require('./routers/customer');
app.use('/customer', customerRouter);

const moviesRouter = require('./routers/movies')
app.use('/movies', moviesRouter);

const screenRouter = require('./routers/screen')
app.use('/screen', screenRouter);

const ticketRouter = require('./routers/ticket')
app.use('/ticket', ticketRouter);






// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get('*', (req, res) => {
    res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
