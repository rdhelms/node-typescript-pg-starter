//tslint:disable no-console
import { app } from '../app';
import { Socket, Server } from 'net';
import { sequelize } from '../sequelize/db';
import debug from 'debug';

const testDebug = debug('test');

let server: Server;
const sockets: Socket[] = [];

const port = process.env.PORT || 3000;
server = app.listen(port, async () => {
    console.log('Test server started');
    // Need to make sure tests don't run until db is finished sync-ing
    await sequelize.authenticate();
    await sequelize.sync({
        force: true
    });
    run();
});

server.once('connection', (socket) => {
    testDebug(`socket ${sockets.length} connected`);
    sockets.push(socket);
    socket.once('close', () => {
        testDebug(`socket ${sockets.indexOf(socket)} closed`);
        sockets.splice(sockets.indexOf(socket), 1);
    });
});

beforeEach(async function() {
    const result = await Promise.all(Object.values(sequelize.models).map((model) => {
        return model.destroy({
            truncate: true
        });
    }));
    return result;
});

after(function() {
    server.close((e: Error) => {
        if (e) {
            console.log(`Test Server Error:\n`, JSON.stringify(e, null, 4));
        } else {
            process.exit();
            console.log('Test server was closed');
        }
    });
    // Just in case there are still any remaining open test sockets, destroy them
    setTimeout(() => {
        sockets.forEach((socket) => {
            testDebug(`destroying socket ${sockets.indexOf(socket)}`);
            socket.destroy();
        });
    }, 5000);
});