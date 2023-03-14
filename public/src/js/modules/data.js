const origin = document.getElementById("origin");
const destination = document.getElementById("destination");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch("http://localhost:3000/getBusLocation", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    let option;
    for (let i = 0; i < data.data.length; i++) {
      option = document.createElement("option");
      option.value = data.data[i].name;
      option.innerHTML = data.data[i].name;
      origin.appendChild(option);
      destination.appendChild(option.cloneNode(true));
    }
  })
  .catch((error) => console.log("error", error));
