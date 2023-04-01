try {
  const origin = document.getElementById("origin");
  const destination = document.getElementById("destination");

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const selectedOptionOrigin = origin.options[origin.selectedIndex];
  const selectedOptionDestination =
    destination.options[destination.selectedIndex];

  origin.addEventListener("change", (e) => {
    localStorage.setItem("selectedOptionOrigin", e.target.value);
  });

  destination.addEventListener("change", (e) => {
    localStorage.setItem("selectedOptionDestination", e.target.value);
  });

  localStorage.setItem("selectedDate", tomorrow.toISOString().slice(0, 10));

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

          originOption.value = data.data[i].id;
          originOption.innerHTML = data.data[i].name;

          origin.appendChild(originOption);

          if (lastSelectedOptionOrigin == data.data[i].id) {
            originOption.selected = true;
          }
        }

        const selectOrigin = new SlimSelect({
          select: origin,
          settings: {
            searchPlaceholder: "il veya ilçe adı giriniz",
          },
        });
        selectOrigin.setData(data.data);

        if (localStorage.getItem("selectedOptionOrigin") == null) {
          localStorage.setItem("selectedOptionOrigin", data.data[0].id);
        }

        for (let i = 2; i < data.data.length; i++) {
          destinationOption = document.createElement("option");
          destinationOption.value = data.data[i].id;
          destinationOption.innerHTML = data.data[i].name;
          destination.appendChild(destinationOption);

          if (lastSelectedOptionDestination == data.data[i].id) {
            destinationOption.selected = true;
          }
        }
        const selectDestination = new SlimSelect({
          select: destination,
          settings: {
            searchPlaceholder: "il veya ilçe adı giriniz",
          },
        });
        selectDestination.setData(data.data);

        if (localStorage.getItem("selectedOptionDestination") == null) {
          localStorage.setItem("selectedOptionDestination", data.data[2].id);
        }
      })

      .catch((error) => console.log("error", error));
  };

  function switchInputs() {
    const originValue = origin.options[origin.selectedIndex];
    const destinationValue = destination.options[destination.selectedIndex];

    localStorage.setItem("selectedOptionOrigin", originValue.value);
    localStorage.setItem("selectedOptionDestination", destinationValue.value);

    origin.options[origin.selectedIndex] = destinationValue;
    destination.options[destination.selectedIndex] = originValue;

    document.querySelector(".origin .ss-single").innerHTML = originValue.text;
    document.querySelector(".destination .ss-single").innerHTML =
      destinationValue.text;
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
    window.location.href = "/journey-index.html";
  });
} catch (error) {
  console.log(error);
}
