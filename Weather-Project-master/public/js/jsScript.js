element = document.getElementsByTagName("nav")[0];
//element.style.top = "0px";

let lastKnownScrollPosition = 0;

function func(x, y) {
  //console.log(x + " " + y);
  if (x < y) {
    if (element.style.top != "0px") {
      element.style.top = "0px";
    }
  } else {
    if (window.screen.width < window.screen.height * 0.65) {
      element.style.top = "-52px";
    }
    lastKnownScrollPosition = window.scrollY;
  }
}

document.addEventListener(
  "scroll",
  () => func(window.scrollY, lastKnownScrollPosition),
  setTimeout(() => 100)
);

setTimeout(() => {
  if (localStorage.getItem("theme") == "true") {
    document.documentElement.classList.toggle("dark");
    console.log(localStorage.getItem("theme"));
  }
  console.log(localStorage.getItem("theme"));
}, 0);

function dark_mode() {
  if (localStorage.getItem("theme") == "true") {
    localStorage.setItem("theme", false);
  } else {
    localStorage.setItem("theme", true);
  }
  document.documentElement.classList.toggle("dark");
  console.log(localStorage.getItem("theme"));
}

document.querySelector("#dark-mode-toggle").onclick = () => {
  dark_mode();
};

function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

// CALLOUT NOTIFICATION SCRIPT ALVI NEEDED JQUERY
$(".callout").click(function(){
  $(this).hide()
})


/*document.querySelector("#dark-mode-toggle-mb").onclick = () => {
    document.documentElement.classList.toggle("dark");
};*/
var graphDiv = document.getElementById('bar1')
function plotgraph (x, y, type){
    var trace1 = {
        type: type,
        x: x,
        y: y,
        marker: {
          color: "#C8A2C8",
          line: {
            width: 2.5,
            height: 2,
          },
        },
      };
      
      
      Plotly.newPlot(
        graphDiv,
        [trace1],
        {
          title: "Year Average",
          font: { size: 18 },
        },
        { responsive: true}
      );
}

// plotgraph( [1999, 2000, 2001, 2002],[10, 15, 13, 17], "bar" );
let res;
let state = "none";
let arr = [[], [], []];

