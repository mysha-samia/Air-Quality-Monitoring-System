const express = require("express")
const router = express()
const connection = require("./mysql")


exports.userDataEntryForm = async(req, res)=>{

    let tbname = ''
    let formData = {}
    
    if(req.body.usertype === ""){
        let notification = {status: true, header: "Error!", text: "Selected Usertype on the form might have an error!"}
        res.render("userdashboard", {notification})
        return
    }
    else if(req.body.usertype === "EPA"){
        tbname = "epa_daily_t"
        formData = {
            Daily: req.body.Daily, 
            Location: req.body.Location, 
            latitude: req.body.lat, 
            longitude: req.body.lon,
            median: req.body.median,
            mean: req.body.mean,
            max: req.body.max, 
            sum: req.body.sum,
            count: req.body.count
        }    
        console.log(formData)
    }
    else if(req.body.usertype === "PurpleAir"){
        tbname = "purpleair_daily_t"
        formData = {
            Daily: req.body.Daily, 
            Location: req.body.Location, 
            lat: req.body.lat, 
            lon: req.body.lon,
            median: req.body.median,
            mean: req.body.mean,
            max: req.body.max, 
            sum: req.body.sum,
            count: req.body.count
        }
        console.log(formData)
    }


    let sql = `INSERT INTO ${tbname} SET ?`
    connection.query(sql, formData, (err, result)=>{
        try{
            if(err) throw err;
            console.log(result)
            let notification = {status: true, header: "Data Entered Successfully!", 
                                text: `Data Entered Successfully on the Database Table: ${tbname}`}

            res.render("userdashboard", {notification})
        }
        catch(err){
            console.log(err)
            let notification = {status: true, header: "Error Occured!", text: err}
            res.render("userdashboard", {notification})
        }
    })


}