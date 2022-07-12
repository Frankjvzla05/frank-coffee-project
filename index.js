import { mainMenu } from "./constans/constans.js";
let menuData, categoryContainer;

const createDish = (key, dish, container) => {
    container.setAttribute('id', `container-${key}`);
    let dishCard = document.createElement('div');
    dishCard.setAttribute('class', `card-dish-${key}`);
    let dishImg = document.createElement('img');
    dishImg.setAttribute('src', dish.img);
    dishImg.setAttribute('alt', dish.name);
    let dishTitle = document.createElement('h3');
    let dishTitleText = document.createTextNode(dish.name);
    dishTitle.appendChild(dishTitleText);
    let dishDescription = document.createElement('p');
    let dishDescriptionText = document.createTextNode(dish.description);
    dishDescription.appendChild(dishDescriptionText);
    let dishPrice = document.createElement('p');
    let dishPriceText = document.createTextNode(`$ ${dish.price}`);
    dishPrice.appendChild(dishPriceText);
    dishCard.appendChild(dishImg);
    dishCard.appendChild(dishTitle);
    dishCard.appendChild(dishDescription);
    dishCard.appendChild(dishPrice);
    container.insertBefore(dishCard, container.lastChild);
}

const addDish = (key, dish, container) => {
    let dishCard = document.createElement('div');
    dishCard.setAttribute('class', `card-dish-${key}`);
    let dishImg = document.createElement('img');
    dishImg.setAttribute('src', dish.img);
    dishImg.setAttribute('alt', dish.name);
    let dishTitle = document.createElement('h3');
    let dishTitleText = document.createTextNode(dish.name);
    dishTitle.appendChild(dishTitleText);
    let dishDescription = document.createElement('p');
    let dishDescriptionText = document.createTextNode(dish.description);
    dishDescription.appendChild(dishDescriptionText);
    let dishPrice = document.createElement('p');
    let dishPriceText = document.createTextNode(`$ ${dish.price}`);
    dishPrice.appendChild(dishPriceText);
    dishCard.appendChild(dishImg);
    dishCard.appendChild(dishTitle);
    dishCard.appendChild(dishDescription);
    dishCard.appendChild(dishPrice);
    container.insertBefore(dishCard, container.lastChild);
}

const getMenu = () => {

    fetch(mainMenu)
        .then((res) => res.json())
        .then((data) => {
            menuData = data;
            let categories = Object.entries(menuData);
            categories.forEach(([key, value]) => {
                let categoryTitle = document.createElement('h3');
                let categoryTitleText = document.createTextNode(key.toUpperCase());
                categoryTitle.appendChild(categoryTitleText);
                categoryContainer = document.createElement('div');
                categoryContainer.appendChild(categoryTitle);
                foodContainer.appendChild(categoryContainer);
                let btnVerMas = document.createElement('button');
                btnVerMas.setAttribute('id', `view-more-${key}`);
                let btnVerMasText = document.createTextNode('Ver más');
                btnVerMas.appendChild(btnVerMasText);
                btnVerMas.setAttribute("class", "buttonView");
                categoryContainer.appendChild(btnVerMas);
                let dishes = value.slice(0, 3);
                document.querySelector(`#view-more-${key}`).addEventListener('click', showmore);
                dishes.map(dish => {
                    createDish(key, dish, categoryContainer);
                })
            })
        })
        .catch((err) => console.log(err));
}

getMenu();
const foodContainer = document.querySelector(".foodContainer");
const cleanContainer = (container, target) => {
    let cards = document.querySelectorAll(`div.card-dish-${target}`);
    cards.forEach(card => {
        container.removeChild(card)
    });
}
const showmore = (e) => {
    let target = e.target.id.split('-')[2];
    let categories = Object.entries(menuData);
    if (e.target.textContent === 'Ver más') {
        e.target.textContent = 'Ver menos';
        categories.forEach(([key, value]) => {
            if (key === target) {
                let otherDishes = value.slice(3);
                otherDishes.map(dish => {
                    addDish(key, dish, e.target.parentElement);
                })
            }
        })
    } else {
        cleanContainer(e.target.parentElement, target);
        e.target.textContent = 'Ver más';
        categories.forEach(([key, value]) => {
            if (key === target) {
                let dishes = value.slice(0, 3);
                dishes.map(dish => {
                    addDish(key, dish, e.target.parentElement);
                })

            }
        })
    }
}

const initSesion = () => {
    window.location = "formInitSesion.html"
}
document.querySelector('.initButton').addEventListener('click', initSesion);


