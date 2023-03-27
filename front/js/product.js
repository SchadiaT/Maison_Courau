// Récuperer le produit via l'api fetch grâce à l'url de l'api et l'id du produit
let params = new URLSearchParams(window.location.search);
let productID = params.get("id");

// Afficher le produit dans la page product.html
fetch('http://localhost:3000/api/products/' + productID)
  .then(data => data.json())
  .then(productID => {
    let choiceElementName = ` 
    <article>
<div class="item__img">
<img src="${productID.imageUrl}" alt="${productID.altTxt}">
</div>
<div class="item__content">

<div class="item__content__titlePrice">
  <h1 id="title"> ${productID.name} </h1>
  <p>Prix : <span id="price">${productID.price} </span>€</p>
</div>

<div class="item__content__description">
  <p class="item__content__description__title">Description :</p>
  <p id="description"> ${productID.description} </p>
</div>

<div class="item__content__settings">
  <div class="item__content__settings__color">
    <label for="color-select">Choisir une couleur :</label>
    <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>`

    //Début boucle`
    for (let i = 0; i < productID.colors.length; i++) {
      let color = productID.colors[i];
      var choiceElementColor = choiceElementColor +
        `<option value="${color}">${color}</option>`
    }//Fin boucle

    let choiceElementQuantity =
      `</select>
   </div>

  <div class="item__content__settings__quantity">
    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
  </div>
</div>

<div class="item__content__addButton">
  <button id="addToCart">Ajouter au panier</button>
</div>

</div> 
</article>`
    let choiceAllElement = choiceElementName + choiceElementColor + choiceElementQuantity;
    document.querySelector(".item").innerHTML = choiceAllElement;

    // choix de la couleur pour le panier
    let selectColor = document.querySelector("#colors");
    //const selectColor = document.querySelector("#colors");
    //let chosenColor = selectColor.value;
    console.log(selectColor);

    //choix de la quantité
    let productQuantity = document.querySelector("#quantity")


    //Envoyer au panier 
    let addToCartButton = document.querySelector("#addToCart");
    addToCartButton.addEventListener("click", (event) => {
      event.preventDefault();

      /*if (selectColor.value=" ")
        alert('Couleur non renseigné')
      else {
        
      
      console.log(selectColor.value);*/
      // Les données qui doivent être enrégistés dans le panier
      let productSelection = {
        _id: productID._id,
        name: productID.name,
        //price: productID.price * productQuantity.value,
        color: selectColor.value,
        description: productID.description,
        image: productID.imageUrl,
        altTxt: productID.altTxt,
        quantity: productQuantity.value,
      }
      console.log(productSelection);


      //Local Storage pour enregistrer le produit dans le panier

      let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
      console.log(productInLocalStorage);


      // fonction fenetre de validation
      const popupValidation = () => {
        if (window.confirm(`${productID.name} a bien été ajouter au panier
         Consulter le panier OK`)) {
          window.location.href = "cart.html";
        }
      } 
      
        //Importation dans le localStorage
        // si le panier contient déjà un produit 
        if (productInLocalStorage) {
          const sameProductClick = productInLocalStorage.find(
            (el) => el._id === productID._id && el.color === selectColor.value);
          //si le panier contient déjà le produit séléctionné
          if (sameProductClick) {
            let newProductQuantity = parseInt(productSelection.quantity) + parseInt(sameProductClick.quantity);
            sameProductClick.quantity = newProductQuantity;
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            popupValidation();

          }
          else {
            productInLocalStorage.push(productSelection);
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            popupValidation();
          }
          //si le panier est vide 
        } else {
          productInLocalStorage = [];
          productInLocalStorage.push(productSelection);
          localStorage.setItem("product", JSON.stringify(productInLocalStorage))
          popupValidation();
        }
      } 
    );
  })
  ;
