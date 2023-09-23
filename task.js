document.addEventListener("DOMContentLoaded", function () {
    // Находим все элементы с классом "product"
    const products = document.querySelectorAll(".product");
  
    // Находим корзину
    const cart = document.querySelector(".cart__products");
  
    // Обходим все элементы с классом "product"
    products.forEach((product) => {
      // Находим элементы управления количеством
      const quantityControls = product.querySelectorAll(".product__quantity-control");
      const quantityValue = product.querySelector(".product__quantity-value");
      const addToCartButton = product.querySelector(".product__add");
      const productId = product.getAttribute("data-id");
  
      // Обработчик для кнопки увеличения количества товара
      quantityControls[1].addEventListener("click", () => {
        quantityValue.textContent = String(+quantityValue.textContent + 1);
      });
  
      // Обработчик для кнопки уменьшения количества товара
      quantityControls[0].addEventListener("click", () => {
        if (+quantityValue.textContent > 1) {
          quantityValue.textContent = String(+quantityValue.textContent - 1);
        }
      });
  
      // Обработчик для кнопки "Добавить в корзину"
      addToCartButton.addEventListener("click", () => {
        const existingCartItem = cart.querySelector(`[data-id="${productId}"]`);
        const productImageSrc = product.querySelector(".product__image").getAttribute("src");
        const quantity = +quantityValue.textContent;
  
        if (existingCartItem) {
          // Если товар уже есть в корзине, увеличиваем количество
          const cartItemQuantity = existingCartItem.querySelector(".cart__product-count");
          cartItemQuantity.textContent = String(+cartItemQuantity.textContent + quantity);
        } else {
          // Создаем новый элемент корзины
          const cartProduct = document.createElement("div");
          cartProduct.classList.add("cart__product");
          cartProduct.setAttribute("data-id", productId);
  
          const cartProductImage = document.createElement("img");
          cartProductImage.classList.add("cart__product-image");
          cartProductImage.setAttribute("src", productImageSrc);
          cartProduct.appendChild(cartProductImage);
  
          const cartProductCount = document.createElement("div");
          cartProductCount.classList.add("cart__product-count");
          cartProductCount.textContent = String(quantity);
          cartProduct.appendChild(cartProductCount);
  
          cart.appendChild(cartProduct);
        }
      });
    });
  });