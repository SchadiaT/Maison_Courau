
const themeToggler = document.querySelector(".theme-toggler");


// change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler;querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler;querySelector('span:nth-child(2)').classList.toggle('active');
})

class Product {
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct)
    }
}

fetch('http://localhost:3000/api/products/')
.then(data => data.json())
.then(jsonListProduct => {
    for(let jsonProduct of jsonListProduct){
        let product = new Product(jsonProduct);
        document.querySelector('.items').innerHTML += `<a href="./product.html?id=${product._id}">  
                                                        <article> 
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                        </article>
                                                        </a>`
    }
})
let str = "http://127.0.0.1:5500/front/html/index.html?id=productID";
let url = new URL(str);
let param = url.searchParams.get("productID");
console.log(param);