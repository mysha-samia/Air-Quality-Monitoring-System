exports.admin = async(req, res) => {
    res.render('zadminLogin');
  }
  
  
  exports.adminLoginClick = async(req, res) => {
    let admin = [
      {
        name: "Admin 1",
        email: "admin@gmail.com",
        pass: "1234"
      },
      {
        name: "Admin 2",
        email: "admin@yahoo.com",
        pass: "1234"
      }
    ]
  
    let name = ""
  
    if(req.body.adminEmail === admin[0].email){
      name = admin[0].name
    }
    else if(req.body.adminEmail === admin[1].email){
      name = admin[1].name
    }
    else{
      name = "XXX"
    }
  
    if((req.body.adminEmail === admin[0].email || req.body.adminEmail === admin[1].email) && (req.body.adminPassword === admin[0].pass || req.body.adminPassword === admin[1].pass)){
      let userdetail = {status: true, usertype: "Admin", name: name, email: req.body.adminEmail}
      formUsertype = ["EPA", "PurpleAir"]
      res.render('userdashboard', {formUsertype, userdetail});
    }
    else{
      let notification = {status: true, header: "Cannot Login", text: "Email or Password might be incorrect."}
      res.render('zadminLogin', {notification});
    }
      
  }