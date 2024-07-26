async function fetchjson() {
    let res = await fetch('data/details.json');
    let data = res.json()
    return data

}


let hp_id = document.getElementById("hp-id").innerHTML;
let hp_id_trim = parseInt(hp_id.trim())

async function loadImgOnBuyNow() {
    let res = await fetchjson();
    let img, name, price, color, tagline;
    res.forEach(element => {
        let id = element.id;
        if (id == hp_id_trim) {
            img = element.image;
            name = element.name;
            price = element.price;
            color = element.color;
            tagline = element.tagline;
        }

    });
    let hp_img = document.getElementById("hp-img-buy");
    let hp_name = document.getElementById("hp-name");
    let hp_price = document.getElementById("hp-price");
    let hp_color = document.getElementById("hp-color");
    let hp_tagline = document.getElementById("hp-tagline");
    let content_div = document.getElementById("contents");
    let hp_img_small = document.getElementById("img-small");




    switch (color.toLowerCase()) {
        case "black":
            content_div.style.backgroundColor = "gray";
            break;
        case "white":
            content_div.style.backgroundColor = "gray";
            break;
        case "gray":
            content_div.style.backgroundColor = "gray";
            break;
        case "glacier":
            content_div.style.backgroundColor = "#82d0d2";
            break;
        case "violet":
            content_div.style.backgroundColor = "#0F67B1";
            break;
        case "green":
            content_div.style.backgroundColor = "#B4E380";
            break;
        case "pink":
            content_div.style.backgroundColor = "#FF69B4";
            break;
        default:
            content_div.style.backgroundColor = color;
            break;
    }
    hp_img.src = img;
    hp_img_small.src = img
    hp_name.innerHTML = name;
    hp_price.innerHTML = parseInt(price);
    hp_color.innerHTML = color;
    hp_tagline.innerHTML = tagline

}
loadImgOnBuyNow()

let homeDirect = document.getElementById("home-direct");
homeDirect.addEventListener("click", () => {
    location.href = '/home';
})

function DifferentReviewNumber() {
    let MathRandom = Math.round((Math.random() * 300) + 1)
    let reviewNumber = document.getElementById("review-number");
    reviewNumber.innerHTML = `${MathRandom}  Reviews `
}
DifferentReviewNumber()