var um = 1;
var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3000;  // || this is the or operator 

var todos = [
    {
        id: 1,
        description: "meet mom for lunch",
        completed: false
    },
    {
        id: 2,
        description: "go to market",
        completed: false
    },
    {
        id: 3,
        description: "drink water",
        completed: true
    }
]



app.get('/', function(rq, rs){

    rs.send('todo api');

});


app.get('/todos', function(req, response){

    response.json(todos);

});


app.get('/todos/:id', function(req , response){

    var todoID = parseInt(req.params.id);
    console.log ("searching for %s ", todoID);
    var matchedTodo = 0;
    todos.forEach ( function (todo){
            console.log ("evaluating " + todo);
            console.log ("eval id %s (%s) with search param %s (%s)", todo.id , typeof(todo.id) , todoID, typeof(todoID));
            if (todo.id === todoID)
            {
                    console.log ("matchedTodo "+ todoID);
                matchedTodo = todo;
            }
            else console.log("pulou! ");
    })

    if (matchedTodo === 0)
        response.status(404).send() ;
    else
        response.json(matchedTodo) ;

    

});





app.listen(PORT, function(){    // outro formado usando funcao anonima
        console.log('running web at %s', PORT);

    }
    );  
