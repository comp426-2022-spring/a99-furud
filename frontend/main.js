/*
  The functions that are called in this script are located in
  './dataFromAPI.js'
*/

focusDiv('home')

let info;
let state;
let chart;

const btnSelectState = document.getElementById('states')

btnSelectState.addEventListener('change', function (event) {

  event.preventDefault();

  state = this.options[this.selectedIndex].value;
  console.log('state', state)

  covidOverTime(state).then((info) => {

    let dates = [];
    let deaths = [];

    info.forEach((element) => {
      dates.push(element["submission_date"].split('T')[0]);
      deaths.push(element["tot_death"]);
    });

    var covid_over_time = document.getElementById("trend-chart").getContext("2d");

    let chart_data = {
      labels: dates,
      datasets: [
        {
          data: deaths,
          label: "Total Deaths in " + state,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          responsive: true,
          maintainAspectRatio: false
        },
      ],
    }

    if (chart == undefined) {
      chart = new Chart(covid_over_time, {
        type: "line",
        data: chart_data,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      chart.config.data = chart_data;
      chart.update()
    }
  });

});

// TODO: plot the data for each sex with different lines on the same chart
btnStateTrend.addEventListener('click', function () {

  covidBySex().then((info) => {
    let dates = [];
    let deaths = [];

    info.forEach((element) => {
      dates.push(element["end_date"].split('T')[0]);
      deaths.push(element["SUM(total_deaths)"]);
    });

    var covid_by_sex = document.getElementById("state-chart").getContext("2d");
    var chart = new Chart(covid_by_sex, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            data: deaths,
            label: "Monthly Covid-19 Deaths in the United States",
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });
});