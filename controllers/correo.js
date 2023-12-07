"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodeMailer = require('nodemailer');
const envioCorreo = (req = express_1.request, resp = express_1.response) => {
    let body = req.body;
    const config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth: {
            //user: 'artesanoterapeuta@gmail.com', 
            user: 'artesanoterapeuta@gmail.com',
            //pass: 'pdzk xqbk npob wbvx'
            pass: 'pdzk xqbk npob wbvx'
        }
    });
    const opciones = {
        from: 'Programacion',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };
    config.sendMail(opciones, function (error, result) {
        if (error)
            return resp.json({ ok: false, msg: error });
        return resp.json({
            ok: true,
            msg: result
        });
    });
};
module.exports = {
    envioCorreo
};
