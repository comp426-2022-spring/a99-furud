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
      paras: (state.length == 0 ? []: ["state='" + state + `' AND 
      new_case NOT IN 
      (
          SELECT new_case
          FROM covid_deaths_over_time
          ORDER BY new_case DESC
          LIMIT 100
      )`
    ]), // filter extremes
      order: "submission_date"
    };

    const trend = await getData(url, data);
    return trend;

  } catch (error) {
    console.log(error);
    return;
  }
}

async function covidBySex(state="United States", sex="All Sexes", age="All Ages") {
  // event.preventDefault();

  // const age_groups = {
  //   "0-17 years" : ["0-17 years"],
  //   "18-44 years" : ["18-29 years", "30-39 years", "35-44 years"],
  //   "44-64 years" : ["45-54 years", "55-64 years"],
  //   "65-84 years" : ["65-74 years", "75-84 years"],
  //   "85 years and over": ["85 years and over"]
  // }

  const endpoint = "get_data";
  const url = document.baseURI + endpoint;

  console.log(url);

  try {
    let data = {
      name: "covid_deaths_by_sex",
      cols: ["age_group", "covid_19_deaths"],
      paras: ["state='" + state + "' AND sex='" + sex + `' AND age_group<>'${age}' AND "group" = 'By Total' AND 
      (age_group = '0-17 years' 
      OR age_group = '18-29 years'
      OR age_group = '30-39 years'
      OR age_group = '40-49 years'
      OR age_group = '50-64 years'
      OR age_group = '65-74 years'
      OR age_group = '75-84 years')
      GROUP BY age_group`],
      order: "covid_19_deaths"
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
