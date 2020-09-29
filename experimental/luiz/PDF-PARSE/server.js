const jsonServer = require('json-server');

const server = jsonServer.create();

const router = jsonServer.router('./db/professores.json')
const middlewares = jsonServer.defaults()

const port = 8080;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
    console.log(`Server is running in ${port}`);
})