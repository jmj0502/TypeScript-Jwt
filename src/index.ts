// Importing our app.
import app from './app';

// Creating an Initializer.
function initializer() {

    // Getting our port.
    const port = app.get('port');

    // Running our server.
    app.listen(port, () => {
        console.log('App listening on port ' + port);
    });
}

// Calling our initializer.
initializer()




