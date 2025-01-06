const apiKey = ""; 

const place = document.querySelector("#place");

const display = document.querySelector(".display")
if (place) {
    const placeInput = place.value.trim();
    if (placeInput) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeInput}?key=${apiKey}`;
        
        const search = async (placeInput) => {
            try {
                const response = await fetch(url, { mode: "cors" });
                if (!response.ok) {
                    console.log(`There is a problem here: ${response.status}`);
                    return;
                }
                const data = await response.json();
                display.textContent = `Here is the weather: ${JSON.stringify(data)}`;
                console.log(data)
            } catch (error) {
                console.log(`There is a problem here:`, error);
            }
        };

        search(placeInput);
    } else {
        console.log("Invalid input for the place.");
    }
} else {
    console.log("Prompt canceled or invalid input.");
}
