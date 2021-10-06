function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  const data = {
    formText,
  };
  if (Client.checkForName(formText)) {
    fetch("http://localhost:8081/clientInput", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(function (response) {
        document.getElementById(
          "score_tag"
        ).innerHTML = `Score: <span class = "results">${response.score_tag}</span>`;
        document.getElementById(
          "agreement"
        ).innerHTML = `Agreement: <span class = "results">${response.agreement}</span>`;
        document.getElementById(
          "subjectivity"
        ).innerHTML = `Subjectivity: <span class = "results">${response.subjectivity}</span>`;
        document.getElementById(
          "confidence"
        ).innerHTML = `Confidence: <span class = "results">${response.confidence}</span>`;
        document.getElementById(
          "irony"
        ).innerHTML = `Irony: <span class = "results">${response.irony}</span>`;
      });
  } else {
    alert("The URL is not generating a valid response, please try again.");
  }
}

export { handleSubmit };
