
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('dealerships', function (table) {
      table.increments('id').primary()
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
      table.string('make').notNullable()
      table.string('city').notNullable()
      table.string('province').notNullable()
      table.string('postal_code').notNullable()
      table.string('street').notNullable()
    })
  }
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('dealerships')
  }
  
  /*
  - id: primary key
  - created_at: timestamp
  - updated_at: timestamp
  - make: string
  - city: string
  - province: string
  - postal_code: string
  - street: string
  */