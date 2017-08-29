
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

app.listen(8080, () => {
    console.log('Zoom zoom')
})

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// apply the routes to our application
app.use(router)

// route middleware that will happen on every request
router.use((req, res, next) => {
    // log each request to the console
    console.log(req.method, req.url)
    // continue doing what we were doing and go to the route
    next()
})

// require and configure knex first
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'postgassignment',
        charset: 'utf8'
    }
})

// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex)

const Dealership = bookshelf.Model.extend({
    tableName: 'dealerships', // what you named your table as
    cars: function () {
        return this.hasMany(Car)
    }
})

const Car = bookshelf.Model.extend({
    tableName: 'cars', // what you named your table as
    dealership: function () {
        return this.belongsTo(Dealership)
    }
})



// ASSIGNMENT ANSWERS START HERE

router.all('/', (req, res, next) => {
    res.format({
        text: () => { res.send('Zoom zoom') },
        html: () => { res.send('<strong>Zoom zoom!</strong>') },
        json: () => { res.send({ message: 'Zoom zoom' }) }
    })
    next()
})

// CARS ENDPOINTS

router.route('/cars')
    .get((req, res, next) => {
        let key = req.query
        Car.where(key).fetchAll().then(results => {
            if (results.length === 0) {
                return Car.fetchAll().then(cars => {
                    res.send(cars.models.map(cars => cars.attributes))
                })
                // return res.format({
                //     text: () => { res.send('Your search returned nothing') },
                //     html: () => { res.send('<strong>Your search returned nothing!</strong>') },
                //     json: () => { res.send({ message: 'Your search returned nothing!' }) }
                // })
            } else {
                return res.send(results.models.map(results => results.attributes))
            }
            next()
        }).catch(err => {
            return res.send(`The following error has occured => ${err}`)
            // res.send(err)
        })
    })
    .post((req, res, next) => {
        let newCar = new Car({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            dealership_id: req.body.dealership_id
        })

        newCar.save().then(car => {
            res.send(car)
            console.log('Car added')
            next()
        }).catch(err => {
            res.send(`The following error has occured => ${err}`)
        })
    })

router.route('/cars/:id')
    .get((req, res, next) => {
        let key = req.query.includeDealership
        // console.log(key)
        Car.where({ id: req.params.id }).fetch({ withRelated: 'dealership' }).then(results => {
            if (results === null) {
                return res.send('OOPS! No car found')
            } else if (key === 'true' || key === 'yes') {
                return res.send(results)
            } else {
                return res.send(results.attributes)
            }
            next()
        }).catch(err => {
            res.send(`The following error has occured => ${err}`)
            // console.log(err)
        })
    })
    .put((req, res, next) => {
        Car.where({ id: req.params.id }).fetch().then(results => {
            if (results === null) {
                return res.send('OOPS!')
            } else {
                let attributesToUpdate = {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    dealership_id: req.body.dealership_id
                }

                new Car({ id: req.params.id }).save(attributesToUpdate, { patch: true }).then(cars => {
                    res.send(cars.attributes)
                    next()
                }).catch(err => {
                    res.send(`The following error has occured => ${err}`)
                    // console.log(err)
                })
            }
        })
    })
    .delete((req, res) => {
        Car.where({ id: req.params.id }).fetch().then(results => {
            if (results === null) {
                return res.send('OOPS! No car to delete bud!')
            } else {
                new Car({ id: req.params.id }).destroy().then(car => {
                    res.send(car)
                    console.log("CAR GONE!")
                    next()
                }).catch(err => {
                    res.send(`The following error has occured => ${err}`)
                    // console.log(err)
                })
            }
        })
    })




// app.get('/cars/:id', (req, res) => {
//     Car.where({ id: req.params.id }).fetch().then(results => {
//         if (results === null) {
//             res.send('OOPS!')
//         } else {
//             res.send(results.attributes)
//         }
//     }).catch(err => {
//         res.send(err)
//     })
// })


// app.post('/cars', (req, res) => {
//     let newCar = new Car({
//         make: req.body.make,
//         model: req.body.model,
//         year: req.body.year,
//         dealership_id: req.body.dealership_id
//     })

