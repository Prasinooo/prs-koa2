const router = require('koa-router')()

router.prefix('/pg')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a pg response!'
})

const { Client } = require('pg');
const client = new Client({
    user: 'koa_admin1',
    host: 'localhost',
    database: 'koa_admin1',
    password: 'XCODER4koa1!',
    port: 5432,
});

client.connect();

client.query('SELECT * FROM users', (err, res) => {
    console.log('connected', res);
    console.log(err ? err.stack : res.rows[0].name.length) // Hello World!
    client.end()
})
module.exports = router
