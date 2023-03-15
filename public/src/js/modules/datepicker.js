const dateInput = document.getElementById("datepicker");
const dateTomorrow = document.querySelector(".date-tomorrow");
const dateToday = document.querySelector(".date-today");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

datepicker(dateInput, {
  startDay: new Date().getDay(),
  showAllDates: true,
  formatter: (input, date, instance) => {
    const value = formatDate(date);
    input.value = value;
  },
  dateSelected: today,
  minDate: today,

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
  dateInput.value = tomorrow.toLocaleDateString();
});
dateToday.addEventListener("click", (e) => {
  e.preventDefault();
  datepicker.dateSelected = today;
  dateInput.value = today.toLocaleDateString();
});
