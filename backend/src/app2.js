import 'dotenv/config';
import './clients/db';
import express from 'express';
import Boom from 'boom';
import cors from 'cors';
import limiter from './rate-limiter';
import routes from './routes';

const app = express();

// CORS configuration to allow only your frontend's origin (replace with your actual frontend URL)
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.51:3000'], // Allow both localhost and local network IP
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};


// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
  return next(Boom.notFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});
app.listen(4000, '0.0.0.0', () => {
  console.log('Server is up!');
});
