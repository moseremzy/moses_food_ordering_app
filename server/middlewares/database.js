const mysql = require("mysql");
const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE


//create connection
const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  })
  
  
  //connect database
  db.connect((err) => {
    if(err) {
        throw err
    }
    console.log("connected successfully")
  })


// const createpropertiesTable = `CREATE TABLE IF NOT EXISTS properties (
//   properties_id INT AUTO_INCREMENT PRIMARY KEY, 
//   price VARCHAR(50),
//   location VARCHAR(50),
//   bedrooms VARCHAR(50),
//   bathrooms VARCHAR(50),
//   sq_ft VARCHAR(50),
//   interior JSON
//   )`;

// db.query(createpropertiesTable)


  // let order = {
  //   id: 2, 
  //   user_id: 6,
  //   order_id: "dkdeiei",
  //   date: "02/12/2024",
  //   confirmation_pin: 2456,
  //   payment_method: "on delivery",
  //   delivery_address: "hope climic street",
  //   total_order_cost: 2700,
  //   items: JSON.stringify([
  //     { name: "sardine bread", price: 1000, quantity: 2, total: 2000 },
  //     { name: "cup cake", price: 700, quantity: 1, total: 700 }
  //   ]),
  // }

  // const sql = 'INSERT INTO orders SET ?'

  //     await new Promise( (resolve, reject) => {

  //     db.query(sql, order, (err, result) => {

  //       if (err) {

  //         reject(err)
        
  //       } else {

  //         resolve()

  //       }

  //     })

  //   })



 module.exports = db
  