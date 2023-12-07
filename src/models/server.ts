import express, {Application} from 'express';
import cors from 'cors';
import routesObra from '../routes/obra' ;
import routesUser from '../routes/user';
import { Obra } from './obra';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/obras', routesObra);
        this.app.use('/api/users', routesUser);
    }

    midlewares() {
        //Parseo body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try{
            await Obra.sync()
            await User.sync();
        } catch (error) {
            console.error('Incapaz de conectar a la base de datos:', error)
        }
    }
}

export default Server;