try {
  const origin = document.getElementById("origin");
  const destination = document.getElementById("destination");
  const date = document.getElementById("datepicker").value;

  const selectedOptionOrigin = origin.options[origin.selectedIndex];
  const selectedOptionDestination =
    destination.options[destination.selectedIndex];

  origin.addEventListener("change", (e) => {
    localStorage.setItem("selectedOptionOrigin", e.target.value);
  });

  destination.addEventListener("change", (e) => {
    localStorage.setItem("selectedOptionDestination", e.target.value);
  });

  const selectedDate = localStorage.getItem("selectedDate");

  const lastSelectedOptionOrigin = localStorage.getItem("selectedOptionOrigin");
  const lastSelectedOptionDestination = localStorage.getItem(
    "selectedOptionDestination"
  );


  const getLocations = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/getBusLocation", requestOptions)
      .then((response) => response.json())
      .then((data) => {
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
  };

  const getJourneys = () => {
    console.log("getJourneys");
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
  };

  function switchInputs() {
    const originValue = origin.options[origin.selectedIndex];
    const destinationValue = destination.options[destination.selectedIndex];
    localStorage.setItem("selectedOptionOrigin", originValue.value);
    localStorage.setItem("selectedOptionDestination", destinationValue.value);

    origin.options[origin.selectedIndex] = destinationValue;
    destination.options[destination.selectedIndex] = originValue;
  }

  const switchBtn = document.querySelector(".switch-btn");
  if (switchBtn) {
    switchBtn.addEventListener("click", switchInputs);
  }

  window.addEventListener("load", () => {
    getLocations();
  });

  const submitBtn = document.querySelector("[type=submit]");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href =
      "/journey-index.html?originText=&destinationText=&datepicker=";
  });
} catch (error) {
  console.log(error);
}
