const form = document.querySelector("form");
const input = document.getElementById("location");
const output = document.getElementById("output");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/weather?address=${input.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        output.textContent = data.error;
      } else {
        output.textContent = data.forecast;
      }
    });
  });
});
