const itemForm = document.getElementById("item-form");
let itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterInput = document.getElementById("filter");



const addItem = (e) => {
    e.preventDefault();

    if (itemInput.value === "") {
        alert("Please fill the input up");
        return
    }
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(itemInput.value));
    const button = createButton("remove-item btn-link text-red")

    li.appendChild(button);
    itemList.appendChild(li);
    checkItem()

    li.appendChild(button);

    itemInput.value = ""

}

const createButton = (classes) => {
    const button = document.createElement("button")
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) => {
    const icon = document.createElement("i")
    icon.className = classes;
    return icon;
}


const removeItem = (e) => {
    if (e.target.parentNode.className.includes("remove-item")) {
        e.target.closest("li").remove()
        //e.target.parentElement.parentElement.remove()
    }

    checkItem();

}


const clearAll = (e) => {
    //itemList.innerHTML =""
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}


const checkItem = ()=>{
    const items = document.querySelectorAll("li");

    if(items.length===0) {
        clearBtn.style.display="none"
        filterInput.style.display="none"
    } else {
        clearBtn.style.display="block"
        filterInput.style.display="block"
    }
}

checkItem()



itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll);


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


