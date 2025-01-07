const apiKey = "9TTJ32QWJE4RCWKUTP5XG3TUK"; 

const place = document.querySelector("#place");
const display = document.querySelector(".description");
const submitBtn = document.querySelector("#submit");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const timezone = document.querySelector(".timezone");

submitBtn.addEventListener("click", () => {
    if (place) {
        const placeInput = place.value.trim();
        if (placeInput) {
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeInput}?key=${apiKey}`;
            
            const search = async (placeInput) => {
                display.textContent = "Loading...";
                latitude.textContent = "";
                longitude.textContent = "";
                timezone.textContent = "";

                try {
                    const response = await fetch(url, { mode: "cors" });
                    if (!response.ok) {
                        console.log(`There is a problem here: ${response.status}`);
                        display.textContent = "Failed to fetch weather data.";
                        return;
                    }
                    const data = await response.json();

                    const desc = data.description || "No description available.";
                    const latitudeText = data.latitude || "N/A";
                    const longitudeText = data.longitude || "N/A";
                    const timezoneText = data.timezone || "N/A";

                    display.textContent = `Here is the weather: ${desc}`;
                    latitude.textContent = `The Latitude is ${latitudeText}`;
                    longitude.textContent = `The Longitude is ${longitudeText}`;
                    timezone.textContent = `The Timezone is ${timezoneText}`;
                    console.log(data);
                } catch (error) {
                    console.log(`There is a problem here:`, error);
                    display.textContent = "An error occurred while fetching the weather data.";
                }
            };

            search(placeInput);
        } else {
            console.log("Invalid input for the place.");
            display.textContent = "Please enter a valid place.";
        }
    } else {
        console.log("Prompt canceled or invalid input.");
    }
});
