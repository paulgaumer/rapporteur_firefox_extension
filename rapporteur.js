// UTILITIES
let activeAddress = null;

function cleanColumn(target) {
  document.querySelectorAll(target).forEach((el) => {
    el.remove();
  });
}

function addressIsDifferent(newAddress) {
  return newAddress !== activeAddress;
}

// Check if the user is already logged to his Linkedin account
function checkIfUserSignedIn() {
  const logInButton = document.querySelector("#lfgLogin");
  if (logInButton) {
    logInButton.insertAdjacentHTML(
      "afterend",
      `<a href="https://www.linkedin.com/uas/login" target="_blank" style="text-decoration: none">
        <div style="color: white; background-color: #0077b5; padding: 3px 16px; margin: 20px 0; cursor: pointer; font-size: 15px; border-radius: 2px; display: inline-block;" class="sign-in-button">Sign In</div>
      </a>
      <span style="font-size:11px;">then refresh the page</span>`
    );
    logInButton.remove()
  }
}
// Fetch data using the email address and display them in the side column
function addInfoToEmail(email) {
  fetch(`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`)
    .then((response) => response.text())
    .then((data) => {
      activeAddress = email;
      cleanColumn(".rapporteur-data");
      document
        .querySelector(".y3")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="rapporteur-data">${data}</div>`
        );
      checkIfUserSignedIn();
    })
    .catch((error) => console.error(error));
}

// Wait for the needed DOM elements to be loaded and available
function checkWindowLoaded() {
  const windowLoaded = setInterval(function() {
    if (document.querySelector(".y3") !== null) {
      clearInterval(windowLoaded);
      const emailAddress = document.querySelector(".gD").attributes.email
        .nodeValue;
      addInfoToEmail(emailAddress);
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
        addInfoToEmail(email);
      }
    });
  });

  // When hovering on header's email addresses
  const receivers = document.querySelectorAll(".g2");
  receivers.forEach((receiver) => {
    receiver.addEventListener("mouseover", (e) => {
      const email = e.target.attributes.email.value;
      if (addressIsDifferent(email)) {
        addInfoToEmail(email);
      }
    });
  });

  // When hovering on email's body addresses
  const trailingEmails = document.querySelectorAll(".gmail_quote a");
  trailingEmails.forEach((link) => {
    link.addEventListener("mouseover", (e) => {
      const email = link.innerHTML;
      if (addressIsDifferent(email)) {
        if (email.includes("@")) {
          addInfoToEmail(email);
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
