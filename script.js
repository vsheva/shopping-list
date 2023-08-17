const itemForm = document.getElementById("item-form");
let itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");


const addItem = (e) => {
    e.preventDefault();

    if (itemInput.value==="" ) {
        alert("Please fill the input up");
    return
    }
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(itemInput.value));
    const button = createButton("remove-item btn-link text-red")

    li.appendChild(button);
    itemList.appendChild(li);
    li.appendChild(button);

    itemInput.value=""

}

const createButton = (classes) => {
    const button = document.createElement("button")
    button.className = classes;
    const icon= createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) => {
    const icon = document.createElement("i")
    icon.className = classes;
    return icon;
}


itemForm.addEventListener("submit", addItem)


//Solution 1
/*
const onSubmit = (e) => {
    e.preventDefault();
    const li = document.createElement("li")
    li.innerHTML =`${itemInput.value}
          <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
          </button>`

    itemList.appendChild(li);
}

itemForm.addEventListener("submit",onSubmit)
*/


//
//
//
//
// const onSubmit = (e) => {
//     e.preventDefault();
//     //itemInput=itemInput.value
//     // addFruit(itemInput)
//
//     const li = document.createElement("li");
//     li.innerHTML = `${itemInput.value}
//           <button class="remove-item btn-link text-red">
//             <i class="fa-solid fa-xmark"></i>
//           </button>`
//
//     itemList.appendChild(li);
//
// }
//
// itemForm.addEventListener("submit", onSubmit);
//
//
//
//

