import dotenv from 'dotenv';

import Server from './app/server';

dotenv.config();

const server = new Server();

server.listen();
