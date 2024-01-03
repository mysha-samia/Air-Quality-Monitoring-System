const express = require("express")
const router = express()
const connection = require("./mysql")


exports.signupform = async(req, res)=>{
     
        let user = {
            userType: req.body.usertype,
            first_name: req.body.fname, 
            last_name: req.body.lname, 
            email: req.body.email, 
            contact_number: req.body.contactNo,
            date_Of_Birth: req.body.dob,
            gender: req.body.gender,
            address: req.body.address, 
            city: req.body.city,
            zip: req.body.zip,
            password: req.body.password
        }
               

        let sql = "INSERT INTO User_t SET ?"
        connection.query(sql, user, (err, result)=>{
            try{
                if(err) throw err;
                console.log(result)
                let notification = {status: true, header: "Registration Done Successfully!", 
                                    text: `Thank you! ${req.body.fname} ${req.body.lname} for registering and staying with us.`}

                res.render("signin", {notification})
            }
            catch(err){
                res.send(err)
            }
        })

   
}


exports.signinform = async(req, res)=>{

    let email = req.body.loginemail
    let password = req.body.loginpassword
    
    let sql = `SELECT email, password, userType, first_name, last_name FROM User_t WHERE email = '${email}' AND password = '${password}';`
        connection.query(sql, (err, result)=>{
            let notification = {}
            try{
                if(err) throw err;
                console.log(result)
                
                if(result.length === 0){
                    notification = {status: true, header: "Cannot Login", text: "Email or Password might be incorrect."}
                    res.render("signin", {notification})
                }
                else if(result[0].email === email && result[0].password === password){
                    let userdetail = {status: true, usertype: result[0].userType, name: result[0].first_name+" "+result[0].last_name, email: result[0].email}

                    let formUsertype = []
                    if(result[0].userType === "Ministry" || result[0].userType === "Admin"){
                        formUsertype = ["EPA", "PurpleAir"]
                    }
                    else{
                        formUsertype = [`${result[0].userType}`]
                    }

                    res.render("userdashboard", {userdetail, formUsertype})
                }
            }
            catch(err){
                notification = {status: true, header: "Connection Error!", text: err}
                res.render("signin", {notification})
            }
        })
}