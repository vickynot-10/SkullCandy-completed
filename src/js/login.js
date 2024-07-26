let login_password_input = document.getElementById("log-in-password");
let visibleOnLogin = document.getElementById("visible-on");
let visibleOnReg = document.getElementById("visible-on-register");
let register_password_input = document.getElementById("register-password-input");

function visibleOnOff(var1, inputBox, img) {
    if (var1) {
        inputBox.type = "text";
        img.src = "/images/visibility_off.png";
        var1 = false;
    } else {
        inputBox.type = "password";
        img.src = "/images/visibility_on.png";
        var1 = true;
    }
}
let a = true;
let b = true;
visibleOnLogin.addEventListener("click", () => {
    visibleOnOff(a, login_password_input, visibleOnLogin)
    a = !a
})
visibleOnReg.addEventListener("click", () => {
    visibleOnOff(b, register_password_input, visibleOnReg)
    b = !b
})