//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
// cart
let cart = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('games.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { id } = item.sys;
                const { Title, Price, Release_date, Game_file_size, Genre, Description } = item.fields;
                const image = item.fields.image.fields.file.url;
                return { Title, Price, id, image, Release_date, Game_file_size, Genre, Description }
            })
            return products
        } catch (error) {
            document.write(`<h1 style="margin-top: 40vh; text-align: center">Sorry! <br>File not found</h1>`)
            console.log("File not found", error);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article id="p-scroll" class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">

                <button onclick="clk(${product.id})" class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <div class="product-tile">
                <p>24/07/21</p>
                <h3>${product.Title}</h3>
                <h4>$${product.Price}</h4>
            </div>
        </article>
            `
        });
        productsDOM.innerHTML = result;
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("games", JSON.stringify(products))
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI()
    const products = new Products();
    products.getProducts().then(products => {
        ui.displayProducts(products)

        Storage.saveProducts(products)
    }
    );

})