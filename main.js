"use strict";
//variables
const body = document.querySelector('body');
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const loginBtn = document.querySelector(".login-button")
const loginModal = document.querySelector('.login-modal')
const loginClose = document.querySelector('.login-close')
const forgotPass = document.querySelector('.pass');
const forgotPassClose = document.querySelector('.forgot-close')
const signupModal = document.querySelector(".signup_link");
const account = document.querySelector(".account_name");
const userName = document.querySelector(".userName");
const signoutbtn = document.querySelector('.signoutbtn');
// cart
let cart = [];
let buttonsDOM = [];
let loginStatus = false;

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
        var email = $("#email").val();
        var ps1confirm = $("#confirmPass").val();
        if ((nm1.length > 0 && ps1.length > 0) && (ps1 === ps1confirm)) {
            document.getElementById('signup-form').innerHTML = "";
            document.getElementById('signupHead').innerHTML = `<p>Signup successful</p><br><p>Please login!</p> `
            localStorage.setItem("username", nm1);
            localStorage.setItem("password", ps1);
            localStorage.setItem("email", email);
        }
        else if (ps1 !== ps1confirm) {
            alert("password not matched")
        }
        else {
            alert("please input username and password", nm1)
        }


    });
    $("#login-form").submit(function () {
        var enteredName = $("#name2").val();
        var enteredPass = $("#pass2").val();
        var storedName = localStorage.getItem("username");
        var storedPass = localStorage.getItem("password");

        if (enteredName == storedName && enteredPass == storedPass) {
            loginBtn.style.display = "none";
            account.style.display = "flex";
            userName.innerHTML = enteredName;
            loginStatus = true;
            closeLogin();
        }
        else {

            document.querySelector('.error').style.display = "block"
            setTimeout(function () {
                document.querySelector('.error').style.display = "none"
            }, 3000)
        }

    });
    $("#forgotPassword").submit(function () {
        var RegisteredEmail = localStorage.getItem("email")
        var ForgotPassEmail = $("#email").val();
        if (ForgotPassEmail === RegisteredEmail) {

        }
    })
});

// event click
loginBtn.addEventListener("click", login);
signupModal.addEventListener("click", signUp);
forgotPass.addEventListener('click', forgotPassModal);
signoutbtn.addEventListener('click', signout)

// event close
loginClose.addEventListener("click", closeLogin);
document.querySelector('.signup-close').addEventListener("click", closesignUp);
forgotPassClose.addEventListener("click", closeForgotPass);

// close modal
function closeLogin() {
    loginModal.style.display = "none";
    document.querySelector('.pass-modal').style.display = "none";
    body.style.overflow = "auto";
    document.querySelector('.products').style.display = 'block';
}
function closeForgotPass() {

    document.querySelector('.pass-modal').style.display = "none";
    body.style.overflow = "auto";
    document.querySelector('.products').style.display = 'block';
}
function closesignUp() {
    document.querySelector('.signup-modal').style.display = "none";
    body.style.overflow = "auto";
    document.querySelector('.products').style.display = 'block';
}
// login modal
function login() {
    loginModal.style.display = "flex";
    document.querySelector('.signup-modal').style.display = "none";
    body.style.overflow = "hidden";
    document.querySelector('.products').style.display = 'none';
}
// 
function signUp() {
    body.style.overflow = "none";
    loginModal.style.display = "none";
    document.querySelector('.pass-modal').style.display = "none";
    document.querySelector('.products').style.display = 'none';
    document.querySelector('.signup-modal').style.display = "flex";
}

// forgot pass modal
function forgotPassModal() {
    loginModal.style.display = "none";
    document.querySelector('.pass-modal').style.display = "flex";
}

function signout() {
    loginBtn.style.display = "flex";
    account.style.display = "none";
}

