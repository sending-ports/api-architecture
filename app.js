import express       from 'express';
import bodyParser    from 'body-parser';

import morgan        from 'morgan';
import mongoose      from 'mongoose';
import jwt           from 'jsonwebtoken';

import config        from './config/config';
import routers       from './app/routers/routers';
import systemRouters from './app/controllers/system';

const PORT        = process.env.PORT || 3000;
const app         = express ();

const conn = mongoose.connect(config.database, { server: { poolSize: 5 }})
    .connection.once('open', () => console.log('mongo connected with success !!!'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', systemRouters.getInfo);
app.use('/api', routers);

app.set('secret', config.secret);

app.listen(PORT, () => console.log(`magic happens at http://localhost:${PORT} !!!`));
