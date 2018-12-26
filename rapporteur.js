// Clean the side column from existing info
function cleanColumn(target) {
  document.querySelectorAll(target).forEach((el) => {
    el.remove();
  });
}

// Fetch data using the email address and display them in the side column
function addInfoToEmail(el, email) {
  fetch(`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`)
    .then((response) => response.text())
    .then((data) => {
      cleanColumn(".rapporteur-data");
      el.insertAdjacentHTML(
        "afterbegin",
        `<div class="rapporteur-data" style="display: none">${data}</div>`
      );
      // Allows the element CSS to load in the background
      setTimeout(() => {
        document.querySelector(".rapporteur-data").style.display = "block";
      }, 200);
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
function updateInfoOnEmailHover() {
  // When hovering on senders
  const senders = document.querySelectorAll(".gD");
  senders.forEach((sender) => {
    sender.addEventListener("mouseover", () => {
      const email = sender.attributes.email.nodeValue;
      const td = document.querySelector(".y3");
      addInfoToEmail(td, email);
    });
  });

  // When hovering on header's email addresses
  const receivers = document.querySelectorAll(".g2");
  receivers.forEach((receiver) => {
    receiver.addEventListener("mouseover", (e) => {
      const email = e.target.attributes.email.value;
      const td = document.querySelector(".y3");
      addInfoToEmail(td, email);
    });
  });

  // When hovering on email's body addresses
  const trailingEmails = document.querySelectorAll(".gmail_quote a");
  trailingEmails.forEach((link) => {
    link.addEventListener("mouseover", (e) => {
      const email = link.innerHTML;
      const td = document.querySelector(".y3");
      if (email.includes("@")) {
        addInfoToEmail(td, email);
      }
    });
  });
}

// Listening for page changes and execute the logic
let currentUrl = document.location.href;
setInterval(function() {
  if (document.location.href != currentUrl) {
    currentUrl = document.location.href;
    checkWindowLoaded();
    updateInfoOnEmailHover();
  }
}, 500);
