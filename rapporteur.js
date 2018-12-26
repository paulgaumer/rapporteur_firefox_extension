// document.body.style.border = "5px solid red";

console.log(`Hello starts`);

function addElementToColumn(el, email) {
  fetch(`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`)
    .then((response) => response.text())
    .then((data) => {
      console.log(`Hello from data`);
      el.insertAdjacentHTML("afterbegin", `${data}`);
    })
    .catch((error) => console.error(error));
}

const gmailLoaded = setInterval(function() {
  if (document.querySelector(".y3") !== null) {
    clearInterval(gmailLoaded);
    console.log("y3 IS UPPPPPP");
    const td = document.querySelector(".y3");
    const email = document.querySelector(".gD").attributes.email.nodeValue;
    console.log(td);
    addElementToColumn(td, email);
  }
}, 100);
