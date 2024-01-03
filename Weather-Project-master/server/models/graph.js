var connection = require('../controllers/mysql');

let tbname = 'epa_daily_t'
let arrX = [], arrY = [], arr2D = [];

// exports.bar = async(req, res) => {
  // let sql = `SELECT
  // avg(mean),
  // STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  // DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  // DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  // FROM
  //   ${tbname}
  // GROUP BY MONTH ORDER BY DAY;`;

//     connection.query(sql, function (error, results) {
//     if (error) throw error;
    

//     for (let i = 0; i < results.length; i++) {
//       arrX[i] = Object.values(results[i])[0]; 
//       arrY[i] = Object.values(results[i])[1]; 
//     }
//     arr2D = [arrY, arrX];
//     // arr = Object.values(results[0])
//     res.send(arr2D);
//   });
// }

exports.bar_day = async(req, res) => {
  let sql = `SELECT
  avg(mean) MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    ${tbname}
  GROUP BY DAY ORDER BY DAY;`;

  connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.bar_month = async(req, res) => {
  let sql = `SELECT
  avg(mean) MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    ${tbname}
  GROUP BY MONTH ORDER BY MONTH;`;

  connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.bar_year = async(req, res) => {
  let sql = `SELECT
  avg(mean) MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    ${tbname}
  GROUP BY YEAR ORDER BY YEAR;`;

  connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.bar = async(req, res) => {
  let sql = `SELECT
  avg(mean) MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    ${tbname}
  GROUP BY YEAR ORDER BY YEAR;`;

  connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.line = async(req, res) => {
  let sql = `SELECT
  avg(epa_mean) EPA_MEAN,
  avg(pa_mean) PA_MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    mean_t
  GROUP BY MONTH ORDER BY DAY;`;

    connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.line_DAY = async(req, res) => {
  let sql = `SELECT
  avg(epa_mean) EPA_MEAN,
  avg(pa_mean) PA_MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    mean_t
  GROUP BY DAY ORDER BY DAY;`;

    connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}
exports.line_YEAR = async(req, res) => {
  let sql = `SELECT
  avg(epa_mean) EPA_MEAN,
  avg(pa_mean) PA_MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    mean_t
  GROUP BY YEAR ORDER BY YEAR;`;

    connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}
exports.line_MONTH = async(req, res) => {
  let sql = `SELECT
  avg(epa_mean) EPA_MEAN,
  avg(pa_mean) PA_MEAN,
  STR_TO_DATE(Daily, '%d/%m/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(Daily, '%d/%m/%Y'), '%Y') AS YEAR
  FROM
    mean_t
  GROUP BY MONTH ORDER BY DAY;`;

    connection.query(sql, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
}

exports.division_DAY = async(req, res) => {
  let sql = `SELECT
  Division,
  PM25,
  time,
  STR_TO_DATE(time, '%m/%d/%Y') AS DAY,
  DATE_FORMAT(STR_TO_DATE(time, '%m/%d/%Y'), '%m/%Y') AS MONTH,
  DATE_FORMAT(STR_TO_DATE(time, '%m/%d/%Y'), '%Y') AS YEAR
FROM
  final_train_data_t
ORDER BY DAY`;

  let sql1 = `SELECT Division, time, PM25 
  FROM final_train_data_t
  GROUP BY Division;`;
  
    connection.query(sql, function (error, results) {
    if (error) throw error;
    // const ds = new DataFrame(results);
    res.send(results);
  });
}

exports.scatter = async(req, res) => {
  let sql = `SELECT avg(mean), Daily FROM ${tbname} WHERE Daily  like "%/2020" GROUP BY Daily ORDER BY Daily;`
  connection.query(sql, function (error, results) {
    if (error) throw error;
    

    for (let i = 0; i < results.length; i++) {
      arrX[i] = Object.values(results[i])[0]; 
      arrY[i] = Object.values(results[i])[1]; 
    }
    arr2D = [arrY, arrX];
    // arr = Object.values(results[0])
    res.send(arr2D);
  });
}