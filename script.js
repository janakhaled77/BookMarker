var siteName = document.getElementById("siteName");
var webUrl = document.getElementById("webUrl");
var Data = document.getElementById('Data');
var box = document.getElementById('box');
var close = document.getElementById('close');

var pList = JSON.parse(localStorage.getItem('site')) || [];

function addProduct() {
    if (siteName.value === '' || webUrl.value === '') {
        box.classList.replace('d-none', 'd-flex');
        return;
    }
    if (ValidateName() && ValidateUrl()) {
        var site = {
            name: siteName.value,
            url: webUrl.value,
        }
        pList.push(site);
       
        localStorage.setItem('site', JSON.stringify(pList));
        siteName.classList.remove('is-valid', 'is-invalid'); 
        webUrl.classList.remove('is-valid', 'is-invalid');
    }
    else {
        box.classList.replace('d-none', 'd-flex');
    }
}


function clearForm() {
    siteName.value = '';
    webUrl.value = '';
}

function display() {
    var string = '';
    for (var i = 0; i < pList.length; i++) {
        string += `
            <tr>
                <td>${i + 1}</td>
                <td>${pList[i].name}</td>
                <td><a href="${pList[i].url}" target="_blank" class="btn btn-success"><i class="fas fa-eye pe-2"></i>Visit</a></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
        `;
    }
    Data.innerHTML = string;
}

function deleteProduct(index) {
    pList.splice(index, 1);
    localStorage.setItem('site', JSON.stringify(pList));
    display();
}


function ValidateName() {
    var NameRegex = /[a-z]{3,7}/;
    var isValid = NameRegex.test(siteName.value);
    siteName.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        siteName.classList.add('is-valid');
        return true;
    }
    else {
        siteName.classList.add('is-invalid');
        return false;
    }

}
function ValidateUrl() {
    var UrlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}/;
    var isValid = UrlRegex.test(webUrl.value);
    webUrl.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        webUrl.classList.add('is-valid');
        return true;
    }
    else {
        webUrl.classList.add('is-invalid');
        return false;
    }

}
close.addEventListener('click', function () {
    box.classList.replace('d-flex', 'd-none');
})
document.addEventListener('DOMContentLoaded', display);


