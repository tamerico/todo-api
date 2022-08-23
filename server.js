var um = 1;
var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3000;  // || this is the or operator 
var todos = [];
var nextTodo = 1;

var bodyparser = require ('body-parser');
var _ = require("underscore");  // aula 57 do curso na udemy


app.use( bodyparser.json());  // este eh um middleware global

// novo npm package
// npm install body-parser@1.13.3 --save
// npm i --save-dev @types/body-parser


// vartodos = [ {     id: 1,
//         description: "meet mom for lunch" + PORT,
//         completed: false
//     },
//     {
//         id: 2,
//         description: "go to market" + PORT,
//         completed: false
//     },
//     {
//         id: 3,
//         description: "drink water" + PORT,
//         completed: true
//     }
// ]

// 

app.post('/todos', function(request, response){

    var body = request.body;
    console.log(body);

    body = _.pick(body, 'description', 'completed');
    console.log(body);

    // verificar se a chave description eh fornecida e eh valida
    if (    !_.isBoolean(body.completed) ||
            !_.isString(body.description) ||
            body.description.trim().length===0){
        return response.status(400).send();
    }

    body.description =  body.description.trim();
    //var newTodo = body;  isto eh uma copia shallow e ambos os objetos sao alterados. 
    var newTodo = JSON.parse(JSON.stringify(body));  // isto eh uma copia deep. Deep clone. objetos sao independentes
    newTodo['id']=nextTodo;
    nextTodo++;
    
    console.log(body);
    console.log(newTodo);


    console.log('New description: %s  and status completed: %s', body.description, body.completed);

    todos.push(newTodo);

    response.json(body);


});



app.delete('/todos/:id', function(request, response){

    var matchedTodo = 0;
    var todoID = parseInt(request.params.id);
    console.log('detonando : %s', todoID);

    // procurar se existe
    
    console.log(todos);
    matchedTodo = _.findWhere(todos, {id: todoID}); // copia exata do conteudo a ser excluido

    //if ( typeof  matchedTodo === 'undefined'  )  pode ser assim
    if (!matchedTodo) // ou assim mais clean
    {   
        console.log("matchedTodo === undefined : %s", matchedTodo);
        //return response.status(404).send(); pode ser assim
        return response.status(404).json({"error": "id not found" });
    }
    else
        console.log("matchedTodo %s", matchedTodo);

    console.log(matchedTodo); // mostra o conteudo a ser excluido: ex: { description: 'love my 1', completed: true, id: 1 }
    todos = _.without(todos, matchedTodo); // retona lista retirando o dito cujo
    console.log(todos);
    // retirar da lista
    // return response.status(200).send(); pode ser assim
    return response.status(200).json(matchedTodo); // mostra o item excluido
    


});


app.get('/', function(rq, rs){

    rs.send('todo api');

});


app.get('/todos', function(req, response){

    response.json(todos);

});

app.get('/size', function(req, response){

    response.json(todos.length);

});


app.get('/todos/:id', function(req , response){

    var todoID = parseInt(req.params.id);
    console.log ("searching for %s ", todoID);
    var matchedTodo = 0;
    // todos.forEach ( function (todo){
    //         console.log ("evaluating " + todo);
    //         console.log ("eval id %s (%s) with search param %s (%s)", todo.id , typeof(todo.id) , todoID, typeof(todoID));
    //         if (todo.id === todoID)
    //         {
    //                 console.log ("matchedTodo "+ todoID);
    //             matchedTodo = todo;
    //         }
    //         else console.log("pulou! ");
    // })
    // o trecho acima pode ser substituido pelo metodo _where do undescore.js
     matchedTodo = _.findWhere(todos, {id: todoID});

    if (matchedTodo === 0)
        response.status(404).send() ;
    else
        response.json(matchedTodo) ;

    

});





app.listen(PORT, function(){    // outro formado usando funcao anonima
        console.log('running web at %s', PORT);

    }
    );  
