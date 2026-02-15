const app = require('./server');
const { connectDatabase } = require('./database');

app.listen(app.get('port'), () => {
    console.log(`Servidor listo en http://localhost:${app.get('port')}`);
});

connectDatabase();
