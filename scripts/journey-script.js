try {
  const locations = document.getElementById("locations");
  const destinations = document.getElementById("destinations");
  const journeyDate = document.getElementById("journeyDate");
  const cardWrapper = document.querySelectorAll(".card-wrapper");

  const loader = document.getElementById("loading");

  const getJourneys = () => {
    const lastSelectedOptionOrigin = localStorage.getItem(
      "selectedOptionOrigin"
    );
    const lastSelectedOptionDestination = localStorage.getItem(
      "selectedOptionDestination"
    );
    const selectedDate = localStorage.getItem("selectedDate");

    const myHeaders = {
      "Content-Type": "application/json",
    };

    const raw = JSON.stringify({
      originId: lastSelectedOptionOrigin,
      destinationId: lastSelectedOptionDestination,
      departureDate: selectedDate,
    });

    const requestOptionsJourney = {
      method: "POST",
      body: raw,
      redirect: "follow",
      headers: myHeaders,
    };

    fetch("http://localhost:3000/getJourney", requestOptionsJourney)
      .then((response) => response.json())
      .then((data) => {
        hideLoading();
        let getLocationsOrigin;
        let getLocationsDestination;
        let journeyNewDate;

        // journey header start

        getLocationsOrigin = document.createElement("p");
        getLocationsOrigin.innerHTML = data.data[0]["origin-location"];
        locations.appendChild(getLocationsOrigin);

        getLocationsDestination = document.createElement("p");
        getLocationsDestination.innerHTML =
          data.data[0]["destination-location"];
        destinations.appendChild(getLocationsDestination);

        journeyNewDate = document.createElement("p");
        journeyNewDate.innerHTML = data.data[0].journey.departure
          .split("T")[0]
          .replaceAll("-", " / ");
        journeyDate.appendChild(journeyNewDate);

        // journey header end

        const departureTimeArray = [];

        for (let i = 0; i < data.data.length; i++) {
          const newCurrency = data.data[i].journey.currency;
          const internetPrice = data.data[i].journey["internet-price"];
          const arrivalTime = data.data[i].journey.arrival
            .split("T")[1]
            .substring(0, 5);
          departureTimeArray.push(
            data.data[i].journey.departure.split("T")[1].substring(0, 5)
          );
          const journeyOrigin = data.data[i].journey.origin;
          const journeyDestination = data.data[i].journey.destination;

          departureTimeArray.sort();

          const newCard = `  <div class="card mb-2">
            <div class="row card-row">
              <div class="col">
                <div class="card-info">
                  <div class="d-flex flex-column">
                    <span>Kalkış</span>
                    <span><span id="departureTime">${departureTimeArray[i]}</span></span>
                  </div>
                  <span class="d-flex justify-content-center mx-2">
                      <?xml version="1.0" encoding="iso-8859-1"?>
                      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                      <svg
                        height="12"
                        width="12"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 483.563 483.563"
                        xml:space="preserve"
                      >
                        <g>
                          <polygon
                            style="fill: #192289"
                            points="483.563,221.781 148.61,221.781 148.61,93.171 0,241.781 148.61,241.781 148.61,261.781 
                                483.563,261.781 	"
                          />
                          <polygon
                            style="fill: #192289"
                            points="0,241.781 148.61,390.392 148.61,241.781 	"
                          />
                        </g>
                      </svg>
                  </span>
                  <div class="d-flex flex-column mx-2">
                    <span>Varış</span>
                    <span> <span id="arrivalTime">${arrivalTime}</span></span>
                  </div>
                </div>
              
              </div>
  
              <div class="col d-flex justify-content-end align-items-start">
                <span class="card-price" >
                  <span id="price">${internetPrice}</span>
                  <span id="currency">${newCurrency}</span>
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <span id="journeyOrigin">${journeyOrigin}</span> 
              <span class="mx-2"> - </span>
              <span id="journeyDestination">${journeyDestination}</span>
            </div>
          </div>`;

          cardWrapper[0].innerHTML += newCard;
        }
      })
      .catch((error) => console.log("error", error));
  };
  window.addEventListener("load", () => {
    getJourneys();
    displayLoading();
  });
  const displayLoading = () => {
    loader.classList.add("display");
  }
  const hideLoading = () => {
    loader.classList.remove("display");
  }
} catch (error) {
  console.log(error);
}
