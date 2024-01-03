/**
 * GET /
 * Homepage
 */

const e = require("connect-flash");



exports.index = async(req, res) => {
  res.render('index');
}

exports.home = async(req, res) => {
  res.render('home');
}

exports.graphs = async(req, res) => {
  res.render('graphs');
}

exports.aqi = async(req, res) => {
  res.render('aqi');
}

exports.map = async(req, res) => {
  res.render('map');
}

exports.rank = async(req, res) => {
  res.render('rank');
}



exports.signin = async(req, res) => {
  userType = ["Ministry", "EPA", "PurpleAir"]
  let cities = ["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi", "Mymensingh", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
  res.render('signin', {cities, userType});

}



