try {
  const origin = document.getElementById("origin");
  const destination = document.getElementById("destination");

  const loader = document.getElementById("loading");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  localStorage.setItem("selectedDate", tomorrow.toISOString().slice(0, 10));

  const submitBtn = document.querySelector(".btn.btn-primary");

  const handleSelectChange = () => {
    const originValue = origin.value;
    const destinationValue = destination.value;

    localStorage.setItem("selectedOptionOrigin", originValue);
    localStorage.setItem("selectedOptionDestination", destinationValue);

    // Disable the submit button if the selected values are the same
    if (originValue === destinationValue) {
      toastr();
      submitBtn.classList.add("disabled");
    } else {
      submitBtn.classList.remove("disabled");
    }
  }

  origin.addEventListener("change", handleSelectChange);
  destination.addEventListener("change", handleSelectChange);

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
        hideLoading();
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

  const switchInputs = () => {
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
    displayLoading();
  });
  const displayLoading = () => {
    loader.classList.add("display");
  }
  const hideLoading = () => {
    loader.classList.remove("display");
  }

  const toastr = () => {
    new Toastify({
      text: "lütfen farklı şehirler seçiniz",
      duration: 3000,
      gravity: "top",
      position: "right",
      className: "error",
      backgroundColor: "#ff0000",
    }).showToast();
  };
} catch (error) {
  console.log(error);
}
