const itemForm = document.getElementById("item-form");
let itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
let filterInput = document.getElementById("filter");


const addItemSubmit = (e) => {
    e.preventDefault();

    if (itemInput.value === "") {
        alert("Please fill the input up");
        return
    }

    checkItem()
    addItemToDom(itemInput.value);
    addToStorage(itemInput.value)

    itemInput.value = ""

}


const addToStorage = (myItem) => {

   localStorage.setItem("girl", "Sophia")

    let itemsArray


    if (localStorage.getItem("item")===null) {
        itemsArray = [];
    }
    if (localStorage.getItem("item")!==null){
         itemsArray= JSON.parse(localStorage.getItem("item")) // '[Sophia]' -> itemsArray=[Sophia]
    }

    itemsArray.push(myItem)  // "I love you"  // ['Sophia', 'I love you']
    localStorage.setItem("item", JSON.stringify(itemsArray))


}


const addItemToDom = (item) => {
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(item));//itemInput.value
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


itemForm.addEventListener("submit", addItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll);
filterInput.addEventListener("input", filterHandler);


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


