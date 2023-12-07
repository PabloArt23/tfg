import { request, response } from 'express';
const nodeMailer = require('nodemailer');

const envioCorreo = (req=request, resp=response) =>{
    let body = req.body;

    const config = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        post: 587,
        auth:{
            //user: 'artesanoterapeuta@gmail.com', 
            user: 'artesanoterapeuta@gmail.com',
            //pass: 'pdzk xqbk npob wbvx'
            pass:'pdzk xqbk npob wbvx'
        }
    });

    const opciones = {
        from: 'Programacion',
        subject: body.asunto,
        to: body.email, 
        text: body.mensaje
    };

    config.sendMail(opciones, function(error: any, result: any){

        if (error) return resp.json({ok: false, msg:error});

        return resp.json({
            ok:true,
            msg:result
        });
    })
}



module.exports = {
    envioCorreo
}

