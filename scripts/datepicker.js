try {
  const dateInput = document.getElementById("datepicker");
  const dateTomorrow = document.querySelector(".date-tomorrow");
  const dateToday = document.querySelector(".date-today");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);


  datepicker(dateInput, {
    startDay: new Date().getDay(),
    showAllDates: true,
    formatter: (input, date, instance) => {
      const value = date.toISOString().slice(0, 10);
      input.value = value;
    },
    dateSelected: tomorrow,
    defaultDate: tomorrow,
    minDate: today,
    formatDate: "yyyy-mm-dd",
    onSelect (instance, date) {
      localStorage.setItem("selectedDate", date.toISOString().slice(0, 10));
    },

    customMonths: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    customDays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum ", "Cts"],
  });

  dateTomorrow.addEventListener("click", (e) => {
    e.preventDefault();
    datepicker.dateSelected = tomorrow;
    dateInput.value = tomorrow.toISOString().slice(0, 10);
    dateTomorrow.classList.add("active");
    dateToday.classList.remove("active");
    localStorage.setItem("selectedDate", tomorrow.toISOString().slice(0, 10));
  });
  dateToday.addEventListener("click", (e) => {
    e.preventDefault();
    datepicker.dateSelected = today;
    dateInput.value = today.toISOString().slice(0, 10);
    dateToday.classList.add("active");
    dateTomorrow.classList.remove("active");
    localStorage.setItem("selectedDate", today.toISOString().slice(0, 10));
  });
} catch (error) {
  console.log(error);
}
