const origin = document.getElementById("origin");
const destination = document.getElementById("destination");
const test = document.querySelector(".test");

const selectedOptionOrigin = origin.options[origin.selectedIndex];
const selectedOptionDestination =
  destination.options[destination.selectedIndex];

origin.addEventListener("change", (e) => {
  localStorage.setItem("selectedOptionOrigin", e.target.value);
});

destination.addEventListener("change", (e) => {
  localStorage.setItem("selectedOptionDestination", e.target.value);
});

const lastSelectedOptionOrigin = localStorage.getItem("selectedOptionOrigin");
const lastSelectedOptionDestination = localStorage.getItem(
  "selectedOptionDestination"
);

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch("http://localhost:3000/getBusLocation", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let originOption;
    let destinationOption;
    for (let i = 0; i < data.data.length; i++) {
      originOption = document.createElement("option");
      destinationOption = document.createElement("option");
      originOption.value = data.data[i].id;
      originOption.innerHTML = data.data[i].name;

      destinationOption.value = data.data[i].id;
      destinationOption.innerHTML = data.data[i].name;

      origin.appendChild(originOption);
      destination.appendChild(destinationOption);

      if (lastSelectedOptionOrigin == data.data[i].id) {
        originOption.selected = true;
      }
      if (lastSelectedOptionDestination == data.data[i].id) {
        destinationOption.selected = true;
      }
    }
  })
  .catch((error) => console.log("error", error));

const journeyOrigin = document.getElementById("journeyOrigin");
const journeyDestination = document.getElementById("journeyDestination");
const departureTime = document.getElementById("departureTime");
const arrivalTime = document.getElementById("arrivalTime");

const getJourneys = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    originId: lastSelectedOptionOrigin,
    destinationId: lastSelectedOptionDestination,
    departureDate: "2023-03-25",
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
      let journeyStartDate;
      let journeyEndDate;
      journeyArea = document.createElement("p");
      journeyArea.innerHTML = data.data[0].journey.origin;

      journeyOrigin.appendChild(journeyArea);

      destinationArea = document.createElement("p");
      destinationArea.innerHTML = data.data[0].journey.destination;

      journeyDestination.appendChild(destinationArea);

      journeyStartDate = document.createElement("p");
      journeyStartDate.innerHTML = data.data[0].journey.departure;
      departureTime.appendChild(journeyStartDate);

      journeyEndDate = document.createElement("p");
      journeyEndDate.innerHTML = data.data[0].journey.arrivalTime;
      arrivalTime.appendChild(journeyEndDate);
    })
    .catch((error) => console.log("error", error));
};

const submitBtn = document.querySelector("button[type=submit]");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  getJourneys();
});
