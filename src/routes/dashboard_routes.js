import express from 'express';
import { logger } from '../util/logger.js';

//hier komen mijn routes
const router = express.Router();

router.get('/hello', (req, res) => {
    logger.info('get request to /hello');
    res.send('<h1>Hello World!</h1>')
})

router.get('/', (req, res) => {
    logger.info('get request to /');
    // logger.info('Sending file: ' + filePath);  
    // res.sendFile(filePath);
    res.send('<h1>Ook hallo!</h1>')
})

export {router};