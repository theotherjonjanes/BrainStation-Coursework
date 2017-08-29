module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    user: 'postgres', 
    password: 'postgres',
    database: 'postgassignment'
  }
};
