const weatherApi = "https://api.weather.gov/alerts/active?area=";

//function to fetch alerts
function fetchWeatherAlerts(state) {
  if (!state) {
    showError("Please enter a state abbreviation.");
    return;
  }

  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Could not fetch alerts. Please check the state code.");
      }
      return response.json();
    })
    .then(data => {
      displayAlerts(data, state);
    })
    .catch(error => {
      console.log(error.message);
      showError(error.message);
    });
}

//function to display alerts
function displayAlerts(data, state) {
  const alertsDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  alertsDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const input = document.getElementById("state-input");

  if (!data.features || data.features.length === 0) {
    alertsDiv.textContent = `No active alerts for ${state}.`;
    input.value = "";  //always clear
    return;
  }

  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${data.features.length}`; // ✅ matches test
  alertsDiv.appendChild(summary);

  const list = document.createElement("ul");
  data.features.forEach(alert => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });
  alertsDiv.appendChild(list);

  input.value = ""; //always clear input after success
}

  //clearing input field
  document.getElementById("state-input").value = "";


//function to show errors
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  const alertsDiv = document.getElementById("alerts-display");

  alertsDiv.innerHTML = ""; //clear old alerts
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

//add event listener for button
document.getElementById("fetch-alerts").addEventListener("click", () => {
  const stateInput = document.getElementById("state-input").value.trim().toUpperCase();
  fetchWeatherAlerts(stateInput);
});