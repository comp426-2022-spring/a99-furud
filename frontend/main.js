/*
  The functions that are called in this script are located in
  './dataFromAPI.js'
*/


let info;

const state = "NC";

// TODO: make a drop down manu to allow the user to select state
covidOverTime(state).then((info) => {

  let dates = [];
  let deaths = [];

  info.forEach((element) => {
    dates.push(element["submission_date"].split('T')[0]);
    deaths.push(element["tot_death"]);
  });

  var covid_over_time = document.getElementById("time_chart").getContext("2d");
  var chart = new Chart(covid_over_time, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          data: deaths,
          label: "Total Deaths in " + state,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
});

// TODO: plot the data for each sex with different lines on the same chart
covidBySex().then((info) => {
  let dates = [];
  let deaths = [];

  info.forEach((element) => {
    dates.push(element["end_date"].split('T')[0]);
    deaths.push(element["SUM(total_deaths)"]);
  });

  var covid_by_sex = document.getElementById("state_chart").getContext("2d");
  var chart = new Chart(covid_by_sex, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          data: deaths,
          label: "Montly Covid-19 Deaths in the United States",
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
})