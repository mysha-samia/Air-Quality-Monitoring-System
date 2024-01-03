const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');
const fileuploads = require('../controllers/fileupload');
const userDataEntry = require('../controllers/userDataEntry');
const adminController = require('../controllers/admin');
const searchController = require('../controllers/search');

// 
const signinjs = require('../controllers/signin')
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({exteded: false})
router.use(urlencodedParser)

const multerUpload = require("../controllers/multer")
router.use(multerUpload.single("csvfile"))

const graph = require('../models/graph');
const fileUpload = require('express-fileupload');
const { userDataEntryForm } = require('../controllers/userDataEntry');

/*
* App Routes here
*/

// GET REQUESTS
router.get('/', webController.home);
router.get('/home', webController.index);
router.get('/aqi', webController.aqi);
router.get('/graphs', webController.graphs);
router.get('/map', webController.map);
router.get('/rank', webController.rank);
router.get('/signin', webController.signin);
router.get('/admin', adminController.admin);




//POST REQUESTS
router.post("/signin", urlencodedParser, signinjs.signupform)
router.post("/userpage", urlencodedParser, signinjs.signinform)
router.post("/csvupload", fileuploads.csvupload)
router.post("/userdashboardAdmin", urlencodedParser, adminController.adminLoginClick)
router.post("/userdashboard", urlencodedParser, userDataEntry.userDataEntryForm)
router.post('/', urlencodedParser, searchController.search);


// NEWAZ GRAPHS
router.get('/bar', graph.bar);
router.get('/bar_DAY', graph.bar_day);
router.get('/bar_MONTH', graph.bar_month);
router.get('/bar_YEAR', graph.bar_year);

router.get('/line', graph.line);
router.get('/line_DAY', graph.line_DAY);
router.get('/line_MONTH', graph.line_MONTH);
router.get('/line_YEAR', graph.line_YEAR);

router.get('/division_DAY', graph.division_DAY); 

router.get('/scatter', graph.scatter);

module.exports = router;