module.exports =  {

    requireAuthentication: function (req, res, next){
        console.log ('processo auth');
        next();
    },
    
    logger: function (req, res, next){
        console.log (''+ new Date().toString() + 'Request: ' + req.method +   ' '  + req.originalUrl);
        next();
    }



}


// outra forma seria definir uma variavel chamada ex middleware e fazer o exports abaixo:
// module.exports = middleware;