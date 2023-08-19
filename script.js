const itemForm = document.getElementById("item-form");
let itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
let filterInput = document.getElementById("filter");


const showItems = () => {
    const items = getItemFromStorage();

    items.forEach((elem) => {
        addItemToDom(elem)
    })

    checkItem();
}


const addItemSubmit = (e) => {
    e.preventDefault();

    //const newItem= itemInput.value

    if (itemInput.value === "") {
        alert("Please fill the input up");
        return
    }

    checkItem()
    addItemToDom(itemInput.value);
    addToLocaleStorage(itemInput.value)

    itemInput.value.value = ""

}


const addToLocaleStorage = (newItem) => {
    const newArray = getItemFromStorage()

    newArray.push(newItem) // ["Sophia"].push("I love you) => ["Sophia", "I love you"]
    localStorage.setItem("item", JSON.stringify(newArray))


}

const getItemFromStorage = () => {

    //localStorage.setItem("name", "vika")

    let newArray

    if (localStorage.getItem("item") === null) {
        newArray = []
    }
    if (localStorage.getItem("item")) {
        newArray = JSON.parse(localStorage.getItem("item")) // '[Sophia]' -> itemsArray=[Sophia]
    }
    return newArray
}


//localStorage
/**
 {
"item":  ["valera","ttt","fight"],
"name": "vika"
}
 */



const addItemToDom = (newItem) => {
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(newItem));//itemInput.value
    const button = createButton("remove-item btn-link text-red")
    li.appendChild(button);
    itemList.appendChild(li);

    li.appendChild(button);
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
    ;

    checkItem();
}


const clearAll = (e) => {
    //itemList.innerHTML =""
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}


const checkItem = () => {
    const items = document.querySelectorAll("li");


    if (items.length === 0) {
        clearBtn.style.display = "none"
        filterInput.style.display = "none"
    } else {
        clearBtn.style.display = "block"
        filterInput.style.display = "block"
    }
}

checkItem()

//filter

// const filterFunc = (words, letter)=>{
//     return words.filter((el)=> el.includes(letter))
// }

// ?
const filterHandler = (e) => {
    const items = document.querySelectorAll("li");

    Array.from(items).filter((el) => {
        let elText = el.textContent.toLowerCase();

        if (elText.includes(e.target.value.toLowerCase())) {
            el.style.display = "flex"
        } else {
            el.style.display = "none"
        }
    })
}


const init = () => {
    itemForm.addEventListener("submit", addItemSubmit);
    itemList.addEventListener("click", removeItem);
    clearBtn.addEventListener("click", clearAll);
    filterInput.addEventListener("input", filterHandler);
    document.addEventListener("DOMContentLoaded", showItems);
}

init()


//const myName = localStorage.setItem("name", "Valerii")
//console.log(localStorage.getItem("name"))
//localStorage.removeItem("name")
//localStorage.clear()


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
// const addToStorage = (myItem) => {
//
//    localStorage.setItem("girl", "Sophia")
//
//     let itemsArray
//
//
//     if (localStorage.getItem("item")===null) {
//         itemsArray = [];
//     }
//     if (localStorage.getItem("item")!==null){
//          itemsArray= JSON.parse(localStorage.getItem("item")) // '[Sophia]' -> itemsArray=[Sophia]
//     }
//
//     itemsArray.push(myItem)  // "I love you"  // ['Sophia', 'I love you']
//     localStorage.setItem("item", JSON.stringify(itemsArray))
// }
