/*
  The functions that are called in this script are located in
  './dataFromAPI.js'
*/

focusDiv('home')

let info;
let state;
let chart;
let countyChart;
let ageChart;
let age_group;
let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

const btnSelectState = document.getElementById('states')

btnSelectState.addEventListener('change', function (event) {

  event.preventDefault();

  state = this.options[this.selectedIndex].value;
  console.log('state', state)

  covidOverTime(state).then((info) => {

    let dates = [];
    let deaths = [];
    let cases = [];

    info.forEach((element) => {
      dates.push(formatDate(element["submission_date"].split('T')[0]));
      deaths.push(element["tot_death"]);
      cases.push(element["new_case"])
    });

    var covid_over_time = document.getElementById("trend-chart").getContext("2d");

    let chart_data = {
      labels: dates,
      datasets: [
        {
          data: deaths,
          label: "Total Covid-19 Deaths in " + state,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          responsive: true,
          maintainAspectRatio: false
        },
        {
          data: cases,
          label: "New cases",
          fill: false,
          borderColor: "rgb(255, 215, 0)"
        }
      ],
    }

    if (chart == undefined) {
      chart = new Chart(covid_over_time, {
        type: "line",
        data: chart_data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 100000
            }
          },
          tension: 1
        }
      });
    } else {
      chart.config.data = chart_data;
      chart.update()
    }
  });

  covidbyCounty(state).then((info) => {

    let county = [];
    let deaths = [];

    info.forEach((element) => {
      county.push(element["county_name"]);
      deaths.push(element["covid_death"]);
    });

    var covid_by_county = document.getElementById("county-chart").getContext("2d");

    let chart_data = {
      labels: county,
      datasets: [
        {
          data: deaths,
          label: "Deaths in " + state + " by county",
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          responsive: true,
          maintainAspectRatio: false
        },
      ],
    }

    if (countyChart == undefined) {
      countyChart = new Chart(covid_by_county, {
        type: "bar",
        data: chart_data,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      countyChart.config.data = chart_data;
      countyChart.update()
    }
  });
});


const btnSelectState2 = document.getElementById('states-2')
const btnSelectAge = document.getElementById('ages')
const btnAgeGroupChart = document.getElementById('btnStateTrend')

btnAgeGroupChart.addEventListener('click', regenerate_chart)
btnSelectState2.addEventListener('change', regenerate_chart)
// btnSelectAge.addEventListener('change', regenerate_chart)


// TODO: plot the data for each sex with different lines on the same chart
function regenerate_chart() {
  
  let states = document.getElementById('states-2')
  let ages = document.getElementById("ages")

  state = states.options[states.selectedIndex].text;
  // age_group = ages.options[ages.selectedIndex].value;
 
  // console.log('state', state)

  covidBySex(state, "All Sexes", "All Ages").then((info) => {
    let age_groups = [];
    let deaths = [];

    info.forEach((element) => {
      age_groups.push((element["age_group"].split('T')[0]));
      deaths.push(element["covid_19_deaths"]);
    });

    let chart_data =  {
      labels: age_groups,
      datasets: [
        {
          data: deaths,
          label: "Deaths by age group in " + state,
          fill: false,
          borderColor: "rgba(0, 0, 0, 0.1)",
          tension: 0.1,
          backgroundColor: getColors(age_groups.length)
        },
      ],
    }

    var covid_by_sex = document.getElementById("state-chart").getContext("2d");
    
    if (ageChart == undefined) {
      ageChart = new Chart(covid_by_sex, {
        type: "doughnut",
        data: chart_data,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      ageChart.config.data = chart_data;
      ageChart.update()
    }
  });
};

function formatDate(date) {
  let date_arr = date.split('-')
  let month = months[Number(date_arr[1]) - 1];

  return month + " " + String(date_arr[0])
}

function getColors(length){
  let pallet = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];
  let colors = [];

  for(let i = 0; i < length; i++) {
    colors.push(pallet[i % (pallet.length - 1)]);
  }

  return colors;
}
