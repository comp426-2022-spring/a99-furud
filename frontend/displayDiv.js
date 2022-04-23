
const btnHome = document.getElementById('homenav')
const btnTrend = document.getElementById('btnCovidTrend')
const btnStateTrend = document.getElementById('btnStateTrend')

btnHome.addEventListener('click', function (event) {
    focusDiv('home')
})

btnTrend.addEventListener('click', function () {
    focusDiv('trend-chart-container')
})

btnStateTrend.addEventListener('click', function () {
    focusDiv('state-chart-container')
})

function focusDiv(div) {
    divs = ["home", "trend-chart-container", "state-chart-container"]

    divs.forEach(element => {
        if (element != div) {
            document.getElementById(element).style.display = "none";
        } else {
            document.getElementById(element).style.display = "block";
        }
    });
}