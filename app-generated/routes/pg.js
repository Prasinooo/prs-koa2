const router = require('koa-router')()

router.prefix('/pg')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a pg response!'
})

const { Client, Pool } = require('pg');
const pool = new Pool({
    user: 'koa_admin1',
    host: 'localhost',
    database: 'koa_admin1',
    password: 'XCODER4koa1!',
    port: 5432,
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


// callback - checkout a client
pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT * FROM users', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log('row 001', res.rows[0])
    }
  })
})

pool.connect()
  .then(client => {
    return client
    .query('SELECT * FROM users')
    .then(res => {
      // client.release();
      console.log('connected 2', res);
    })
    .catch(err => {
      client.release()
      console.log(err.stack)
    })
  })
  .catch(err => {
    console.log(err.stack)
  });

  // async/await - check out a client
;(async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
    console.log('row 0', res.rows[0])
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
})().catch(err => console.log(err.stack))

module.exports = router
