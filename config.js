import * as dotenv from 'dotenv'
dotenv.config({path: '.env'}
)

export const config = {
    port: process.env.PORT || 4000, //Intenta usar la variable de entorno PORT. Si no existe (por ejemplo, en desarrollo), usa el valor por defecto: 4000.
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/realstate', 
    jwSecret: process.env.JWT_SECRET || 'your_jwt_secret'
}