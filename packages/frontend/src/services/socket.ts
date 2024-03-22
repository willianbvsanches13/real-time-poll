import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? '' : 'https://fedc-177-75-142-9.ngrok-free.app';

export const socket = io(URL);
