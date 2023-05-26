// const inputField = document.querySelector('.form-input');
// const submitBtn = document.querySelector('.btn');
// const ul = document.querySelector('.items');
// const form = document.querySelector('#item-form');
// const removeBtn = document.querySelectorAll('.remove-item');
// clearBtn = document.querySelector('.btn-clear');

// form.addEventListener('submit', onSubmit);
// submitBtn.addEventListener('submit', onSubmit);
// removeBtn.forEach((btn)=>{

// btn.addEventListener('click', removeItem)
// })

// clearBtn.addEventListener('click', ()=>{
//     Array.from(ul.children).forEach((child)=>{
//         child.remove();
//     });
// })

// function removeItem(e){
// e.currentTarget.parentElement.remove();
// }

// function onSubmit(e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const item = formData.get('item');
//   console.log(item);

//   const li = document.createElement('li');
//   const button = document.createElement('button');
//   button.className='remove-item btn-link text-red';
//   const icon = document.createElement('i');
//   icon.className='fa-solid fa-xmark';

//   button.appendChild(icon);
//   let textNode = document.createTextNode(item);
//   li.appendChild(textNode);
//   li.appendChild(button);
//   ul.appendChild(li);

//   addToLocalStorage(item);
// }

// function addToLocalStorage(item){
//     if(localStorage.getItem('list')){
//         items = JSON.parse(localStorage.getItem('list'))
//     }else{
//         items =[];
//     }
//     if(!items.includes(item))items.push(item);
//    localStorage.setItem('list', JSON.stringify(items))

// }

// function populateUI(){
//     if(localStorage.getItem('list').length > 0){
//         items = JSON.parse(localStorage.getItem('list'))
//     }
//     list.forEach(item=>{

//     })

// }

const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

//Initialize app

function init(){
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems)

  checkUI();
}

init();

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    console.log(itemName);

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {

  itemInput.value = '';

  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //clear from local storage
  localStorage.removeItem('items');

  checkUI();
}


function onClickItem(e){
  if (e.target.parentElement.classList.contains('remove-item')) {
  removeItem(e.target.parentElement.parentElement)
  }

  if(e.target.tagName = 'LI'){
      setItemToEdit(e.target);
    }
    
  
}

function setItemToEdit(item){
  isEditMode = true;

  itemList.querySelectorAll('li').forEach(i=>i.classList.remove('edit-mode'));


  item.classList.add('edit-mode');
  formBtn.innerHTML= '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor='#228B22';
  itemInput.value = item.textContent;
}


function removeItem(item) {
  if(confirm('Are you sure?')){
    //remove item from DOM
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage();
  //filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i)=> i !== item);

  //Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}



function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //check for edit mode
  if(isEditMode){
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.tectContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode= false;
  }

  //Create item DOM element
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  checkUI();

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToDOM(item){
  //Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add li to DOM
  itemList.appendChild(li);
}


function addItemToStorage(item){
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);


  localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage(){
  let itemsFromStorage;

  if(localStorage.getItem('items')===null){
    itemsFromStorage =[];
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}


function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item=>{
    addItemToDOM(item);
  })

  checkUI();
}