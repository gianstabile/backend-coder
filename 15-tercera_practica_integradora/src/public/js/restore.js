const form = document.getElementById("restoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const response = await fetch("http://localhost:8080/api/restore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    toastr.error("An error occurred while resetting the password.");
    console.error(result.error);
  } else {
    toastr.success("A new reset email has been generated. Please check your inbox.");
    console.log("Reset email has been sent.");
  }
});
