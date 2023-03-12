const dateInput = document.getElementById("datepicker");
const dateTomorrow = document.querySelector(".date-tomorrow");
const dateToday = document.querySelector(".date-today");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

datepicker(dateInput, {
  startDay: 1,
  showAllDates: true,
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value;
  },
  dateSelected: today,

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
  console.log("selected", datepicker.dateSelected);
});
dateToday.addEventListener("click", (e) => {
  e.preventDefault();
  datepicker.dateSelected = today;
});
