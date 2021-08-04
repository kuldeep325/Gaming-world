"use strict";
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
let buttonsDOM = [];


//end of test

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('./games.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
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
            document.write(`<h1 style="margin-top: 40vh; text-align: center">Sorry! <br>File not found${error}</h1>`)
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

                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <div class="product-tile">
                <p>24/07/21</p>
                <h3>${product.Title}</h3>
                <h4>$${product.Price}</h4>
                <p>${product.Genre}</p>
            </div>
        </article>
            `
        });
        productsDOM.innerHTML = result;
    }
    addToCartBtns() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }

            button.addEventListener('click', (e) => {
                e.target.innerHTML = "In Cart";
                e.target.disabled = true;
                // get product from products
                let cartItem = { ...Storage.getProducts(id), amount: 1 };
                // add the product to cart
                cart = [...cart, cartItem]
                // save cart in the local storage
                Storage.saveCart(cart)
            })

        });
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProducts(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI()
    const products = new Products();
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products)
    }).then(() => {
        ui.addToCartBtns();
    })

})

// log in
$(document).ready(function () {

    $("#signup-form").submit(function () {
        var nm1 = $("#name1").val();
        var ps1 = $("#pass1").val();
        localStorage.setItem("n1", nm1);
        localStorage.setItem("p1", ps1);

    });
    $("#login-form").submit(function () {
        var enteredName = $("#name2").val();
        var enteredPass = $("#pass2").val();

        var storedName = localStorage.getItem("n1");
        var storedPass = localStorage.getItem("p1");

        if (enteredName == storedName && enteredPass == storedPass) {
            window.location.href = "www.google.com"
            // alert('hello')
        }
        else {
            alert("Invalid Input, Please try with correct credentials!");
        }

    });



});

// model
document.getElementById('button').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = "flex";
    document.querySelector('body').style.overflow = "hidden";
    document.querySelector('body').style.background = "black";
});

document.querySelector('.close').addEventListener("click", function () {
    document.querySelector('.bg-modal').style.display = "none";
    document.querySelector('body').style.overflow = "auto";
});