import app from './server.js';
import open from "open";

app.listen(app.get('port'), async() => {
    console.log(`Server ok on http://localhost:${app.get('port')}`);
    await open(`http://localhost:${app.get('port')}`);
})