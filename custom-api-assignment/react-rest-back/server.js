const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


let todosArray = [{item: 'Learn Axios', done: false}]

app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ROUTES
// http://localhost:8080/endpoint1
app.get('/todo', (req,res) =>{
    res.send(todosArray);
    console.log('It worked! GET')
});
// only reachable by post request
// send back JSON instead of plain text
app.post('/todo', jsonParser, (req,res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body)
    todosArray = req.body.todos
    console.log(todosArray)
    // res.json({msg:'Post Endpoint reached'})
    console.log('It worked! POST')
})

