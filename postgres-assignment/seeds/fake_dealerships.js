
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('dealerships').del()
    .then(function () {
      // Inserts seed entries
      return knex('dealerships').insert([
        { make: 'Toyota', city: 'Toronto', province: 'ON', postal_code: 'M4M 2E4', street: '21 Broadview Ave' },
        { make: 'Toyota', city: 'Thornhill', province: 'ON', postal_code: 'L4J 1V8', street: '7200 Yonge St' },
        { make: 'Volkswagon', city: 'North York', province: 'ON', postal_code: 'M4A 1J6', street: '1695 Eglinton Ave E' }
      ])
    })
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