

// // nodemailer 모듈 요청
var nodemailer = require('nodemailer');

// 메일발송 객체
var mailSender = {
	// 메일발송 함수
    sendGmail : function(param){
        var transporter = nodemailer.createTransport({
            service: 'gmail'
            ,port : 587
            ,host :'smtp.gmail.com'
            ,secure : true
            ,requireTLS : true
            , auth: {
              user: 'sibtest438@gmail.com'
              ,pass: 'yyrpnauarjrgcooa'
              // yyrpnauarjrgcooa
              // rdxgunnhvojeqmms
            }
        });
        // 메일 옵션
        
        var mailOptions = {
                from: 'sibtest438@gmail.com',
                to: param.toEmail, // 수신할 이메일
                subject: param.subject, // 메일 제목
                text: param.text // 메일 내용
            };
        // 메일 발송    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        
    }
}
// 메일객체 exports
module.exports = mailSender;

// const content = {
//   // from : "sibtest438@gamil.com",
//   toEmail : "whdlsj98@naver.com",
//   subject : "개발자의 품격",
//   text : "개발자의 품격 - nodemailer 이용"
// }



// mailSender.sendGmail(content);

export default mailSender.sendGmail

