//JavaScript restaurant
//use the generateMenu() function to get a menu object when you need it

// This is a test order. It should take 8 seconds and should cost $65.
// You can also test your restaurant functions with other menu items.

// WRITE YOUR CODE BELOW

let itemsToCook = []
let timeToCook = []
let costPerItem = []

// Random order generator START
const randNum = Math.floor((Math.random() * 11))

let mainAll = ['Lobster', 'STEAK', 'Turkey', 'chicken', 'Burger', 'Shawarma', 'PiZZa', 'French Toast', 'Sushi', 'Carpaccio', 'Pancakes', 'Mac N Cheese']
let sideAll = ['wild rice', 'FrIEs', 'Baked Potato', 'SaLad', 'Bacon', 'Fresh Fruit', 'Coleslaw', 'mashed potato', 'Wild Rice', 'fries', 'BAKED PoTaTo', 'saLad']
let drinkAll = ['Coffee', 'TEA', 'Beer', 'PoP', 'WINE', 'Water', 'Orange JUICE', 'Diet Coke', 'Coffee', 'TEA', 'Beer', 'PoP']
// Random order generator END

// Currently set to create a random from the choices laid out above
order((mainAll[randNum]), (sideAll[randNum]), (drinkAll[randNum]))

// Blank function for testing manual order
// order('', '', '')

// Order Function Here:

function order (main, side, drink) {
    let menu = generateMenu()
    this.main = main.toLocaleLowerCase()
    this.side = side.toLocaleLowerCase()
    this.drink = drink.toLocaleLowerCase()
    // Determine if correct number of items ordered and what was ordered
    if (arguments.length < 3) {
    console.log("I believe you forgot to order something?")
    } else if (arguments.length > 3) {
    console.log("Sorry, there's a 3 item limit per order. Can you narrow it down?")
    } else {
    for (let i = 0; i < menu.length; ++i) {
        let menuName = menu[i].name.toLocaleLowerCase()
        if ((this.main === menuName) || (this.side === menuName) || (this.drink === menuName)) {
        itemsToCook.push(menu[i])
        } 
    }
    // Determine if items ordered are on menu or not
    if (itemsToCook.length === 3) {
    cook (itemsToCook.name)
    } else {
    let itemsOrdered = Array.from(arguments)
    for (let i = 0; i <itemsToCook.length; ++i) {
        for (let j = 0; j < itemsOrdered.length; ++j) {            
            if (itemsToCook[i].name.toLocaleLowerCase() === itemsOrdered[j].toLocaleLowerCase()) {
            itemsOrdered.splice(j,1) 
            }
        }  
    }
    console.log(`Sorry, we don't serve the following items: ${itemsOrdered.join(' or ').toLocaleLowerCase()}.`)
    } // Second else
    } // First else
} // order function

// Cook Function Here:

function cook (main, side, drink) {
    // Add time to cook for each item to timeToCook array
    let itemsCooked = Array.from(arguments)
    for (let i = 0; i < itemsToCook.length; ++i) {
    timeToCook.push(itemsToCook[i].time)
    }
    // Sum timeToCook array to get total cooking time 
    let totalTimeToCook = timeToCook.reduce((a, b) => a + b)
    // Minutes feels more realistic to tell the customer but the timeout is set to seconds per instruction 
    console.log (`Your order of ${(this.main)}, ${(this.side)}, and ${(this.drink)} should be ready in about ${totalTimeToCook} minutes.`)
    setTimeout(() => {serve (itemsToCook)}, 8000)
} // cook function

// Serve Function Here:

function serve (main, side, drink)  {
    // Add price per item costPerItem array
    for (let i = 0; i < itemsToCook.length; ++i) {
    costPerItem.push(itemsToCook[i].price)
    }
    // Sum costPerItem array to get total price of order 
    let totalCostOfOrder = costPerItem.reduce((a, b) => a + b) 
    console.log (`Your order is ready. That'll be $${totalCostOfOrder} please. Cash, debit, or credit?`)
} // serve function

// function that returns a menu array, no need to modify this function
function generateMenu (){
    return [{
        name:'Steak',
        time:5,
        price:40
    },{
        name:'Burger',
        time:4,
        price:15
    },{
        name:'Shawarma',
        time:4,
        price:20
    },{
        name:'Pizza',
        time:3,
        price:10
    },{
        name:'Sushi',
        time:3,
        price:15
    },{
        name:'Lobster',
        time:5,
        price:50
    },{
        name:'Carpaccio',
        time:5,
        price:25
    },{
        name:'Chicken',
        time:4,
        price:10
    },{
        name:'Wild Rice',
        time:2,
        price:5
    },{
        name:'Fries',
        time:1,
        price:5
    },{
        name:'Baked Potato',
        time:1,
        price:5
    },{
        name:'Salad',
        time:1,
        price:5
    },{
        name:'Coffee',
        time:1,
        price:0
    },{
        name:'Tea',
        time:1,
        price:0
    },{
        name:'Pop',
        time:1,
        price:0
    },{
        name:'Beer',
        time:1,
        price:5
    },{
        name:'Wine',
        time:1,
        price:10
    }]
} // generateMenu function