const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const routes = require('./src/routes');
const { camelCaseMiddleware, errorHandler } = require('./src/middlewares');
const initDb = require('./src/database/init');

const app = express();
const PORT = 3000;

// Middleware: Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware: CORS
app.options('*', cors());

// Middleware: Custom camelCase transformer
app.use(camelCaseMiddleware);

// Middleware: Rate limiting
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    skipFailedRequests: true,
    handler: async function (req, res) {
      return res.status(429).json({
        errorCode: 'RATE_LIMIT',
        errorMessage: 'Please retry after 1 minute',
      });
    },
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/v1', routes); // Attach your routes under `/v1`

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    errorCode: 'NOT_FOUND',
    errorMessage: 'Route not found',
  });
});

// Error-handling middleware
app.use(errorHandler);


// Start server
const startServer = async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();