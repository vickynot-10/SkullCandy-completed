let shopLink = document.getElementById("shop");
let shopLinkHover = document.getElementById("shop-hover-details");
let insideSkull = document.getElementById("inside-skull");
let insideSkullDetails = document.getElementById("inside-skull-details");

let timeoutId

let Addtocartbtn = document.querySelectorAll('#Add-to-cart');

let listProducts;

function GetLocalStorage() {
    let addCartLocal3 = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartScreen1 = document.getElementById("cart-screen");

    if (addCartLocal3.length <= 0) {
        let pEl = document.createElement("p");
        pEl.innerHTML = "Your bag is empty";
        pEl.id = 'emptybagtext';
        cartScreen1.appendChild(pEl)
    } else {
        addCartLocal3.forEach((elem) => {
            getItemstoDisplay(elem)
        })
    }
}

GetLocalStorage()


//fetching JSON in Function 
async function fetchjson() {
    try {
        let data = await fetch('/data/details.json');
        return data
    } catch (e) {
        console.log(e)
    }

}
fetchjson()






let productItems = []

Addtocartbtn.forEach(button => {
    button.addEventListener("click", () => {
        let parentElbuyNow = button.parentElement;
        let productName = parentElbuyNow.querySelector('p')
        let ElemId = productName.id
        button.innerHTML = "Added"
        productItems.push(ElemId)
        DisplayItems(ElemId)
    })
})


let buyNowButton = document.querySelectorAll("#headphone-buy-btns");
buyNowButton.forEach(button => {
    button.addEventListener("click", () => {
        let parentElbuyNow = button.parentElement;
        let productName = parentElbuyNow.querySelector('p')
        let ElemId = productName.id;
        location.href = `/buynow?id=${ElemId}`;
    })
})


async function DisplayItems(id) {

    let addCartLocal = JSON.parse(localStorage.getItem("cartItems")) || [];

    let positionIndex = addCartLocal.findIndex((value) => value == id)

    if (positionIndex != -1) {
        alert("Already in cart-bag");
    } else {
        let addCartLocal1 = JSON.parse(localStorage.getItem("cartItems")) || [];
        addCartLocal1.push(id);
        getItemstoDisplay(id)
        localStorage.setItem("cartItems", JSON.stringify(addCartLocal1))
    }


}

function getItemstoDisplay(id) {
    let Elid = id;
    if (window.location.pathname === '/cart') {
        let cartSingleItem = document.getElementById("cart-single-item");
        DisplayLocalItems(Elid, cartSingleItem);
    } else {
        let cartScreen = document.getElementById("cart-screen");
        DisplayLocalItems(Elid, cartScreen)
    }
}

async function DisplayLocalItems(id, screen) {
    try {
        let data_id = id;
        let ElScreen = screen;
        console.log(ElScreen)
        let data = await fetchjson()
        listProducts = await data.json()

        let cartItems = document.createElement("div");


        cartItems.id = "cart-items";
        cartItems.innerHTML = `
        <img id="hp-img" src="${listProducts[id - 1].image}" >
        <p class='productid' id="${listProducts[id - 1].id}">${listProducts[id - 1].name}</p> 
        <p id="price">${listProducts[id - 1].price}</p> 
        `;


        let quantity = document.createElement("div");
        quantity.id = "quantity";
        quantity.innerHTML = `
    <button id="decrease-quantity" >-</button>
    <span id="quantity-value">0</span>
    <button id="increase-quantity">+</button>    
    `

        let decreaseBtn = quantity.querySelector('#decrease-quantity')
        let increaseBtn = quantity.querySelector('#increase-quantity')

        decreaseBtn.addEventListener("click", DecreaseQuantity)
        increaseBtn.addEventListener("click", IncreaseQuantity)


        let quantityCost = document.createElement("span");
        quantityCost.innerHTML = 0;
        quantityCost.id = "cost"
        let but3 = document.createElement("button");
        but3.id = "buyfromcart";
        but3.textContent = "Buy";



        let deleteCart = document.createElement('img');
        deleteCart.src = './images/delete.png';
        deleteCart.id = "delete-cart";
        deleteCart.onclick = DeleteCart

        cartItems.appendChild(quantity)
        cartItems.appendChild(quantityCost)
        cartItems.appendChild(but3)
        cartItems.appendChild(deleteCart)
        screen.appendChild(cartItems)
        let buyfromcartbtn = cartItems.querySelector('#buyfromcart');
        buyfromcartbtn.addEventListener("click", () => {
            location.href = `/buynow?id=${data_id}`;
        })
    } catch (e) {
        console.log(e)
    }
}



