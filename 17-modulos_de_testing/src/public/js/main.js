const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Realizar la solicitud GET
    await fetch("/logout", {
      method: "GET",
    });

    toastr.success("Logout successful!");
    setTimeout(function () {
      location.href = "/login";
    }, 1000);
  } catch (error) {
    toastr.error("An error occurred while logout.");
    console.error("Error logging out:", error);
  }
});
