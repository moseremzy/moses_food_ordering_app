const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const fs = require("fs")
const nodemailer = require("nodemailer");



module.exports = class MIDDLEWARES {

  static async SendConfirmationMail(req, res, useremail, confirmationCode, firstname) {
    const smtpConfig = {
        host: 'kelvinspice.com.ng',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'support@kelvinspice.com.ng',
            pass: 'kelvinspice1.'
        }
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    // Point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/')
    };

    // Use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: '"Taste It" <support@kelvinspice.com.ng>', // sender address
        to: useremail,
        subject: 'Confirmation Email',
        attachments: [{
            filename: 'logo.png',
            path: './images/logo.png',
            cid: "logo"
        }],
        template: 'confirmation_mail', // the name of the template file i.e email.handlebars
        context: {
            confirmationCode: confirmationCode,
            firstname: firstname
        }
    };

    // Wrap sendMail in a Promise
    try {

        await new Promise((resolve, reject) => {
      
            transporter.sendMail(mailOptions, (err, info) => {
        
              if (err) {
        
                 reject(err);
         
                } else {
                    
                  resolve(info);
                
                }
            });
        });

        return { message: "mail sent"}; // Success
    
      } catch (err) {
    
        return { message: "could not send email"}; // Failure
    }
}




//Contact us Email
static async contact_us_email(req, res, email, firstname, lastname, phone, message) {

    const smtpConfig = {
        host: 'kelvinspice.com.ng',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'support@kelvinspice.com.ng',
            pass: 'kelvinspice1.'
        }
    };

var transporter = nodemailer.createTransport(smtpConfig);
      
      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/')
      };
      
      // use a template file with nodemailer
      transporter.use('compile', hbs(handlebarOptions));
      
      const mailOptions = {
        from: '"Taste It" <support@kelvinspice.com.ng>', // sender address
        to: "support@kelvinspice.com.ng", //Taste It email
        subject: 'User Complaint',
        attachments: [{
            filename: 'logo.png',
            path: './images/logo.png',
            cid: "logo"
        }],
        template: 'contactus_email', // the name of the template file i.e email.handlebars
        context:{
            email: email,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            message: message,
        }
      };      

     // Wrap sendMail in a Promise
     try {

        await new Promise((resolve, reject) => {
      
            transporter.sendMail(mailOptions, (err, info) => {
        
              if (err) {
        
                 reject(err);
         
                } else {
                    
                  resolve(info);
                
                }
            });
        });

        return { message: "mail sent"}; // Success
    
      } catch (err) {
    
        return { message: "could not send email"}; // Failure
    }
}




 

//Password Reset  Email
static async send_reset_pass_email(req, res, useremail, token, firstname) {

    const smtpConfig = {
        host: 'kelvinspice.com.ng',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'support@kelvinspice.com.ng',
            pass: 'kelvinspice1.'
        }
    };


var transporter = nodemailer.createTransport(smtpConfig);
      
      // point to the template folder
      const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/')
      };
      
      // use a template file with nodemailer
      transporter.use('compile', hbs(handlebarOptions));
      
      var mailOptions = {
        from: '"Taste It" <support@kelvinspice.com.ng>', // sender address
        to: useremail,
        subject: 'Reset Password',
        attachments: [{
             filename: 'logo.png',
             path: './images/logo.png',
             cid: "logo"
       }],
        template: 'password_reset_mail', // the name of the template file i.e email.handlebars
        context:{
            token: token,
            firstname: firstname
        }
      };      
        // Wrap sendMail in a Promise
     try {

        await new Promise((resolve, reject) => {
      
            transporter.sendMail(mailOptions, (err, info) => {
        
              if (err) {
        
                 reject(err);
         
                } else {
                    
                  resolve(info);
                
                }
            });
        });

        return { message: "mail sent"}; // Success
    
      } catch (err) {
    
        return { message: "error occured"}; // Failure
    }
}



//send order cancellation email to user
static async send_user_cancellation_email(req, res, useremail, firstname, order_id) {
  const smtpConfig = {
      host: 'kelvinspice.com.ng',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'support@kelvinspice.com.ng',
          pass: 'kelvinspice1.'
      }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  // Point to the template folder
  const handlebarOptions = {
      viewEngine: {
          partialsDir: path.resolve('./views/'),
          defaultLayout: false,
      },
      viewPath: path.resolve('./views/')
  };

  // Use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
      from: '"Taste It" <support@kelvinspice.com.ng>', // sender address
      to: useremail,
      subject: 'Order Cancellation',
      attachments: [{
          filename: 'logo.png',
          path: './images/logo.png',
          cid: "logo"
      }],
      template: 'user_order_cancellation_email', // the name of the template file i.e email.handlebars
      context: {
          order_id: order_id,
          firstname: firstname,
      }
  };

  // Wrap sendMail in a Promise
  try {

      await new Promise((resolve, reject) => {
    
          transporter.sendMail(mailOptions, (err, info) => {
      
            if (err) {
      
               reject(err);
       
              } else {
                  
                resolve(info);
              
              }
          });
      });

      return { message: "mail sent"}; // Success
  
    } catch (err) {
  
      return { message: "could not send email"}; // Failure
  }
}




//send order cancellation email to admin
static async send_admin_cancellation_email(req, res, reason, useremail, phone, firstname, lastname, order_id, payment_method) {
  const smtpConfig = {
      host: 'kelvinspice.com.ng',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'support@kelvinspice.com.ng',
          pass: 'kelvinspice1.'
      }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  // Point to the template folder
  const handlebarOptions = {
      viewEngine: {
          partialsDir: path.resolve('./views/'),
          defaultLayout: false,
      },
      viewPath: path.resolve('./views/')
  };

  // Use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
      from: '"Taste It" <support@kelvinspice.com.ng>', // sender address
      to: 'support@kelvinspice.com.ng', //to admin
      subject: 'Order Cancellation',
      attachments: [{
          filename: 'logo.png',
          path: './images/logo.png',
          cid: "logo"
      }],
      template: 'admin_order_cancellation_email', // the name of the template file i.e email.handlebars
      context: {
          order_id: order_id,
          firstname: firstname,
          lastname: lastname,
          email: useremail,
          phone: phone,
          cancellation_reason: reason,
          payment_method: payment_method
      }
  };

  // Wrap sendMail in a Promise
  try {

      await new Promise((resolve, reject) => {
    
          transporter.sendMail(mailOptions, (err, info) => {
      
            if (err) {
      
               reject(err);
       
              } else {
                  
                resolve(info);
              
              }
          });
      });

      return { message: "mail sent"}; // Success
  
    } catch (err) {
  
      return { message: "could not send email"}; // Failure
  }

}

// Create date and add 1 hour
static date_created() {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Add 1 hour
    return now.toISOString().slice(0, 19).replace('T', ' ');
}

}