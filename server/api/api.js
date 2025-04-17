const hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const fs = require("fs");
const { render } = require("express/lib/response");
const path = require("path")
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const db = require("../middlewares/database")
const MIDDLEWARES = require("../middlewares/middlewares")
const PAYSTACK_KEY = process.env.PAYSTACK_API_KEY



module.exports = class API {



//POST REQUESTS

//register users
static async register(req, res) {

    const data = req.body;

    let message;

    try {

    const user_query = `SELECT * FROM users WHERE email = ?`;

    const user = await new Promise( (resolve, reject) => {

      db.query(user_query, [data.email], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

     
   if (user.length > 0) { //if another user get this email before

       message = "email already exists";
        
    } else { //insert user for db

     data.password = await bcrypt.hash(data.password, 12); //encrypt the password

     data.confirmation_code = uuidv4() //create uniq confirmation code

     data.date_created = MIDDLEWARES.date_created() //date of account creation

     const sql = 'INSERT INTO users SET ?'

      await new Promise( (resolve, reject) => {

      db.query(sql, data, (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve()

        }

      })

    })

      //const mail_confirmation_result = await MIDDLEWARES.SendConfirmationMail(req, res, data.email, data.confirmation_code, data.firstname)

      message = "success"

    }
        
    } catch (error) { //if there was an error at any point
        
      message = "error occured"

    }

      res.json({message: message, confirmationCode: data.confirmation_code})

}




 //login users
 static async login(req, res) {
   
  const data = req.body

  let this_user = null

  let message;

  let date = new Date()

  try {

  const user_query = `SELECT * FROM users WHERE email= ?`

  const user = await new Promise( (resolve, reject) => {

    db.query(user_query, [data.email], (err, result) => {

      if (err) {

        reject(err)
      
      } else {

        resolve(result)

      }

    })

  })

  
  if (user[0]) { //if the user dey

  const isMatch = await bcrypt.compare(data.password, user[0].password); //decrypt he password, make u compare am with this one entered

  if (!isMatch) { //if password no match

    message = "Invalid email or password"
    
  } else { //if he match 

    if (user[0].account_status === "Unverified") { //if user neva verify account
      
    message = "Account Unverified"

    this_user = user[0]

    } else { //if account verified, log am in

    date.setHours(date.getHours() + 2); // session expires in 2 hours

    req.session.cookie.expires = date;
  
    req.session.user_id = user[0].user_id; //set user id for session

    req.session.isAuthenticated = true

    message = "success"

    this_user = user[0]

    }

  }
     
  } else { //if user no dey

    message = "Invalid email or password"

  }
      
  } catch (error) {
      
    message = "error occured"          

  }

   res.json({message: message, isAuthenticated: req.session.isAuthenticated, user: this_user})

}




// Resend Confirmation Email
static async ResendConfirmationMail (req, res) {

  const confirmationEmail = req.body.confirmationEmail //i dey use d email too just incase user wan verify through register or login page. since confirmation code no dey available for those pages
  
  let message;

  try {

    const user_query = `SELECT * FROM users WHERE email= ?`

    const user = await new Promise( (resolve, reject) => {

      db.query(user_query, [confirmationEmail], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

     
   if (user.length > 0) { //if the user dey
     
    const mail_confirmation_result = await MIDDLEWARES.SendConfirmationMail(req, res, user[0].email, user[0].confirmation_code, user[0].firstname)

    message = mail_confirmation_result.message === "mail sent" ? "mail sent" : "error occured";

    } else { //if e no dey

      message = "Invalid email"

    }

  } catch (err) {
    
      message = "error occured"

  } 

      res.json({message: message})

}



 //send contact us email
static async contact_us (req, res) {

  const {email, firstname, lastname, phone, message} = req.body;

  const result = await MIDDLEWARES.contact_us_email(req, res, email, firstname, lastname, phone, message)    

  res.json({message: result.message})
  
}



//send reset password email to user
static async send_reset_pass_email (req, res) {

  let data = req.body

  let message;

  try {

    const user_query = `SELECT * FROM users WHERE email= ?`

    const user = await new Promise( (resolve, reject) => {
  
      db.query(user_query, [data.email], (err, result) => {
  
        if (err) {
  
          reject(err)
        
        } else {
  
          resolve(result)
  
        }
  
      })
  
    })
  
    
  if (user[0]) { //if the user dey

   const token = uuidv4()

   const password_reset_token = `UPDATE users 
    SET password_reset_token = ? 
    WHERE email = ?`;

      await new Promise( (resolve, reject) => { //update user password token

        db.query(password_reset_token, [token, data.email], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })

  let result = await MIDDLEWARES.send_reset_pass_email(req, res, user[0].email, token, user[0].firstname)

  message = result.message
   
   } else { //if email no dey, just still tell dem say i don send am, make dem for rest

  message = "We cannot find your email"

   }

  } catch (error) {

  message = "error occured"
    
  }

  res.json({message: message})

}


//submit order
static async submit_order(req, res) {

   const data = req.body;

   let message;

   let authorization_info;

   try {

    function generateOrderId(length = 10) { //for order id

      return crypto.randomBytes(length).toString('hex').slice(0, length);
  
     }
  
    function generateConfirmationPin() {
  
      return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit PIN
  
    }

    async function keep_for_db(data) {

      const sql = 'INSERT INTO orders SET ?'

        await new Promise( (resolve, reject) => {
  
        db.query(sql, data, (err, result) => {
  
          if (err) {
  
            reject(err)
          
          } else {
  
            resolve()
  
          }
  
        })
  
      })

     message = "success"
      
    }

    data.order_id = generateOrderId(10)
   
    data.user_id = req.session.user_id

    data.confirmation_pin = generateConfirmationPin()

    data.date_created = MIDDLEWARES.date_created() //date of account creation

    const order_id_query = `SELECT * FROM orders WHERE order_id= ?`

    const order_id = await new Promise( (resolve, reject) => {
  
      db.query(order_id_query, [data.order_id], (err, result) => {
  
        if (err) {
  
          reject(err)
        
        } else {
  
          resolve(result)
  
        }
  
      })
  
    })
  
    data.confirmation_pin = order_id[0] ? generateOrderId(10) : data.confirmation_pin //if the id they, generate another

    switch (data.payment_method) {

      case 'cash on delivery':

      data.status = 'Pending'

      data.description = 'Your Order Has Been Recieved And is Awaiting Confirmation'

      await keep_for_db(data)
     
      break;

    case 'card payment':

      data.description = 'The payment has been initiated but is awaiting confirmation from the payment gateway'

      data.status = 'Payment Pending'
    
      const params = {  // Payload for Paystack
          email: data.email,
          amount: data.total_order_cost * 100,
          reference: `${data.order_id}`, // Use your order ID as the reference
          metadata: {
              name: data.customer_name,
              phone: data.phone,
              confirmation_pin: data.confirmation_pin,
          },
          callback_url: "https://kelvinspice.com.ng/account/payment-verification",
      };

      try {
        // Send POST request to Paystack
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            params,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_KEY}`, // Your Paystack secret key
                    'Content-Type': 'application/json',
                },
            }
        );

          authorization_info = response.data

          authorization_info.status == true ? await keep_for_db(data) : message = "error occured" //only keep the data if authorization url was created succcsefully

        } catch (error) {

          message  = "error occured"

        }

         message = "success"

         break;

    }
     
   } catch (error) {

    message = "error occured"
     
   }

    res.json({message: message, reference: data.order_id, confirmation_pin: data.confirmation_pin, authorization_info: authorization_info})

}



//reset password
static async reset_password (req, res) {

  const password = req.body.password

  const token = req.body.token

  let message

  try {

  const token_query = `SELECT * FROM users WHERE password_reset_token= ?`

    const user = await new Promise( (resolve, reject) => {
  
      db.query(token_query, [token], (err, result) => {
  
        if (err) {
  
          reject(err)
        
        } else {
  
          resolve(result)
  
        }
  
      })
  
    })
  
    
  if (user[0]) { //if token exist for a user

  let hashed_pass = await bcrypt.hash(password, 12); //change user password

  const password_reset_token = `UPDATE users 
      SET password_reset_token= ?,
      password= ?
      WHERE email= ?`

      await new Promise( (resolve, reject) => { //update user password token

        db.query(password_reset_token, ['', hashed_pass, user[0].email], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })


  message = "Password modified"
    
  } else { //if token no exist

  message = "Invalid token"

  }

  } catch (error) {

  message = "error occured"
    
  }

  res.json({message: message})

}




//cancel order
static async cancel_order (req, res) {
  
  let description = req.body.description

  let id = req.body.id

  let user = req.body.user

  let message;

  try {

    const order_query = `SELECT * FROM orders WHERE order_id= ?`

    const order = await new Promise( (resolve, reject) => {
  
      db.query(order_query, [id], (err, result) => {
  
        if (err) {
  
          reject(err)
        
        } else {
  
          resolve(result)
  
        }
  
      })
  
    })
  
  if (order[0]) { //if the order dey. update the order status

   const status_query = `UPDATE orders 
      SET status= ?,
      description= ?
      WHERE order_id= ?`

      await new Promise( (resolve, reject) => { //update user password token

        db.query(status_query, ['Cancelled', description, order[0].order_id], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })

  if (order[0].payment_method === "card payment") { //if na card the person use. na be say he fit don make payment already. so send am email, let am knw say if dem see he money, dem go refund am
    
    await MIDDLEWARES.send_user_cancellation_email(req, res, user.email, user.firstname, order[0].order_id)

  }

    await MIDDLEWARES.send_admin_cancellation_email(req, res, description, user.email, user.phone, user.firstname, user.lastname, order[0].order_id, order[0].payment_method) //let admin know too

    message = "success"
   
   } else { //cannot find order

    message = "error occured"

   }

  } catch (error) {

  message = "error occured"
    
  }

  res.json({message: message})

}



//GET REQUESTS

//fetch user
static async fetch_user (req, res) {

  let user_id = req.session.user_id

  let this_user = null;

  let isAuthenticated;

  let message;

  try {

    const user_query = `SELECT * FROM users WHERE user_id= ?`

    const user = await new Promise( (resolve, reject) => {

      db.query(user_query, [user_id], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

  if (user[0].length < 1 || user[0].account_status === "Unverified") { //if user nor dey or he dey but account dey unverified
    
    message = "user no exist"

    isAuthenticated = false

  } else { //if user dey

    message = "success"

    this_user = user[0]

    isAuthenticated = req.session.isAuthenticated

  }
    
  } catch (error) {

    isAuthenticated = false
    
    message = "error occured" 

  }

  res.json({message: message, user: this_user, isAuthenticated: isAuthenticated})

}



//fetch items
static async fetch_items (req, res) {

  let message;

  let all_items;

  try {

    const items_query = `SELECT * FROM items`

    all_items = await new Promise( (resolve, reject) => {

      db.query(items_query, (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

    message = "success"
    
  } catch (error) {
    
    message = "error occured" 

  }

  res.json({message: message, all_items: all_items})

}



//fetch orders
static async fetch_orders (req, res) {

  let user_id = req.session.user_id

  let message;

  let orders;

  try {

    const order_query = `SELECT * FROM orders WHERE user_id= ?`

    orders = await new Promise( (resolve, reject) => {

      db.query(order_query, [user_id], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

    message = "success"
    
  } catch (error) {
    
    message = "error occured" 

  }

  res.json({message: message, orders: orders.reverse()})

}


// verify user card payment manually
static async verify_payment (req, res) {

  const { reference } = req.params;

  let status, description;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_KEY}`,
      },
    });

    const paymentData = response.data.data;

    if (["ongoing", "pending", "processing", "queued"].includes(paymentData.status)) {

      description = 'The payment has been initiated but is awaiting confirmation from the payment gateway'

      status = 'Payment Pending'

    } else if (["abandoned"].includes(paymentData.status)) {

      description = 'The payment process was not completed. No payment attempt was recoreded'

      status = 'Payment Abandoned'

    } else if (["failed"].includes(paymentData.status)) {

      description = paymentData.gateway_response

      status = 'Payment Failed'

    } else if (["reversed"].includes(paymentData.status)) {

      description = 'The payment has been reversed'

      status = 'Payment Reversed'

    } else { //success

      description = 'Your Order Has Been Recieved And is Awaiting Confirmation'

      status = 'Pending'

    }

    const order_query = `UPDATE orders 
      SET status= ?,
      description= ?
      WHERE order_id= ?`

      await new Promise( (resolve, reject) => {

        db.query(order_query, [status, description, reference], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })
    

    if (paymentData.status === "success") { //if verification na success

      res.json({ message: "Payment successful", data: paymentData });
    
    } else { //if na anyother status including fail

      res.status(400).json({ message: "Payment verification failed", data: paymentData });

    }

  } catch (error) {

    res.status(500).send("Error verifying payment");

  }

}




//verify payment using webhook
static async paystack_webhook (req, res) {
 
    
  try {

      let order_query;
      
      // Verify the signature
      const hash = crypto.createHmac('sha512', PAYSTACK_KEY).update(JSON.stringify(req.body)).digest('hex');
      
      if (hash != req.headers["x-paystack-signature"]) {
          
        return res.status(400).send("Invalid signature");
        
      }
      
      const event = req.body;

      const { reference, gateway_response } = event.data;
      
      switch (event.event) { // Handle the event
      
      case "charge.success":
         
      order_query = `UPDATE orders 
      SET status= ?,
      description= ?
      WHERE order_id= ?`

      await new Promise( (resolve, reject) => {

        db.query(order_query, ['Pending', 'Your Order Has Been Recieved And is Awaiting Confirmation', reference], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })
         
        break;
      
      case "charge.failed":  // Handle failed payments
      
      order_query = `UPDATE orders 
      SET status= ?,
      description= ?
      WHERE order_id= ?`

      await new Promise( (resolve, reject) => {

        db.query(order_query, ['Payment Failed', gateway_response, reference], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })
       
        break;

        case "charge.reversal":  // Handle automatic reversals
      
        order_query = `UPDATE orders 
        SET status= ?,
        description= ?
        WHERE order_id= ?`
  
        await new Promise( (resolve, reject) => {
  
          db.query(order_query, ['Payment Reversed', 'Your funds has been reversed. contact customer support for more info', reference], (err, result) => {
  
            if (err) {
  
              reject(err)
            
            } else {
  
              resolve(result)
  
            }
  
          })
  
        })
         
          break;
      
      // Add more cases for other events as needed
      
      default:
      
        console.log("Unhandled event type:", event.event);
        
        break;

      }

  } catch(err) {
      
    console.log(err.message)
      
  }

  res.sendStatus(200);   // Respond to Paystack

}   



// fetch site settings
static async fetch_settings (req, res) {

  let message;

  let settings;

  try {

    const settings_query = `SELECT * FROM settings`

    settings = await new Promise( (resolve, reject) => {

      db.query(settings_query, (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

    message = "success"
    
  } catch (error) {
    
    message = "error occured" 

  }

  res.json({message: message, service_fee: settings[0].service_fee, market_status: settings[0].market_status})

}


// Verify User Email
static async emailVerification (req, res) {

  const confirmationCode = req.params.id

  let message;

  try {
    
    const user_query = `SELECT * FROM users WHERE confirmation_code= ?`

    const user = await new Promise( (resolve, reject) => {

      db.query(user_query, [confirmationCode], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })


    if (user.length > 0 && user[0].account_status === "Unverified") {

      const account_status_query = `UPDATE users 
      SET account_status= ?
      WHERE email= ?`

      await new Promise( (resolve, reject) => {

        db.query(account_status_query, ['Verified', user[0].email], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })

      message = "Email Verification Succesful";

     } else if (user.length > 0 && user[0].account_status === "Verified") {

      message = "Email is Already Verified";

     } else {

      message = "Email Verification Failed";

     }

  } catch (error) {
    
    message = "Email Verification Failed";

  }

    res.json({message: message})

}


//logout user
static async logout (req, res) {

  let message;
  
  try {

    req.session.isAuthenticated = null

    req.session.user_id = null

    message = "success"
    
  } catch (error) {

    message = "An error occcured"
    
  }

   res.json({message: message})
  
}



//PATCH REQUESTS

//update user profile
static async update_user_info (req, res) {

  let information = req.body

  let user_id = req.session.user_id

  let message

  try {

  const user_query = `UPDATE users 
  SET firstname= ?,
  lastname= ?,
  phone= ?,
  email= ?,
  delivery_address= ?
  WHERE user_id= ?`

  const user = await new Promise( (resolve, reject) => {

    db.query(user_query, [information.firstname, information.lastname, information.phone, information.email, information.delivery_address, user_id], (err, result) => {

      if (err) {

        reject(err)
      
      } else {

        resolve(result)

      }

    })

  })

  message = "success"
    
} catch (error) {

  message = "error occured"
    
}
  res.json({message: message})

}


//update user profile
static async update_password (req, res) {

  let information = req.body

  let user_id = req.session.user_id

  let message

  try {

    const user_query = `SELECT * FROM users WHERE user_id= ?` //first find the user

    const user = await new Promise( (resolve, reject) => {

      db.query(user_query, [user_id], (err, result) => {

        if (err) {

          reject(err)
        
        } else {

          resolve(result)

        }

      })

    })

    if (user.length > 0) { //if the user dey

      const isMatch = await bcrypt.compare(information.old_password, user[0].password); //compare the current pass, with the old one if he match 
      
      if (isMatch) { //if he match use am replace old one

      const hashed_pass = await bcrypt.hash(information.new_password, 12);
      
      const password_query = `UPDATE users 
      SET password= ?
      WHERE user_id= ?`

      await new Promise( (resolve, reject) => {

        db.query(password_query, [hashed_pass, user_id], (err, result) => {

          if (err) {

            reject(err)
          
          } else {

            resolve(result)

          }

        })

      })

      message = "Updated"

      } else { //if pass no match

      message = "Old password incorrect"

      }

    } else { //if user nor dey

      message = "error occured"

    }
    
} catch (error) {

  message = "error occured"
    
}

  res.json({message: message})

}



//CRON JOBS

//open market
static async open_market(req, res) {

  try {

  const settings_query = `UPDATE settings 
  SET market_status= ?
  WHERE id= ?`

  await new Promise( (resolve, reject) => {

    db.query(settings_query, ['open', 1], (err, result) => {

      if (err) {

        reject(err)
      
      } else {

        resolve(result)

      }

    })

  })
    
  } catch (error) {

    console.log(error.message)
    
  }

}


//close market
static async close_market(req, res) {

  try {

  const settings_query = `UPDATE settings 
  SET market_status= ?
  WHERE id= ?`

  await new Promise( (resolve, reject) => {

    db.query(settings_query, ['close', 1], (err, result) => {

      if (err) {

        reject(err)
      
      } else {

        resolve(result)

      }

    })

  })
    
  } catch (error) {

    console.log(error.message)
    
  }

}


}