//     newCar.save().then(car => {
//         res.send(car)
//     }).catch(err => {
//         res.send(err)
//     })
// })

// app.put('/cars/:id', (req, res) => {
//     Car.where({ id: req.params.id }).fetch().then(results => {
//         if (results === null) {
//             res.send('OOPS!')
//         } else {
//             let attributesToUpdate = {
//                 make: req.body.make,
//                 model: req.body.model,
//                 year: req.body.year,
//                 dealership_id: req.body.dealership_id
//             }

//             new Car({ id: req.params.id }).save(attributesToUpdate, { patch: true }).then(cars => {
//                 res.send(cars.attributes)
//             }).catch(err => {
//                 res.send(err)
//             })
//         }
//     })
// })

// app.delete('/cars/:id', (req, res) => {
//     Car.where({ id: req.params.id }).fetch().then(results => {
//         if (results === null) {
//             res.send('OOPS! No car to delete bud!')
//         } else {
//             new Car({ id: req.params.id }).destroy().then(car => {
//                 res.send(car)
//                 console.log("CAR GONE!")
//             })
//         }
//     })
// })



//DEALERSHIPS ENDPOINTS
app.get('/dealerships', (req, res) => {
    Dealership.fetchAll().then(dealerships => {
        res.send(dealerships.models.map(dealerships => dealerships.attributes))
    }).catch(err => {
        res.send(err)
    })
})

app.get('/dealerships/:id', (req, res) => {
    Dealership.where({ id: req.params.id }).fetch().then(results => {
        if (results === null) {
            res.send('OOPS! Not a dealership!')
        } else {
            res.send(results.attributes)
        }
    }).catch(err => {
        res.send(err)
    })
})

app.post('/dealerships', (req, res) => {
    let newDealership = new Dealership({
        make: req.body.make,
        city: req.body.city,
        province: req.body.province,
        postal_code: req.body.postal_code,
        street: req.body.street
    })

    newDealership.save().then(dealership => {
        res.send(dealership)
    }).catch(err => {
        res.send(err)
    })
})

app.put('/dealerships/:id', (req, res) => {
    Dealership.where({ id: req.params.id }).fetch().then(results => {
        if (results === null) {
            res.send("OOPS! Not a dealership!")
        } else {
            let attributesToUpdate = {
                make: req.body.make,
                city: req.body.city,
                province: req.body.province,
                postal_code: req.body.postal_code,
                street: req.body.street
            }

            new Dealership({ id: req.params.id }).save(attributesToUpdate, { patch: true }).then(dealerships => {
                res.send(dealerships.attributes)
            }).catch(err => {
                res.send(err)
            })
        }
    })
})

app.delete('/dealerships/:id', (req, res) => {
    Dealership.where({ id: req.params.id }).fetch().then(results => {
        if (results === null) {
            res.send("OOPS! You can't delete what isn't there!")
        } else {
            new Dealership({ id: req.params.id }).destroy().then(dealership => {
                res.send(dealership)
                console.log("DEALERSHIP GONE!")
            })
        }
    })
})

// ALL ENDPOINTS

router.all(('/cars*'), (req, res, next) => {
    res.format({
        text: () => { res.send('ERROR: Nothing Here') },
        html: () => { res.send('<strong>ERROR: Nothing Here!</strong>') },
        json: () => { res.send({ message: 'ERR: Nothing Here' }) }
    })
    // next()
})

router.all(('*'), (req, res) => {
    res.format({
        text: () => { res.send('ERROR: Nothing Here') },
        html: () => { res.send('<strong>ERROR: Nothing Here!</strong>') },
        json: () => { res.send({ message: 'ERR: Nothing Here' }) }
    })
})

/* create a new car and save it
const newCar = new Car({
    make: 'Honda',
    model: 'Civic',
    year: '1999',
    dealership_id: '0'
})

newCar.save().then(car => {
    console.log(car)
}).catch(err => {
    console.log(err)
})
*/

