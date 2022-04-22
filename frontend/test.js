let info; //= await covidOverTime();

covidOverTime().then((info) => {
  console.log("info", info);

  let dates = [];
  let deaths = [];

  info.forEach((element) => {
    dates.push(element["submission_date"]);
    deaths.push(element["tot_death"]);
  });

  console.log("dates:", dates);
  console.log("deaths:", deaths);

  var ctx = document.getElementById("chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          data: deaths,
          //[{subDate: '2021-08-29T00:00:00.000', deaths: 2}, {subDate: '2021-09-29T00:00:00.000', deaths: 10}],
          //document.getElementById('outputTable').innerHTML,
          label: "total",
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
});
