import express from 'express'
import { login, register } from '../../useCases/auth/auth.useCases.js';

const router = express.Router()


//Resgistro
router.post('/register', async(request,response,next)=>{
    try {
        const user = await register(request.body)
        response.status(200).json({
            success:true,
            message: 'Regsitro correcto',
            data: user
        })
    } catch (error) {
        next(error)
    }
})

//login

router.post('/login', async(request,response,next)=>{
    try {
        const user = await login(request.body)
        response.status(200).json({
            success:true,
            message: 'Acceso correcto',
            data: user
        })
    } catch (error) {
        next(error)
    }
})














export default router 