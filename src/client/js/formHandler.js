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
        document.getElementById("score_tag").innerHTML =
          "Score: " + response.score_tag;
        document.getElementById("agreement").innerHTML =
          "Agreement: " + response.agreement;
        document.getElementById("subjectivity").innerHTML =
          "Subjectivity: " + response.subjectivity;
        document.getElementById("confidence").innerHTML =
          "Confidence: " + response.confidence;
        document.getElementById("irony").innerHTML = "Irony: " + response.irony;
      });
  } else {
    alert("The URL is not generating a valid response, please try again.");
  }
}

export { handleSubmit };
