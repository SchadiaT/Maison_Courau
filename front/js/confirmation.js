

// Récuperer l'id de la commande
let orderId = localStorage.getItem("orderId");

//la structure HTML de la page 
let confirmationValidation = ` <div class="confirmation">
<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- -->${orderId}</span></p>
</div>

</div> `
document.querySelector(".confirmation").innerHTML = confirmationValidation;

// effacer le localStorage

function removeOrder(key) {
    localStorage.removeItem(key);
};
removeOrder("orderId");
removeOrder("product"); 
