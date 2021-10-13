"use strict";

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let addButton = document.getElementById("addButton");
let nameAlert = document.getElementById("nameAlert");
let priceAlert = document.getElementById("priceAlert");
let categoryAlert = document.getElementById("categoryAlert");
let descriptionAlert = document.getElementById("descriptionAlert");
let deleteNotificationButton = document.getElementById("deleteNotification");
let closeNotificationButton = document.getElementById("closeNotification");
let searchInput = document.getElementById("floatingInput");
let closeButton = document.getElementById("closeButton");
let deleteButton = document.getElementById("deleteButton");
let cancelButton = document.getElementById("cancelButton");
let nameRejex = /^\w{2,9}$/;
let priceRejex = /^([1-9][0-9]{3}|[1-2][0-9]{4}|30000)$/;
let categoryRejex = /^[A-Za-z]{2,9}$/;
let descriptionRejex = /^[A-Za-z ]{2,30}$/;

cancelButton.onclick = cancelUpdate;
productNameInput.onkeyup = nameValidation;
productPriceInput.onkeyup = priceValidation;
productCategoryInput.onkeyup = categoryValidation;
productDescriptionInput.onkeyup = descriptionValidation;
closeButton.onclick = closeNotification;
searchInput.onkeyup = function () { searchProduct(searchInput.value) };
addButton.onclick = addProduct;


let productContainer = [];
if (localStorage.getItem("ourProducts") != null) {
    productContainer = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct();
}

function nameValidation() {
    if (nameRejex.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        removeDisabled();
        return true;
    }

    else {
        addButton.disabled = "true";
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
        return false;
    }

}

function priceValidation() {
    if (priceRejex.test(productPriceInput.value) == true) {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        priceAlert.classList.add("d-none");
        removeDisabled();
        return true;
    }

    else {
        addButton.disabled = "true";
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        priceAlert.classList.remove("d-none");
        return false;
    }
}

function categoryValidation() {
    if (categoryRejex.test(productCategoryInput.value) == true) {
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none");
        removeDisabled();
        return true;
    }

    else {
        addButton.disabled = "true";
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none");
        return false;
    }

}

function descriptionValidation() {
    if (descriptionRejex.test(productDescriptionInput.value) == true) {
        productDescriptionInput.classList.add("is-valid");
        productDescriptionInput.classList.remove("is-invalid");
        descriptionAlert.classList.add("d-none");
        removeDisabled();
        return true;
    }

    else {
        addButton.disabled = "true";
        productDescriptionInput.classList.add("is-invalid");
        productDescriptionInput.classList.remove("is-valid");
        descriptionAlert.classList.remove("d-none");
        return false;
    }
}

function removeDisabled() {
    if (nameRejex.test(productNameInput.value) == true & priceRejex.test(productPriceInput.value) == true & categoryRejex.test(productCategoryInput.value) == true & descriptionRejex.test(productDescriptionInput.value) == true) {
        addButton.removeAttribute("disabled");
    }
}

function addProduct() {

    if (nameValidation() == true & priceValidation() == true & categoryValidation() == true & descriptionValidation() == true) {
        let product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        }
        productContainer.push(product);
        localStorage.setItem("ourProducts", JSON.stringify(productContainer));
        clearForm();
        displayProduct();
        $(".successAlert").animate({ "opacity": "1" }, 500, function () {
            $(".successAlert").animate({ "opacity": "0" }, 500);
        });
        productNameInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-valid");
        productCategoryInput.classList.remove("is-valid");
        productDescriptionInput.classList.remove("is-valid");
        addButton.disabled = "true";

    }
    else {
        nameValidation();
        priceValidation();
        nameValidation();
        descriptionValidation();
    }

}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayProduct() {
    let trs = ``;
    for (let i = 0; i < productContainer.length; i++) {
        trs += `
        <tr>
         <td>${i + 1}</td>
         <td>${productContainer[i].name}</td>
         <td>${productContainer[i].price}</td>
         <td>${productContainer[i].category}</td>
         <td>${productContainer[i].description}</td>
         <td><a onclick="updateProduct(${i})" href="#form" class="btn btn-outline-warning">Update <i class="fas fa-edit"></i></a></td>
         <td><a onclick="deleteNotification(${i})" class="btn btn-outline-danger" href="#deleteNotification">Delete <i class="fas fa-trash-alt"></i></a></td>
        </tr>
        `

    }
    document.getElementById("tableBody").innerHTML = trs;
}


