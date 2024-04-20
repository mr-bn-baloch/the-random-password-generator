const password = document.getElementById("pswrd")
const range = document.querySelector(".form-range")
const passwordLength = document.getElementById("length")
const strength = document.querySelector(".strength-meter")
const upCheckbox = document.getElementById("uppercase")
const lpCheckbox = document.getElementById("lowercase")
const numCheckbox = document.getElementById("numbers")
const symbCheckbox = document.getElementById("symbols")


range.addEventListener("input", function () {
    passwordLength.innerText = range.value
})

let strengthCounter = -1

function renderstrength() {
    let primaryColor = "#000000"
    let secondaryColor = "#52f065"
    let innerhtml = ""

    if (strengthCounter >= 0) {
        for (let i = 0; i <= strengthCounter; i++) {
            innerhtml += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="18" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,0,24)"><path d="M0 5h24v14H0z" fill=${secondaryColor} opacity="1" data-original="#000000" class=""></path></g></svg><br>`
        }
        for (let i = 0; i < 4 - strengthCounter - 1; i++) {
            innerhtml += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="18" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,0,24)"><path d="M0 5h24v14H0z" fill=${primaryColor} opacity="1" data-original="#000000" class=""></path></g></svg><br>`
        }

    }
    else {
        for (let i = 0; i < 4; i++) {
            innerhtml += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="18" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,0,24)"><path d="M0 5h24v14H0z" fill=${primaryColor} opacity="1" data-original="#000000" class=""></path></g></svg><br>`
        }
    }

    strength.innerHTML = innerhtml;
}

renderstrength()

function lengthDecider() {
    let temp = ""

    if (passwordLength.innerText == "8") {
        temp = 8
    }
    else {
        temp = passwordLength.innerText
    }
    return temp
}

let upcString = ""
function randUpLetters() {
    if (upCheckbox.ariaChecked == "no") {
        upCheckbox.ariaChecked = "yes"
        for (let i = 0; i < lengthDecider(); i++) {
            upcString += String.fromCharCode(Math.floor((Math.random() * (91 - 65)) + 65))
        }
        strengthCounter++
    }
    else {
        upCheckbox.ariaChecked = "no"
        strengthCounter--
        upcString = ""
    }
    renderstrength()
    return upcString
}

let lwcString = ""
function randLpLetters() {
    if (lpCheckbox.ariaChecked == "no") {
        lpCheckbox.ariaChecked = "yes"
        for (let i = 0; i < lengthDecider(); i++) {
            lwcString += String.fromCharCode(Math.floor((Math.random() * (118 - 97)) + 97))
        }
        strengthCounter++
    }
    else {
        lpCheckbox.ariaChecked = "no"
        lwcString = ""
        strengthCounter--
    }
    renderstrength()
    return lwcString
}

let nums = ""
function randNumbers() {
    if (numCheckbox.ariaChecked == "no") {
        numCheckbox.ariaChecked = "yes"
        for (let i = 0; i < lengthDecider(); i++) {
            nums += Math.floor(Math.random() * 10)
        }
        strengthCounter++
    }
    else {
        numCheckbox.ariaChecked = "no"
        nums = ""
        strengthCounter--
    }
    renderstrength()
    return nums
}

let symbols = ""
function randSymbols() {
    symbols = ""
    if (symbCheckbox.ariaChecked == "no") {
        symbCheckbox.ariaChecked = "yes"
        for (let i = 0; i < lengthDecider(); i++) {
            symbols += String.fromCharCode(Math.floor(Math.random() * (96 - 92)) + 92)
        }
        strengthCounter++
    }
    else {
        symbCheckbox.ariaChecked = "no"
        symbols = ""
        strengthCounter--
    }
    renderstrength()
    return symbols
}

let pswrd = password.innerText
let tempPswrd = password.innerText
let temp = ""
function generatePassword() {

    if (upcString == "" && lwcString == "" && nums == "" && symbols == "" && upCheckbox.ariaChecked == "no" && lpCheckbox.ariaChecked == "no" && symbCheckbox.ariaChecked == "no" && numCheckbox.ariaChecked == "no") {
        strengthCounter = -1
        alert("Please select the validations for your password!")
    }
    temp = ""
    if (upCheckbox.ariaChecked == "yes") {
        temp = upcString
        requiredPassword()
    }
    else if (lpCheckbox.ariaChecked == "yes") {
        temp = lwcString
        requiredPassword()
    }
    else if (numCheckbox.ariaChecked == "yes") {
        temp = nums
        requiredPassword()
    }
    else if (symbCheckbox.ariaChecked == "yes") {
        temp = symbols
        requiredPassword()
    }

    pswrd = ""

    if (temp != "") {
        for (let i = 0; i < lengthDecider(); i++) {
            index = Math.floor(Math.random() * temp.length)
            pswrd += temp[index]
        }
    }
    else {
        pswrd = tempPswrd
    }

    password.innerHTML = `${pswrd} <i onclick=iconChanger() class="fa-regular fa-copy" data-bs-toggle="tooltip" title="Copy!"> </i>`
}

function requiredPassword() {
    if (lpCheckbox.ariaChecked == "yes") {
        temp += lwcString
    }
    if (numCheckbox.ariaChecked == "yes") {
        temp += nums
    }
    if (symbCheckbox.ariaChecked == "yes") {
        temp += symbols
    }
}

function iconChanger() {
    // Clipboard API
    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(password.innerText);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    copyContent()
    password.innerHTML = `${pswrd} <i class="fa-solid fa-copy data-bs-toggle="tooltip" data-bs-placement="top" title="Copied!""></i>`
}