function switchInputs() {
  const origin = document.getElementById("origin");
  const destination = document.getElementById("destination");

  const originValue = origin.options[origin.selectedIndex].text;
  const destinationValue = destination.options[destination.selectedIndex].text;

  origin.options[origin.selectedIndex].text = destinationValue;
  destination.options[destination.selectedIndex].text = originValue;
}

const switchBtn = document.querySelector(".switch-btn");
switchBtn.addEventListener("click", switchInputs);
