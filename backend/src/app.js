import express from 'express';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const app = express();

const __dirname = process.cwd();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static(__dirname + '/public'));
app.use('/api/posts', posts);
app.use(notFound);
app.use(errorHandler);

export default app;