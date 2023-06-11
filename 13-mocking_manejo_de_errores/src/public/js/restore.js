const form = document.getElementById("passRestoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  try {
    let response = await fetch("/api/sessions/restore", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();
    console.log(result);

    if (result.status === "success") {
      toastr.success("Password successfully changed!");
      setTimeout(function () {
        location.href = "/login";
      }, 1500);
    } else {
      toastr.error("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
