try {
    
  const locations = document.getElementById("locations");
  const destinations = document.getElementById("destinations");
  const journeyOrigin = document.getElementById("journeyOrigin");
  const journeyDestination = document.getElementById("journeyDestination");
  const departureTime = document.getElementById("departureTime");
  const arrivalTime = document.getElementById("arrivalTime");
  const journeyDate = document.getElementById("journeyDate");
  const price = document.getElementById("price");
  const currency = document.getElementById("currency");

const getJourneys = () => {
 


  const lastSelectedOptionOrigin = localStorage.getItem("selectedOptionOrigin");
  const lastSelectedOptionDestination = localStorage.getItem(
      "selectedOptionDestination"
  );
  const selectedDate = localStorage.getItem("selectedDate");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    originId: lastSelectedOptionOrigin,
    destinationId: lastSelectedOptionDestination,
    departureDate: selectedDate,
  });
  console.log(raw);

  const requestOptionsJourney = {
    method: "POST",
    body: raw,
    redirect: "follow",
    headers: myHeaders,
  };

  fetch("http://localhost:3000/getJourney", requestOptionsJourney)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let journeyArea;
      let destinationArea;
      let journeyStartHour;
      let journeyEndHour;
      let journeyNewDate;
      let internetPrice;
      let newCurrency;
      let getLocationsOrigin;

      getLocationsOrigin = document.createElement("p");
      getLocationsOrigin.innerHTML = data.data[0]["origin-location"];
      locations.appendChild(getLocationsOrigin);

      getLocationsDestination = document.createElement("p");
      getLocationsDestination.innerHTML = data.data[0]["destination-location"];
      destinations.appendChild(getLocationsDestination);

      journeyArea = document.createElement("p");
      journeyArea.innerHTML = data.data[0].journey.origin;

      journeyOrigin.appendChild(journeyArea);

      destinationArea = document.createElement("p");
      destinationArea.innerHTML = data.data[0].journey.destination;

      journeyDestination.appendChild(destinationArea);

      journeyStartHour = document.createElement("p");
      journeyStartHour.innerHTML = data.data[0].journey.departure
        .split("T")[1]
        .substring(0, 5);
      departureTime.appendChild(journeyStartHour);

      journeyNewDate = document.createElement("p");
      journeyNewDate.innerHTML = data.data[0].journey.departure
        .split("T")[0]
        .replaceAll("-", " / ");
      journeyDate.appendChild(journeyNewDate);

      journeyEndHour = document.createElement("p");
      journeyEndHour.innerHTML = data.data[0].journey.arrival
        .split("T")[1]
        .substring(0, 5);
      arrivalTime.appendChild(journeyEndHour);

      internetPrice = document.createElement("p");
      internetPrice.innerHTML = data.data[0].journey["internet-price"];
      price.appendChild(internetPrice);

      newCurrency = document.createElement("p");
      newCurrency.innerHTML = data.data[0].journey.currency;
      currency.appendChild(newCurrency);
    })
    .catch((error) => console.log("error", error));
};
window.addEventListener("load", () => {
  getJourneys();
});
} catch (error) {
console.log(error);
}
