

// Créer un bouton ajouter au panier en utilisant le localstorage

//transfer du produit de la page produit à la page panier
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

// Récuperer le produit via l'api fetch grâce à l'url de l'api et l'id du produit
/*let params = new URLSearchParams(window.location.search);
let productID = params.get("id");
console.log(productID);*/

// récuper l'id des produits séléctionnées
let products = [];
for (product of productInLocalStorage) {
  products.push(product._id);
}
console.log(products);


if (productInLocalStorage === null) {
  console.log("Votre panier est vide.");
} else {
  let cartElement = [];
  
  fetch('http://localhost:3000/api/products/' + product._id)
  .then(data => data.json())
  .then(product => {
  for (j = 0; j < productInLocalStorage.length; j++) {
    cartElement = cartElement + ` 
        <section id="cart__items">
          <article class="cart__item" data-id="${productInLocalStorage[j]._id}" data-color="${productInLocalStorage[j].color}">
            <div class="cart__item__img">
              <img src="${productInLocalStorage[j].image}" alt="${productInLocalStorage[j].altTxt}">
            </div>
            <div class="cart__item__content">
              <div class=${productInLocalStorage[j].description}>
                <h2>${productInLocalStorage[j].name}</h2>
                <p>${productInLocalStorage[j].color}</p>

    
                <p>${product.price * productInLocalStorage[j].quantity}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>    
                </div>
              </div>
            </div>
          </article>  `;
  
  }


  let cartTotal = [];
  let cartTotalPrice = [];
  for (let k = 0; k < productInLocalStorage.length; k++) {
    cartTotal.push(product.price * productInLocalStorage[k].quantity);
    const addPreviousValueWithCurrentValue = (previousValue, currentValue) => previousValue + currentValue;
    cartTotalPrice = cartTotal.reduce(addPreviousValueWithCurrentValue)
  };
  cartTotalElement =
    ` <div class="cart__price">
      <p>Total (<span id="totalQuantity"></span> articles) : <span id="totalPrice">${cartTotalPrice}</span>€</p>
    </div>  `;
  //console.log(cartTotalPrice);


  let fileInformationData = ` <div class="cart__order">
  <form method="get" class="cart__order__form">
    <div class="cart__order__form__question">
      <label for="firstName">Prénom: </label>
      <input type="text" name="firstName" id="firstName" required>
      <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
    </div>
    <div class="cart__order__form__question">
      <label for="lastName">Nom: </label>
      <input type="text" name="lastName" id="lastName" required>
      <p id="lastNameErrorMsg"></p>
    </div>
    <div class="cart__order__form__question">
      <label for="address">Adresse: </label>
      <input type="text" name="address" id="address" required>
      <p id="addressErrorMsg"></p>
    </div>
    <div class="cart__order__form__question">
      <label for="city">Ville: </label>
      <input type="text" name="city" id="city" required>
      <p id="cityErrorMsg"></p> 
    </div>
    <div class="cart__order__form__question">
      <label for="email">Email: </label>
      <input type="email" name="email" id="email" required>
      <p id="emailErrorMsg"></p>
    </div>
    <div class="cart__order__form__submit">
      <input type="submit" value="Commander !" id="order">
    </div>
  </form>
 </div> `

  let allCartElement = cartElement + cartTotalElement + fileInformationData;
  document.querySelector(".cart").innerHTML = allCartElement;

   // Récupération du total des quantités
   let quantityValue = document.getElementsByClassName('itemQuantity');
   totalQuantityValue = 0;

   for (let i = 0; i < quantityValue.length; ++i) {
       totalQuantityValue += quantityValue[i].valueAsNumber;
   }

   let productTotalQuantity = document.getElementById('totalQuantity');
   productTotalQuantity.innerHTML = totalQuantityValue;
   console.log(totalQuantityValue);
  
  //modifier les quantités
  // Je récupere tout les noeux itemQuantity
  // je change la quantité de productInLocalStorage par la valeur de la quantité changé
  // Je remets productInLocalStorage dans le localstorage
  let quantitiesInput = document.querySelectorAll(".itemQuantity");
  for (let m = 0; m < quantitiesInput.length; m++) {
    quantitiesInput[m].addEventListener("change", (event) => {
      event.preventDefault();
      let inputModification = productInLocalStorage[m].quantity;
      let inputModificationValue = quantitiesInput[m].value;
      const resultQuantity = productInLocalStorage.find(el => el.inputModificationValue !== inputModification);
      resultQuantity.quantity = inputModificationValue;
      productInLocalStorage[m].quantity = resultQuantity.quantity;
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      //recharger la page
      location.reload();
    })
  }
  /*  let quantitiesInput = document.querySelectorAll(".itemQuantity");
      quantitiesInput.forEach((quantityInput, m) => {
      this.addEventListener("change", (e) => {
        e.preventDefault();
        productInLocalStorage[m].quantity = quantityInput.value;
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        //recharger la page
        location.reload();
      });
    });*/

  // écouter le bouton supprimer
  let deleteItemButton = document.querySelectorAll(".deleteItem");
  //console.log(deleteItemButton);
  for (let l = 0; l < deleteItemButton.length; l++) {
    deleteItemButton[l].addEventListener("click", (event) => {
      event.preventDefault();

      let suppressionButton = productInLocalStorage[l]._id;
      let colorSuppression = productInLocalStorage[l].color;
      console.log("suppressionButton");
      console.log("colorSuppression");
      //méthode filter
      productInLocalStorage = productInLocalStorage.filter(el => el._id !== suppressionButton || el.color !== colorSuppression);
      //console.log(productInLocalStorage);
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      //recharger la page
      location.reload();
    })
  }
  //Récuperter les valeurs du formulaires existant
  let cartForm = document.querySelector(".cart__order__form");
  cartForm.firstName.addEventListener('change', function () {
    validFirstName(this);
  });
  const validFirstName = function (inputFirstName) {
    let firstNameRegExp = new RegExp(`^[a-zA-Z,-]+$`, 'g');
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (testFirstName) {
      firstNameErrorMsg.innerHTML = ''
    }
    else {
      (firstNameErrorMsg.innerHTML = 'Prénom non valide')
    }
  };

  cartForm.lastName.addEventListener('change', function () {
    validLasttName(this);
  });
  const validLasttName = function (inputLastName) {
    let lastNameRegExp = new RegExp(`^[a-zA-Z,-]+$`, 'g');
    let testLastName = lastNameRegExp.test(inputLastName.value);
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (testLastName) {
      lastNameErrorMsg.innerHTML = ''
    }
    else {
      (lastNameErrorMsg.innerHTML = 'Nom non valide')
    }
  };

  cartForm.address.addEventListener('change', function () {
    validAddress(this);
  });
  const validAddress = function (inputAddress) {
    let addressRegExp = new RegExp(`^[0-9]+[ |[a-zà-ú.,-]+$`, 'g');
    let testAddress = addressRegExp.test(inputAddress.value);
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (testAddress) {
      addressErrorMsg.innerHTML = ''
    }
    else {
      (addressErrorMsg.innerHTML = 'Adresse non valide')
    }
  };

  cartForm.city.addEventListener('change', function () {
    validCity(this);
  });
  const validCity = function (inputCity) {
    let cityRegExp = new RegExp(`^[a-zA-Z,-]{3,}$`, 'g');
    let testCity = cityRegExp.test(inputCity.value);
    let cityErrorMsg = inputCity.nextElementSibling;
    if (testCity) {
      cityErrorMsg.innerHTML = ''
    }
    else {
      (cityErrorMsg.innerHTML = 'Nom de la ville non valide')
    }
  };

  cartForm.email.addEventListener('change', function () {
    validEmail(this);
  });
  const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(`^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`, 'g');
    let testEmail = emailRegExp.test(inputEmail.value);
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (testEmail) {
      emailErrorMsg.innerHTML = ''
    }
    else {
      //emailErrorMsg.innerHTML = 'Email non valide'
      (emailErrorMsg.innerHTML = 'Email non valide')
    }
  };

  //Rentrer les donner du Formulaire dans le localstorage 

  let sentFileButton = document.querySelector("#order")
  sentFileButton.addEventListener("click", (event) => {
    event.preventDefault();
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    }
    console.log(contact)

    // Validation du formulaire pour le localstorage
    localStorage.setItem("fileElement", JSON.stringify(contact));

    // Objet rassemblant les produits sélectionnées et le formulaire validé
    const submitButton = {
      contact,
      products
    };
    console.log("submitButton", JSON.stringify(submitButton));
    
  
   
    // Envoyer le localstorage avec fetch en méthode post
    let orderButton = fetch('http://localhost:3000/api/products/order', {
      method: "POST",
      body: JSON.stringify(submitButton),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success', data)
        localStorage.setItem("orderId", data.orderId)
        window.location = "confirmation.html";
      })
      .catch((error) => {
        console.error('Error', error)
      })
    console.log(orderButton);

  });
})
};
