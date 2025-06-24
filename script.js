function sendRequest() {
  const prompt = document.getElementById("prompt").value;
  const fileInput = document.getElementById("fileInput").files[0];

  if (!prompt || !fileInput) {
    alert("Please enter prompt and select a file!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const fileContent = reader.result;

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, fileContent }),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("output").textContent = data.generatedCode;
        hljs.highlightAll();
      });
  };
  reader.readAsText(fileInput);
}