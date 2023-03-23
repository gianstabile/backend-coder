//index para el home con websocket
const socket = io();

socket.on("products", (products) => {
  if (products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList = "card m-2";
      productElement.style = "width: 18rem";
      productElement.innerHTML = `
      <div class="p-3 text-center">
        <h5 class="h5">${product.title}</h5>
        <p>${product.description}</p>
        <p>Price: <span class="text-success">$${product.price}</span>  |  Stock: ${product.stock}</p>
        <p></p>
        <button class="btn btn-danger" id="deleteButton-${product.id}">X</button>
      </div>
      `;

      const deleteButton = productElement.querySelector(
        `#deleteButton-${product.id}`
      );
      deleteButton.addEventListener("click", () => {
        socket.emit("deleteProduct", { id: product.id });
      });

      product.thumbnails.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = product.title;
        imgElement.classList = "thumb img-thumbnail";
        productElement.appendChild(imgElement);
      });
      productsContainer.appendChild(productElement);
    });
  }
});

const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("/api/products", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Success") {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-success" role="alert">
            ${data.response}
          </div>
        `;
        form.reset();
      } else {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-danger" role="alert">
            Error al crear el producto
          </div>
        `;
      }
    })
    .catch((error) => {
      document.getElementById("result").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error al crear el producto. Error: ${error}
        </div>
      `;
    });
});

socket.on("productCreated", (result) => {
  const resultDiv = document.getElementById("result");
  if (result.success) {
    resultDiv.innerHTML = "Product added succesfully";
  } else {
    resultDiv.innerHTML = "Unable to create product: " + result.error;
  }
});
