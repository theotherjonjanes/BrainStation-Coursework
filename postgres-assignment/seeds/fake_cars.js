
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { make: 'Toyota', model: 'Corolla', year: 2017, dealership_id: 1 },
        { make: 'Toyota', model: 'Corolla', year: 2006, dealership_id: 1 },
        { make: 'Toyota', model: 'Prius', year: 2013, dealership_id: 2 },
        { make: 'Mercedes', model: 'E350', year: 2014, dealership_id: 0 },
        { make: 'Volkswagon', model: 'Jetta', year: 2012, dealership_id: 3 },
        { make: 'Volkswagon', model: 'Beetle', year: 2017, dealership_id: 3 }
      ])
    })
}

/*
- id: primary key
- created_at: timestamp
- updated_at: timestamp
- make: string
- model: string
- year: integer
- dealership_id: integer
*/