function IncreaseQuantity(event) {
    let currentEl = event.target.parentElement
    let quantityValue = currentEl.parentElement.querySelector('#quantity-value');
    let quantityCost = currentEl.parentElement.querySelector('#cost');
    let individualCost = currentEl.parentElement.querySelector('#price');
    let quantityValueNumber = parseInt(quantityValue.innerHTML);
    let individualCostNumber = parseInt(individualCost.innerHTML);
    if (quantityValueNumber >= 0 && quantityValueNumber <= 30) {
        quantityValueNumber += 1;
        quantityValue.innerHTML = quantityValueNumber;
        quantityCost.innerHTML = quantityValueNumber * individualCostNumber
    }
}

function DecreaseQuantity(event) {
    let currentEl = event.target.parentElement
    let quantityValue = currentEl.parentElement.querySelector('#quantity-value');
    let quantityCost = currentEl.parentElement.querySelector('#cost');
    let individualCost = currentEl.parentElement.querySelector('#price');
    let quantityValueNumber = parseInt(quantityValue.innerHTML);
    let individualCostNumber = parseInt(individualCost.innerHTML);

    if (quantityValueNumber > 0 && quantityValueNumber <= 30) {
        quantityValueNumber -= 1;
        quantityValue.innerHTML = quantityValueNumber;
        quantityCost.innerHTML = quantityValueNumber * individualCostNumber


    }
}

function DeleteCart(e) {
    let elem = e.target.parentElement;
    let RemovefromLocal = elem.querySelector("p").id;
    if (confirm("Are u sure that want to remove this item from cart ? ")) {
        let cartItemsLoc = JSON.parse(localStorage.getItem("cartItems"));
        let index = cartItemsLoc.findIndex(value => value === RemovefromLocal)
        if (index != -1) {
            cartItemsLoc.splice(index, 1)
            elem.remove()
            localStorage.setItem("cartItems", JSON.stringify(cartItemsLoc))
        }
    }
}


let cartScreen = document.getElementById("cart-screen");
let cartCancel = document.getElementById("close-icon");
let cartLogo = document.getElementById("cart-logo");

cartScreen.addEventListener("mouseleave", () => {
    cartScreen.style.animation = "QuantityTabClose 0.3s linear forwards";
})
cartCancel.addEventListener("click", () => {
    cartScreen.style.animation = "QuantityTabClose 0.3s linear forwards";
})
cartLogo.addEventListener("click", () => {
    cartScreen.style.animation = "QuantityTabOpen 0.3s linear forwards";
})

insideSkull.addEventListener("mouseenter", () => {
    insideSkullDetails.style.display = "block";
    shopLinkHover.style.display = "none";
    clearTimeout(timeoutId)
})

shopLink.addEventListener("mouseenter", () => {
    shopLinkHover.style.display = "block";
    insideSkullDetails.style.display = "none";
    clearTimeout(timeoutId)
});

shopLink.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
        shopLinkHover.style.display = "none";
    }, 500)
})

insideSkull.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
        insideSkullDetails.style.display = "none";
    }, 500)
})

shopLinkHover.addEventListener("mouseenter", () => {
    shopLinkHover.style.display = "block";
    clearTimeout(timeoutId)
})
shopLinkHover.addEventListener("mouseleave", () => {
    shopLinkHover.style.display = "none";
})
insideSkullDetails.addEventListener("mouseenter", () => {
    insideSkullDetails.style.display = "block";
    clearTimeout(timeoutId);
})

insideSkullDetails.addEventListener("mouseleave", () => {
    insideSkullDetails.style.display = "none";

})


let close = document.getElementById("close-opt");
let optionScreen = document.getElementById("options-screen");
close.addEventListener("click", () => {
    optionScreen.style.animation = "slideLeft 0.3s linear forwards";
})

let optionsBtn = document.getElementById("options-btn");
optionsBtn.addEventListener("click", () => {
    optionScreen.style.animation = "slideRight 0.3s linear forwards";
})

optionScreen.addEventListener("mouseleave", () => {
    optionScreen.style.animation = "slideLeft 0.3s linear forwards";
})

let cartDirect = document.getElementById("cart-direct");
cartDirect.addEventListener("click", () => {
    location.href = "/cart";
})