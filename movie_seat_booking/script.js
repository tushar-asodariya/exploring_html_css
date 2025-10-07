const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const text = document.querySelector(".text");
const selectSeat = document.querySelector(".select-seat");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const countChanged = new Event("countChanged");
let ticketPrice = +movieSelect.value;
populateUI();

//update total count for selected seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat));

    localStorage.setItem('selectedSeatIndex',JSON.stringify(seatsIndex))

  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;

  count.dispatchEvent(countChanged);
}

//seat select listener
container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//save selected MOvie data
function setMovieData(index, price){
        localStorage.setItem("selectedMovieIndex", index);
        localStorage.setItem("selectedMoviePrice", price);

}

//get data from local storage and populate
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));

    if(selectedSeats!== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
                
            }
        })
      
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex=selectedMovieIndex
    }
}

//movie select event
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +movieSelect.value;
setMovieData(event.target.selectedIndex,movieSelect.value);
  updateSelectedCount();
});

function toggleTextView() {
  text.classList.toggle("hide");
}

function toggleSelectSeatView() {
  selectSeat.classList.toggle("hide");
}

//hide text when count and total =0
count.addEventListener("countChanged", (e) => {
  if (count.textContent === "0" && !text.classList.contains("hide")) {
    toggleTextView();
    toggleSelectSeatView();
  }

  if (count.textContent !== "0" && !selectSeat.classList.contains("hide")) {
    toggleTextView();
    toggleSelectSeatView();
  }
});

//initial count
updateSelectedCount()