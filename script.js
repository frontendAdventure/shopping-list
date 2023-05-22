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

itemForm.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate Input
    if(newItem ===''){
        alert('Please add an item');
        return;
    }

    //Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    
    itemList.appendChild(li);
    itemInput.value='';
}


function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}