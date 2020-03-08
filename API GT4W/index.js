const restify = require('restify');
const errs = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*']
  });

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gt4w'
    }
});
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Cors ▄▄▄▄▄▄▄▄▄▄▄▄▄▄
server.pre(cors.preflight)
server.use(cors.actual)
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(83, function () {
    console.log(`${server.name} listening at ${server.url}`);
});

server.get('/pessoa/getAll', (req, res, next) => {
    knex('pessoa')
        .select('*')
        .then((dados) => {
            res.send(dados);
        }, next);
});

server.post('/pessoa/create', (req, res, next) => {
    console.log(req.body);
    knex('pessoa')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

server.get('/pessoa/show/:id', (req, res, next) => {
    const { id } = req.params;
    knex('rest')
        .where('id', id)
        .first()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('Nada foi encontrado'));
            res.send(dados);
        }, next);
});