// const button = document.getElementById("button");
// button.addEventListener("click", covidOverTime);

async function covidOverTime(state=[]) {
  // event.preventDefault();

  const endpoint = "get_data";
  const url = document.baseURI + endpoint;

  console.log(url);

  try {
    let data = {
      name: "covid_deaths_over_time",
      cols: ["submission_date", "tot_death", "new_case"],
      paras: (state.length == 0 ? []: ["state='" + state + "'"]),
      order: "submission_date"
    };

    const trend = await getData(url, data);
    return trend;

  } catch (error) {
    console.log(error);
    return;
  }
}

async function covidBySex(state="United States", sex="All Sexes") {
  // event.preventDefault();

  const endpoint = "get_data";
  const url = document.baseURI + endpoint;

  console.log(url);

  try {
    let data = {
      name: "covid_deaths_by_sex",
      cols: ["end_date", "SUM(covid_19_deaths)"],
      paras: ["state='" + state + "' AND sex='" + sex + `' AND age_group='All Ages' AND "group" = 'By Month' GROUP BY end_date`],
      order: "end_date"
    };
    
    const trend = await getData(url, data);
    return trend;

  } catch (error) {
    console.log(error);
    return;
  }
}

async function covidbyCounty(state=[]) {
  // event.preventDefault();

  const endpoint = "get_data";
  const url = document.baseURI + endpoint;

  console.log(url);

  try {
    let data = {
      name: "covid_deaths_by_county",
      cols: ["county_name", "covid_death"],
      paras: (state.length == 0 ? []: ["state_name='" + state + "'"]),
      order: "covid_death DESC"
    };

    const trend = await getData(url, data);
    return trend;

  } catch (error) {
    console.log(error);
    return;
  }
}

async function getData(url, data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  
    console.log("options", options);
    const response = await fetch(url, options);
    return response.json();
  }
