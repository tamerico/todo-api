var express = require ('express');
var app = express();
var cont = 1;
var contAbout = 1;

var PORT = process.env.PORT || 3000;  // || this is the or operator 

var middleware = require ("./middleware");





app.use(middleware.logger);

// app.get('/', function(rq, rs){

//     rs.send('teste / ok');
//     console.log('oi' + cont++);


// });



app.get('/about', middleware.requireAuthentication, function(rq, rs){

    rs.send('todo api');
    console.log('about' + contAbout++);


});

// expor um folder 
console.log(__dirname);  // verificar o diretorio que o server está rodando

// se nao existir uma metodo get para a pasta raiz (/) o express pega o arquivo index.html
app.use(express.static ( __dirname + '/public')   ); // modifica o diretorio para o express



// app.listen(3000);  // modo basico para executar o server

app.listen(PORT, function(){    // outro formado usando funcao anonima
        console.log('running web at %s', PORT);

    }
    );  