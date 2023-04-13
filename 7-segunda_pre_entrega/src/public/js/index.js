// Index para el home con websocket
const socket = io();

socket.on("products", (products) => {
  if (products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList = "card m-1";
      productElement.style = "width: 14rem";
      productElement.innerHTML = `
      <div class="my-1">
        <div class="text-center"><img class="thumb" src="${product.thumbnails}" alt="${product.title}}"/></div>
        <div class="p-2 text-center">
          <h5 class="h5">${product.title}</h5>
          <p>${product.description}</p>
          <p>Price: <span class="text-success">$${product.price}</span>  |  Stock: ${product.stock}</p>
          <p></p>
          <button class="btn btn-danger" id="deleteButton-${product.id}">X</button>
        </div>
      </div>
      `;

      const deleteButton = productElement.querySelector(
        `#deleteButton-${product.id}`
      );
      deleteButton.addEventListener("click", () => {
        socket.emit("deleteProduct", { id: product.id });
      });

      productsContainer.appendChild(productElement);
    });
  }
});

const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success === "Success") {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-success" role="alert">
            ${data.response}
          </div>
        `;
        form.reset();
      } else {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-danger" role="alert">
          Error creating the product.
          </div>
        `;
      }
    } else {
      throw new Error("Failed to create product.");
    }
  } catch (error) {
    document.getElementById("result").innerHTML = `
      <div class="alert alert-danger" role="alert">
      Error creating the product. Error: ${error}
      </div>
    `;
  }
});

socket.on("productCreated", (result) => {
  const resultDiv = document.getElementById("result");
  if (result.success) {
    resultDiv.innerHTML = "Product added successfully";
  } else {
    resultDiv.innerHTML = "Unable to create product: " + result.error;
  }
});
