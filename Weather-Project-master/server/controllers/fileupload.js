const express = require("express")
const path = require("path")
const csvtojson = require("csvtojson")

const project_dirname = path.parse(__dirname).dir
const db = require("./mysql")

const csv = require("csv-parser")
const fs = require("fs")

exports.csvupload = async(req, res)=>{
    console.log(req.file)
    if(req.file.fieldname === "csvfile"){ //Multer
        if(req.file.mimetype === "text/csv"){
            csvRead(req, res)
        }
        else{
            let notification = {status: true, header: "Incorrect file.", text: `Please Enter a csv file, you've entered a file with a mimetype of ${req.file.mimetype}`}
            res.render("userdashboard", {notification})
        }
    }
}


function csvRead(req, res){
    // let csvfile = req.body.csvfile
    console.log(req.file)
    let csvPath = req.file.path
    

    let actualCsvPath = project_dirname+"\\"+csvPath
    actualCsvPath = actualCsvPath.replace("\\server", "")
    console.log(actualCsvPath)
    let results = []
    console.log(req.file.originalname.replace(".csv", "_t"))

    fs.createReadStream(actualCsvPath)
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", ()=>{
        // console.log(results)
        csvtojson().fromFile(actualCsvPath).then((jsonFile)=>{

            let tbname = req.file.originalname.replace(".csv", "_t").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")
            .replace(" ", "_").replace(" ", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_")

            let msg = creatingTableQuery(jsonFile, tbname, res)
            console.log(msg)

            showTable(tbname, res)
        })

    })   
  
}



// INSERTING DATA INTO SQL
function instertingDataSQL(createTableQuery, insertIntoQuery, res){
    
    db.query(createTableQuery, (err, result)=>{
        try{
            if(err) throw err;
            console.log(result)
        }
        catch(err){
            let notification = {status: true, header: "Error Occured!", text: err}
            res.render("userdashboard", {notification})
        }        
    })
        
    for(let i = 0; i < insertIntoQuery.length; i++){
        db.query(insertIntoQuery[i], (err, result)=>{            
            try{
                if(err) throw err;
            
            }
            catch(err){
                let notification = {status: true, header: "Error Occured!", text: err}
                res.render("userdashboard", {notification}) 
            }            
        })
    }
   
}



// CREATING TABLE AND INSERTING DATA SQL QUERY LINES --- DOESN'T INSERT DATA YET***
function creatingTableQuery(arr, tbname, res){

    if(tbname === ""){
        return "Table Name is Empty"
    }
    
    let tablename = tbname
    let createTable = ""
    let varcharSize = 30
    let tableIdPK = "Table_ID_PK"
    let takeKeys = Object.keys(arr[0])     

    let insertionKeys = `${tableIdPK} BIGINT AUTO_INCREMENT, `
    let keys = ""
    let values = ""

    let insertInto = []
    let takeValues = []

    for(let i = 0; i < takeKeys.length; i++){

        takeKeys[i] = takeKeys[i].replace("Index", "index_id").replace(" ", "_").replace(" ", "_").replace("(", "").replace("(", "")
        .replace(")", "").replace(")", "").replace(".", "").replace(".", "").replace(".", "")

        console.log(takeKeys[i])
    }

    for(i = 0; i < takeKeys.length-1; i++){
        insertionKeys += `${takeKeys[i]} VARCHAR(${varcharSize}), `
    }
    insertionKeys += `${takeKeys[i]} VARCHAR(${varcharSize})`
    createTable = `CREATE TABLE ${tablename}(${insertionKeys}, CONSTRAINT ${tableIdPK}_PK PRIMARY KEY (${tableIdPK}));`
    

    for(let i=0; i < arr.length; i++){
        keys = ""
        values = ""
        
        takeValues = Object.values(arr[i])
        
        let j
        for(j = 0; j < takeKeys.length-1; j++){
            keys += `${takeKeys[j]}, `
            values += `"${takeValues[j]}", `
        }
        keys += `${takeKeys[j]}`
        values += `"${takeValues[j]}"`
        
        insertInto[i] = `INSERT INTO ${tablename}(${keys}) VALUES(${values}); ` 
 
    }

    console.log(createTable)
    for(let i = 0; i < insertInto.length; i++){
        console.log(insertInto[i])
    }
    instertingDataSQL(createTable, insertInto, res)

    return "Successfully Created SQLQuery Lines For Creating Table And Insertion"
}


function showTable(tbname, res){
    let sql = `SELECT * FROM ${tbname} LIMIT 40;`    
        db.query(sql, (err, result)=>{
            try{
                if(err) throw err;
                console.log(result)
                let uploadContent = result
                let notification = {status: true, header: "File Uploaded", text: "File has been uploaded to database."}
                res.render("userdashboard", {uploadContent, notification})
            }
            catch(err){
                let notification = {status: true, header: "Error Occured!", text: err}
                res.render("userdashboard", {notification})
            }                
        })   
    
}

