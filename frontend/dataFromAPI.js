
const button = document.getElementById('button')
button.addEventListener('click', covidOverTime)

graphData = covidOverTime();

async function covidOverTime() {
    
    console.log('button clicked')
    
    // event.preventDefault();
				
    const endpoint = "get_data"
    const url = document.baseURI+endpoint

    console.log(url)

    try {
        const flip = await getData(url);

        console.log(flip);
        // graphData = flip;
        document.getElementById("outputTable").innerHTML = flip;

        return flip;
    } catch (error) {
        console.log(error);
        return;
    }
}

async function getData(url) {
    const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
    
        const response = await fetch(url, options);
        return response.json()
}

// export {graphData};