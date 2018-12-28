// ## TODO ##
//
// -------------------------------------------------------------------

// UTILITIES
let activeAddress = null;

function cleanColumn(target) {
  document.querySelectorAll(target).forEach((el) => {
    el.remove();
  });
}

function addressIsDifferent(newAddress) {
  if (newAddress !== activeAddress) {
    return true;
  }
}

// Fetch data using the email address and display them in the side column
function addInfoToEmail(el, email) {
  fetch(`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`)
    .then((response) => response.text())
    .then((data) => {
      activeAddress = email;
      cleanColumn(".rapporteur-data");
      el.insertAdjacentHTML(
        "afterbegin",
        `<div class="rapporteur-data">${data}</div>`
      );
    })
    .catch((error) => console.error(error));
}

// Wait for the needed DOM elements to be loaded and available
function checkWindowLoaded() {
  const windowLoaded = setInterval(function() {
    if (document.querySelector(".y3") !== null) {
      clearInterval(windowLoaded);
      const td = document.querySelector(".y3");
      const emailAddress = document.querySelector(".gD").attributes.email
        .nodeValue;
      addInfoToEmail(td, emailAddress);
    }
  }, 100);
}

// Update the side column with data from other correspondants
function updateInfoOnHover() {
  // When hovering on senders
  const senders = document.querySelectorAll(".gD");
  senders.forEach((sender) => {
    sender.addEventListener("mouseover", () => {
      const email = sender.attributes.email.nodeValue;
      if (addressIsDifferent(email)) {
        const td = document.querySelector(".y3");
        addInfoToEmail(td, email);
      }
    });
  });

  // When hovering on header's email addresses
  const receivers = document.querySelectorAll(".g2");
  receivers.forEach((receiver) => {
    receiver.addEventListener("mouseover", (e) => {
      const email = e.target.attributes.email.value;
      if (addressIsDifferent(email)) {
        const td = document.querySelector(".y3");
        addInfoToEmail(td, email);
      }
    });
  });

  // When hovering on email's body addresses
  const trailingEmails = document.querySelectorAll(".gmail_quote a");
  trailingEmails.forEach((link) => {
    link.addEventListener("mouseover", (e) => {
      const email = link.innerHTML;
      if (addressIsDifferent(email)) {
        const td = document.querySelector(".y3");
        if (email.includes("@")) {
          addInfoToEmail(td, email);
        }
      }
    });
  });
}

// Listen for page changes and execute the logic
let currentUrl = document.location.href;
checkWindowLoaded();
setInterval(function() {
  if (document.location.href != currentUrl) {
    currentUrl = document.location.href;
    checkWindowLoaded();
    updateInfoOnHover();
  }
}, 500);