function bar() {
  arr = [[], [], []];
  let url = "/bar";
  state = "bar";
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      res = out;
      for (let i = 0; i < out.length; i++) {
        arr[0][i] = out[i].YEAR;
        arr[1][i] = out[i].MEAN;
      }

      //   Plotly.addTraces(graphDiv, [{y: arr[0]}, {y: arr[1]}]);
      //   console.log(arr[0]);
      // plotgraph(arr[0], arr[1], "line");
      var trace1 = {
        type: "bar",
        x: arr[0],
        y: arr[1],
        marker: {
          color: "#8BA6A6",
          line: {
            width: 2.5,
            height: 2,
          },
        },
      };

      // var trace2 = {
      //   type: "line",
      //   x: arr[0][0],
      //   y: arr[0][1],
      //   name: 'pa_mean',
      //   marker: {
      //     color: "#75DFBC",
      //     line: {
      //       width: 2.5,
      //       height: 2,
      //     },
      //   },
      // };

      var layout = {
        title: {
          text: "Bar Graph",
          font: {
            family: "monospace",
            size: 24,
          },
        },
        xaxis: {
          title: {
            text: "Date",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
        yaxis: {
          title: {
            text: "PM2.5",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
      };

      Plotly.newPlot(
        graphDiv,
        [trace1],
        layout,
        { responsive: true }
      );
    })
    .catch((err) => {
      throw err;
    });
}

function line() {
  arr = [[], [], []];
  let url = "/line";
  state = "line"
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      res = out;
      for (let i = 0; i < out.length; i++) {
        arr[0][i] = out[i].DAY;
        arr[1][i] = out[i].EPA_MEAN;
        arr[2][i] = out[i].PA_MEAN;
      }

      var trace1 = {
        type: "line",
        x: arr[0],
        y: arr[1],
        name: "epa_mean",
        marker: {
          color: "#75DFBC",
          line: {
            width: 2.5,
            height: 2,
          },
        },
      };

      var trace2 = {
        type: "line",
        x: arr[0],
        y: arr[2],
        name: "pa_mean",
        marker: {
          color: "#C8A2C8",
          line: {
            width: 2.5,
            height: 2,
          },
        },
      };

      var layout = {
        title: {
          text: "Average month",
          font: {
            family: "monospace",
            size: 24,
          },
        },
        xaxis: {
          title: {
            text: "Date",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
        yaxis: {
          title: {
            text: "PM2.5",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
      };

      Plotly.newPlot(
        graphDiv,
        [trace1, trace2],
        layout,
        { responsive: true }
      );
    })
    .catch((err) => {
      throw err;
    });
}

// bar();
line();

var selectedValue = "DAY";
function getSelectValue() {
  selectedValue = String(document.getElementById("list").value);
  let arr = [[], [], []];
  let url = "/" + state + "_" + selectedValue;

      // for (let i = 0; i < out.length; i++) {
      //   arr[0][i] = out[i][selectedValue];
      //   arr[1][i] = out[i].MEAN;
      // }

  switch (state) {
    case "bar":
      fetch(url)
        .then((res) => res.json())
        .then((out) => {
          res = out;
          for (let i = 0; i < out.length; i++) {
            arr[0][i] = out[i][selectedValue];
            arr[1][i] = out[i].MEAN;
          }

          var trace1 = {
            type: state,
            x: arr[0],
            y: arr[1],
            marker: {
              color: "#8BA6A6",
              line: {
                width: 2.5,
                height: 2,
              },
            },
          };

          var layout = {
            title: {
              text: "Bar Graph",
              font: {
                family: "monospace",
                size: 24,
              },
            },
            xaxis: {
              title: {
                text: "Date",
                font: {
                  family: "monospace",
                  size: 18,
                  color: "#7f7f7f",
                },
              },
            },
            yaxis: {
              title: {
                text: "PM2.5",
                font: {
                  family: "monospace",
                  size: 18,
                  color: "#7f7f7f",
                },
              },
            },
          };

          Plotly.newPlot(graphDiv, [trace1], layout, { responsive: true });
        });
      break;
    case "line":
      fetch(url)
        .then((res) => res.json())
        .then((out) => {
          res = out;

          for (let i = 0; i < out.length; i++) {
            arr[0][i] = out[i][selectedValue];
            arr[1][i] = out[i].EPA_MEAN;
            arr[2][i] = out[i].PA_MEAN;
          }

          var trace1 = {
            type: "line",
            x: arr[0],
            y: arr[1],
            name: "epa_mean",
            marker: {
              color: "#75DFBC",
              line: {
                width: 2.5,
                height: 2,
              },
            },
          };
    
          var trace2 = {
            type: "line",
            x: arr[0],
            y: arr[2],
            name: "pa_mean",
            marker: {
              color: "#C8A2C8",
              line: {
                width: 2.5,
                height: 2,
              },
            },
          };
    
          var layout = {
            title: {
              text: "Average " + selectedValue.toLowerCase(),
              font: {
                family: "monospace",
                size: 24,
              },
            },
            xaxis: {
              title: {
                text: "Date",
                font: {
                  family: "monospace",
                  size: 18,
                  color: "#7f7f7f",
                },
              },
            },
            yaxis: {
              title: {
                text: "PM2.5",
                font: {
                  family: "monospace",
                  size: 18,
                  color: "#7f7f7f",
                },
              },
            },
          };

          Plotly.newPlot(graphDiv, [trace1, trace2], layout, {
            responsive: true,
          });
        });

      break;

    default:
      break;
  }

      //   Plotly.addTraces(graphDiv, [{y: arr[0]}, {y: arr[1]}]);
      //   console.log(arr[0]);
      // plotgraph(arr[0], arr[1], "line");


      // Plotly.animate(
      //   graphDiv,
      //   {
      //     data: [{x: arr[0]}, {y: arr[1]}],
      //     // traces: [0],
      //   },
      //   {
      //     transition: {
      //       duration: 500,
      //       easing: "cubic-in-out",
      //     },
      //     frame: {
      //       duration: 500,
      //     },
      //   }
      // );
      // })
}

function division(){
  state = "division";
  let url = "/division_DAY";
  arr = [[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]];
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      let sat = "";
      let division = [];
      let divIndex = 0;
      for (let i = 0; i < out.length; i++) {
        sat = "";
        for (let j = 0; j < division.length; j++) {
          if (division[j] === out[i].Division) {
            sat = String(out[i].Division);
            break;
          }
        }
        if (sat === "") {
          division.push(out[i].Division);
        };

        // arr[0].push(out[i].DAY);
        // arr[0][i] = out[i].DAY;
        for (divIndex = 0; divIndex < division.length; divIndex++) {
          if (division[divIndex] === sat) {
            // arr[divIndex+1].push(out[i].PM25);
            arr[divIndex][0].push(out[i].DAY);
            arr[divIndex][1].push(out[i].PM25);
            break;
          }
        }
        // arr[divIndex+1].push(out[i].PM25);
      }
      // console.log(arr);

      var trace = [];

      for (let i = 0; i < division.length; i++) {
        var traceBin = {
          type: "line",
          x: arr[i][0],
          y: arr[i][1],
          name: division[i],
          marker: {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            line: {
              width: 2.5,
              height: 2,
            },
          },
        };
        trace.push(traceBin)
      }

      var layout = {
        title: {
          text: "Division Line Chart",
          font: {
            family: "monospace",
            size: 24,
          },
        },
        xaxis: {
          title: {
            text: "Date",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
        yaxis: {
          title: {
            text: "PM2.5",
            font: {
              family: "monospace",
              size: 18,
              color: "#7f7f7f",
            },
          },
        },
      };

      Plotly.newPlot(
        graphDiv,
        trace,
        layout,
        { responsive: true }
      );
    })
    .catch((err) => {
      throw err;
    });
  // getSelectValue.selectedValue = "DAY";
  // getSelectValue();
}

  function scatter() {
    state = "scatter";
    var arrx=[], arry=[], arr = [arrx,arry];
    const Http = new XMLHttpRequest();
    const url = "/scatter";
    Http.open("GET", url);
    Http.send();
  
    Http.onreadystatechange = (e) => {
      arr = JSON.parse(Http.response);

    //   Plotly.addTraces(graphDiv, [{y: arr[0]}, {y: arr[1]}]);
    //   console.log(arr[0]);
    
    var trace1 = {
      x: arr[0],
      y: arr[1],
      mode: 'markers',
      type: 'scatter',
      name: 'Scatter',
      marker: { size: 5 }
    };
    
    var data = [trace1];
    
    var layout = {
      // xaxis: {
      //   range: [ 0.75, 5.25 ]
      // },
      // yaxis: {
      //   range: [0, 8]
      // },
      title:'Scatter Plot Year'
    };

    Plotly.newPlot(graphDiv, data, layout);

    };
  }

function downloadCVS() {
  const fileName = "report-DBMS-"+state+"-"+selectedValue+".csv";

  function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);

    return array
      .map((it) => {
        return Object.values(it).toString();
      })
      .join("\n");
  }
  const saveData = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      const blob = new Blob([data], {
          type: "octet/stream",
        }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();
  // let url = "/division_DAY";
  let url = state+"_"+selectedValue;
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      saveData(convertToCSV(out), fileName);
    });
}