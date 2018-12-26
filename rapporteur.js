// document.body.style.border = "5px solid red";

console.log(`Hello starts`);

const gmailLoaded = setInterval(function() {
  if (document.querySelector(".y3") !== null) {
    console.log("y3 IS UPPPPPP");
    const td = document.querySelector(".y3");
    console.log(td);
    addElementToColumn(td);
    clearInterval(gmailLoaded);
  }
}, 100);

function addElementToColumn(el) {
  fetch(
    `https://www.linkedin.com/sales/gmail/profile/viewByEmail/gaumer.pa@gmail.com`
  )
    .then((response) => response.text())
    .then((data) => {
      console.log(`Hello from data`);
      el.insertAdjacentHTML("afterbegin", `${data}`);
    })
    .catch((error) => console.error(error));
}
