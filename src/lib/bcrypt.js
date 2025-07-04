import bcrypt from 'bcrypt'


const saltRounds = 10  

function hash (plaintText){

    //Retorna una promesa ya que el metodo por si solo es asincrono
    return bcrypt.hash(plaintText,saltRounds)
}

// exportamos

export default{
    ...bcrypt,
    hash// sobreescribe el metodo y agrega el que definimos 
}