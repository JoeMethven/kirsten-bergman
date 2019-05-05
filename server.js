import http from 'http';
import app from './app';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

console.log('app', app);

server.listen(port);
console.log(`Listening at http://localhost:${port}`)