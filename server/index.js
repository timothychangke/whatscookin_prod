//imports we need for the backend

//handles like request data i think
import bodyParser from 'body-parser';
//for connections
import cors from 'cors';
//creating environment variables
import dotenv from 'dotenv';
//idk just a standard import
import express from 'express';
//for security
import helmet from 'helmet';
//for connection to mongodb
import mongoose from 'mongoose';
//for file uploads
import multer from 'multer';
//for login
import morgan from 'morgan';
//for path directories
import path from 'path';
import { fileURLToPath } from 'url';

//controllers
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';

//routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

//middleware
import { verifyToken } from './middleware/auth.js';

//models
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

//this is the chaining of middleware
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
//store assets locally (have to change this if we want to deploy)
app.use('/assets', express.static(path.join(dirname, 'public/assets')));

//setting up of file storage
const storage = multer.diskStorage({
  destination: (req, file, sb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//path routes with middleware
//middleware function to upload photo
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

//other auth routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//mongoose db setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Listening to Server Port: ${PORT}...`));
    //inject sample data (dont do it multiple times)
    // User.insertMany(users)
    // Post.insertMany(posts)
  })
  .catch((error) => console.log(`${error} did not connect successfully`));
