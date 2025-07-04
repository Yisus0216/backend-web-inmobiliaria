import bcrypt from "../../lib/bcrypt.js";
import { generateToken } from "../../lib/jwt.js";
import { StatusHttp } from "../../lib/statusHttp.js";
import { User } from "../../models/index.js";



async function register(data){
    //Destructurando y obtenido los valores email y password
    const {email,password} = data

    const userFound = await User.findOne({email })

    //Si userfound encuentra un email 
    if (userFound){
        throw new StatusHttp(`Ya existe un usuario registrado con el email ${email}`,400)
    }

    //Validar la longitud de la contraseña 

    if(password.lenght < 8){
        throw new StatusHttp(`La contraseña debe contener al menos 8 caracteres`, 400)
    }

    // Agregar mas validaciones de email, telefono etc 

    //Encriptar la contraseña con el metodo hash que se modifico 

    const hashedPassword = await bcrypt.hash(password)

    // crear el usuario 

    const createUser = await User.create({...data,password: hashedPassword})

    return createUser
}

//Login

async function login(data){
    const {email,password} = data

    //Se agrega select porque el campo password viene oculto y asi hacemos que se incluya en la consulta
    const userFound = await User.findOne({email}).select('+password')


        // SIno existe no mandar que no existe el usuario

        if(!userFound){
            //Cuidar como se lanzan los errores 
            throw new StatusHttp(`¡Credenciales invalidas!`,500)
        }
    //verificar la contraseña

    const isPasswordValid = await bcrypt.compare(password,userFound.password)
        //negamos es decir sno es valido .
    if(!isPasswordValid){
         throw new StatusHttp(`¡Credenciales invalidas!`,500)
    }

    //Generar el token (Firma que se usara en cada peticion de los endpoint)

    const tokenPayLoad ={
        userId: userFound.id,
        role: userFound.role
    }

    const token = generateToken(tokenPayLoad)

    //retornando un objeto con la informacion de usuario y sus claves de acceso
    return{
        token,
        user: userFound
    }

}

export{
    register,
    login
}