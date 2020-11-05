const app = require('./app')

require('./database')

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})