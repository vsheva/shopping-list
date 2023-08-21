const itemForm = document.getElementById('item-form');
let itemInput = document.getElementById('item-input');
let itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
let filterInput = document.getElementById('filter');
const btn = itemForm.querySelector('button');

let inEditMode = false;

const showItems = () => {
    // let newItems;
    //
    // if (localStorage.getItem("item")===null) {
    //     newItems = [];
    // } else {
    //     newItems = JSON.parse(localStorage.getItem("item")) //нельзя просто так взять значение из localstorage-> parse
    // }

    const newItems = getItemFromStorage();
    newItems.map(el => addItemToDom(el));
    checkItem();
};

const addItemSubmit = e => {
    e.preventDefault();
    let newItem = itemInput.value;

    if (newItem === '') {
        alert('Please fill up the input');
        return;
    }

    if (inEditMode) {
        const editedItem = itemList.querySelector(".edit");
        removeItemFromLocaleStorage(editedItem.textContent); //remove from Storage
        editedItem.classList.remove("edit");

        editedItem.remove();  //remove from UI //removeItem(editItem);
        inEditMode = false

    } else if (checkItemExists(newItem)) {   //!!!!!!!!!!!!!
        alert("This item already exists!");
        return;
    }

    getItemFromStorage();
    checkItem();
    addItemToDom(newItem);
    addToLocaleStorage(newItem);
    itemInput.value = '';
};

const addToLocaleStorage = newItem => {
    const newArray = getItemFromStorage();
    newArray.push(newItem); // ["Sophia"].push("I love you) => ["Sophia", "I love you"]
    localStorage.setItem('item', JSON.stringify(newArray));
};

const getItemFromStorage = () => {
    let newArrayFromStorage;

    if (localStorage.getItem('item') === null) {
        newArrayFromStorage = [];
    }
    if (localStorage.getItem('item')) {
        newArrayFromStorage = JSON.parse(localStorage.getItem('item')); // '[Sophia]' -> itemsArray=[Sophia]
    }
    return newArrayFromStorage;
};

const onItemClick = e => {
    if (e.target.parentNode.className.includes('remove-item')) {
        //if button has class "remove-item"
        if (confirm('Are you sure?')) {
            removeItem(e.target.closest('li')); //e.target.parentElement.parentElement.remove()
        }
    } else if (e.target.tagName === 'LI') {
        editItem(e.target);
    }
};

const editItem = item => {
    inEditMode = true;

    let items = itemList.querySelectorAll('li');
    items.forEach(el => el.classList.remove('edit')); //item.style.color="#ccc";

    item.classList.add('edit');
    btn.innerHTML = '<i class="fa-solid fa-pen"></i> Edit Item';
    btn.style.backgroundColor = '#228b22';
    itemInput.value = item.textContent; //!!!!!без textContent не работает - записали в инпут текст  места клика
};

const checkItemExists = (item) => {
    const arrayItemsFromStorage = getItemFromStorage()
    return arrayItemsFromStorage.includes(item);

}

const removeItem = item => {
    // if (e.target.parentNode.className.includes("remove-item")) {                              //if button has class "remove-item"
    //     e.target.closest("li").remove() //e.target.parentElement.parentElement.remove()}
    item.remove();
    removeItemFromLocaleStorage(item.textContent);

    checkItem();
};

const removeItemFromLocaleStorage = newItem => {
    let items = getItemFromStorage();

    items = items.filter(el => el !== newItem);
    //localStorage.setItem('item', items)  !!!!!!!! так не работает
    localStorage.setItem('item', JSON.stringify(items));
};

const addItemToDom = newItem => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem)); //itemInput.value
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);

    li.appendChild(button);

    checkItem();
};

const createButton = classes => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
};

const createIcon = classes => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
};

const clearAll = e => {
    //itemList.innerHTML =""
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.clear(); //localStorage.removeItem("item")

    checkItem();
};

const checkItem = () => {
    itemInput.value = "";
    const items = document.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filterInput.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filterInput.style.display = 'block';
    }

    btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    btn.style.backgroundColor = '#333';
};

checkItem();

//filter
// const filterFunc = (words, letter)=>{
//     return words.filter((el)=> el.includes(letter))}


const filterHandler = e => {
    const items = document.querySelectorAll('li');

    Array.from(items).filter(el => {
        let elText = el.textContent.toLowerCase();

        if (elText.includes(e.target.value.toLowerCase())) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
};

const init = () => {
    itemForm.addEventListener('submit', addItemSubmit);
    itemList.addEventListener('click', onItemClick);
    clearBtn.addEventListener('click', clearAll);
    filterInput.addEventListener('input', filterHandler);
    document.addEventListener('DOMContentLoaded', showItems);
};

init();


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

//const showItems = () => {
//     const items = getItemFromStorage();
//
//     items.forEach((elem) => {
//         addItemToDom(elem)
//     })
//
//     checkItem();
// }