/* get all cars
Car.fetchAll().then(cars => {
    console.log(cars.models.map(cars => cars.attributes))
}).catch(err => {
    console.log(err)
})
*/

/* get cars with a filter (e.g., year is 2017)
Car.where({
    year: '2017'
}).fetchAll().then(cars => {
    console.log(cars.models.map(cars => cars.attributes))
}).catch(err => {
    console.log(err)
})
*/

/* get a single car with id
Car.where({id: 5}).fetch().then(results => {
    console.log(results.attributes)
}).catch(err => {
    console.log(err)
})
*/

/* update a single car with new attribute values
const attributesToUpdate = {
    make: 'Porsche',
    model: 'Caymen',
    year: '2005',
    dealership_id: '0'
}

new Car({ id: 7 }).save(attributesToUpdate, { patch: true }).then(cars => {
    console.log(cars.attributes)
}).catch(err => {
    console.log(err)
})
*/

/* get dealership of a single car
Car.where({ id: 5 }).fetch({ withRelated: 'dealership' }).then(results => {
    console.log(`${results.attributes.year} ${results.attributes.make} ${results.attributes.model}`),
    console.log(JSON.stringify(results.relations))
}).catch(err => {
    console.log(err)
})
*/

/* get all cars for a single dealership
Dealership.where({id: 3})
.fetch({withRelated: 'cars'})
.then(dealership => {
    const cars = dealership.related('cars')
    console.log(cars.models.map(cars => cars.attributes))
}).catch(err => {
    console.log(err)
})
*/


/* <--                IGNORE BELOW HERE                --> */

// ASSIGNMENT GOALS
// create a new car and save it ✓
// get all cars ✓
// get cars with a filter (e.g., year is 2017) ✓
// get a single car with id ✓
// update a single car with new attribute values ✓
// get dealership of a single car ✓
// get all cars for a single dealership ✓

// Cars
// GET: Retrieve all car objects ✓
// GET: Retrieve a single car object using id ✓
// POST: Save a single car object ✓
// PUT: Change attributes for a single car object ✓
// DELETE: Delete single car object ✓
// Dealerships ✓
// GET: Retrieve all dealership objects ✓
// GET: Retrieve a single dealership object using id ✓
// POST: Save a single dealership object ✓
// PUT: Change attributes for a single dealership object ✓
// DELETE: Delete single dealership object ✓

/* GET INFO OF CAR/DEALERSHIP BY ID

Car.where({id: 5}).fetch({withRelated: 'dealership'}).then(results => {
    console.log(results.attributes)
    console.log(JSON.stringify(results.relations))
  })

*/

/* FROM PORTAL

SAVE: CREATING NEW ROW

const newUser = new User({
    email: 'my@email.com'
})
newUser.save()
	.then(user => {
		console.log(user)
    })
    
FETCH: GETTING DATA

Simple Queries

// get multiple rows with fetchAll()

User
	.fetchAll()
	.then(users => {
		console.log(users.models.map(user => user.attributes))
	})

// get one row with fetch()

User
	.where({email: 'my@email.com'})
	.fetch()
	.then(user => {
		console.log(user.attributes))
    })
    
// or

new User({email: 'my@email.com'})
    .fetch()
    .then(user => {
        console.log(user.attributes);
    })

Queries Using Relations

// get user of certain tweet

Tweet.where({id: 2})
	.fetch({withRelated: 'user'})
	.then(tweet => {
		console.log(tweet.related('user').attributes)
	})

// get all tweets of certain user

User.where({id: 1})
	.fetch({withRelated: 'tweets'})
	.then(user => {
		const tweets = user.related('tweets')
		console.log(tweets.models.map(tweet => tweet.attributes))
	})

Updating Data

const attributesToUpdate = {
    email: 'newemail@email.com'
}
new User({id: 1})
    .save(attributesToUpdate, {patch: true})
    .then(user => {
        console.log(user.attributes)
    })

Deleting Data

new User({email: 'my@email.com'})
    .destroy()
	.then(user => {
		//user will be destroyed and should be an empty object
		console.log("user deleted.")
	})

*/