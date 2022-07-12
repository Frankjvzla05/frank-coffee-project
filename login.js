import { getCredentials, getOrders } from "./constans/constans.js";
const backHome = () => {
    window.location = "index.html"
}
document.querySelector('.backButton').addEventListener('click', backHome);

let fails = 0;

const login = () => {
    const user = document.getElementById("usuario");
    const pass = document.getElementById("contraseña");

    if (user.value === "madonna" && pass.value === "mad0nna" ||
        user.value === "dualipa" && pass.value === "du4321" ||
        user.value === "britney" && pass.value === "britNEY") {

        getCredentials(user.value, pass.value)
            .then(res => res.json())
            .then(data => getOrders(data.access_token))
            .then(response => response.json())
            .then(result => result.map(order => {
                let containerOrder = document.createElement("div");
                containerOrder.setAttribute("class", "order");
                let orderTitle = document.createElement("h3");
                let orderTitleText = document.createTextNode("PEDIDO")
                let orderDate = document.createElement("p");
                let orderDateText = document.createTextNode(`fecha:${new Date(order.created_at).toLocaleString()}`)
                let orderNumber = document.createElement("p");
                let orderNumberText = document.createTextNode(`orden id: ${order.id}`)
                let orderTable = document.createElement("p");
                let orderTableText = document.createTextNode(`Mesa nro: ${order.table}`)
                let orderWaiter = document.createElement("p");
                let orderWaiterText = document.createTextNode(`Mesero nro: ${order.waiter}`)
                orderTitle.appendChild(orderTitleText)
                containerOrder.appendChild(orderTitle);
                orderDate.appendChild(orderDateText)
                containerOrder.appendChild(orderDate);
                orderNumber.appendChild(orderNumberText)
                containerOrder.appendChild(orderNumber);
                orderTable.appendChild(orderTableText)
                containerOrder.appendChild(orderTable);
                orderWaiter.appendChild(orderWaiterText)
                containerOrder.appendChild(orderWaiter);
                document.querySelector(".orders").appendChild(containerOrder)
            }))
            .catch(error => console.log('error', error));
    } else {
        fails++;
        if (fails > 2) {
            alert("Has superado el límite de intentos, podrás intentar nuevamente en 15 minutos.");
            user.setAttribute('disabled', true);
            pass.setAttribute('disabled', true);
            setTimeout(() => {
                user.removeAttribute('disabled', false)
                pass.removeAttribute('disabled', false)
            }, 900000);
        } else {
            alert("Favor ingresar la el usuario y clave correcto");
        }

    }

    cleanForm(user, pass);
}

const cleanForm = (user, pass) => {
    user.value = "";
    pass.value = "";
}

document.querySelector('#buttonSubmit').addEventListener('click', login);





