const nodemailer =require('nodemailer')

const sendMail=async(options)=>{

const transport={
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
}

const transportor=nodemailer.createTransport(transport)
const message={
    from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
}
await transportor.sendMail(message)

}


module.exports=sendMail