function deleteNotification(productIndex) {
    cancelUpdate();
    $(deleteNotificationButton).fadeIn(500, function () {
        $("body").css("overflow-y", "hidden");
    });
    document.getElementById("index").innerHTML = productIndex + 1;
    deleteButton.onclick = function () { deleteProduct(productIndex) };
}


function closeNotification() {
    $(deleteNotificationButton).fadeOut(500, function () {
        $("body").css("overflow-y", "auto");
    });
}

function deleteProduct(productNumber) {

    productContainer.splice(productNumber, 1);
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));
    displayProduct();
    searchProduct(searchInput.value);
    closeNotification()
}

function searchProduct(term) {
    let trs = ``;
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            trs += `
        <tr>
         <td>${i + 1}</td>
         <td>${productContainer[i].name}</td>
         <td>${productContainer[i].price}</td>
         <td>${productContainer[i].category}</td>
         <td>${productContainer[i].description}</td>
         <td><a onclick="updateProduct(${i})" href="#form" class="btn btn-outline-warning">Update <i class="fas fa-edit"></i></a></td>
         <td><a onclick="deleteNotification(${i})" class="btn btn-outline-danger" href="#deleteNotification">Delete <i class="fas fa-trash-alt"></i></a></td>

        </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = trs;


}

function updateProduct(updateIndex) {
    productNameInput.value = productContainer[updateIndex].name;
    productPriceInput.value = productContainer[updateIndex].price;
    productCategoryInput.value = productContainer[updateIndex].category;
    productDescriptionInput.value = productContainer[updateIndex].description;
    document.getElementById("addButton").innerHTML = 'Update Product <i class="fas fa-edit"></i>';
    addButton.onclick = function () { displayAfterUpdate(updateIndex) };
    addButton.classList.remove("btn-outline-primary");
    addButton.classList.add("btn-outline-success");
    addButton.removeAttribute("disabled");
}

function cancelUpdate() {
    clearForm();
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
    productNameInput.classList.remove("is-invalid");
    productPriceInput.classList.remove("is-invalid");
    productCategoryInput.classList.remove("is-invalid");
    productDescriptionInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    priceAlert.classList.add("d-none");
    categoryAlert.classList.add("d-none");
    descriptionAlert.classList.add("d-none");
    document.getElementById("addButton").innerHTML = 'Add Product <i class="fas fa-plus-square"></i>';
    addButton.onclick = addProduct;
    addButton.classList.remove("btn-outline-success");
    addButton.classList.add("btn-outline-primary");
    addButton.disabled = "true";
}

function displayAfterUpdate(updateNumber) {
    if (nameValidation() == true & priceValidation() == true & nameValidation() == true & descriptionValidation() == true) {
        productContainer[updateNumber].name = productNameInput.value;
        productContainer[updateNumber].price = productPriceInput.value;
        productContainer[updateNumber].category = productCategoryInput.value;
        productContainer[updateNumber].description = productDescriptionInput.value;
        localStorage.setItem("ourProducts", JSON.stringify(productContainer));
        displayProduct();
        searchProduct(searchInput.value);
        clearForm();
        $(".successAlert").animate({ "opacity": "1" }, 500, function () {
            $(".successAlert").animate({ "opacity": "0" }, 500);
        });
        productNameInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-valid");
        productCategoryInput.classList.remove("is-valid");
        productDescriptionInput.classList.remove("is-valid");
        document.getElementById("addButton").innerHTML = 'Add Product <i class="fas fa-plus-square"></i>';
        addButton.onclick = addProduct;
        addButton.classList.remove("btn-outline-success");
        addButton.classList.add("btn-outline-primary");
        addButton.disabled = "true";
    }
    else {
        nameValidation();
        priceValidation();
        nameValidation();
        descriptionValidation();
    }

}
