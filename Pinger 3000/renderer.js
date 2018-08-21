var ping = require('ping');
var Chart = require('chart.js');
const { remote } = require('electron');

var nb = document.getElementById("value")
var ctx = document.getElementById("myChart").getContext('2d');
var NoChart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [{
            data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 3,
            pointRadius: 0
        }]
    },
    options: {
        tooltips: {
            intersect: false
        },
        responsive: false,
        legend: {
            display: false
        },
        animation: {
            duration: 1000,
            easing: 'linear'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    display: false,
                    zeroLineColor: 'rgba(255, 0, 0, 1)'
                },
                ticks: {
                    display: false,
                    min: '2'
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    zeroLineColor: 'rgba(255, 0, 0, 0)',
                    zeroLineWidth: 0
                },
                ticks: {
                    stepSize: 5,
                    maxTicksLimit: 10,
                    suggestedMax: 35,
                    suggestedMin: 0,
                    beginAtZero: true
                }
            }]
        }
    }
});

function addData(value) {
    if (NoChart.data.datasets["0"].data.length > 10)
        removeData()
    NoChart.data.datasets["0"].data.push(value)
    NoChart.update()
    nb.innerHTML = value.split(".")[0]
}

function removeData() {
    NoChart.data.datasets["0"].data.shift()
    NoChart.update()
}

setInterval(function () {   
        ping.promise.probe("google.fr")
            .then(function (res) {
                addData(res.avg);
            });
}, 1000);

document.querySelector(".close").addEventListener("click", function(){
  remote.BrowserWindow.getFocusedWindow().close();
});
document.querySelector(".small").addEventListener("click", function(){
  remote.BrowserWindow.getFocusedWindow().minimize();
});



module.exports = {
    addData,
    removeData
}
