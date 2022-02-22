import express from 'express';
import imageProcess from './process';

const images = express.Router();

images.use('/process', imageProcess);

export default images;
