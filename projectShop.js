start ();

function start(){
    const removeItemFromCart = document.getElementsByClassName('button2');

    for (let i = 0; i < removeItemFromCart.length; i++) {
            const removeButton = removeItemFromCart[i];
            removeButton.addEventListener('click', function(event){
                const removeButtonClicked = event.target;
                removeButtonClicked.parentElement.parentElement.remove();
                updateCartTotal();
        });
    }

    const itemQty = document.getElementsByClassName('quantity_number');

    for (let i = 0; i < itemQty.length; i++) {
        const qtyInput = itemQty[i];
        qtyInput.addEventListener('change', qtyChanged)
        updateCartTotal();
    }

    const addItemBtns = document.getElementsByClassName('button1');
    for (let i = 0; i < addItemBtns.length; i++) {
        const addItemBtn = addItemBtns[i];
        addItemBtn.addEventListener('click', addItemBtnClicked)
        updateCartTotal();
    }

    document.getElementsByClassName('button3')[0].addEventListener('click', purchaseClicked);
}




function updateCartTotal(){
    
    const cartRows = document.getElementsByClassName('items__list');
    
    let cartTotal = 0;
    for (let i = 0; i < cartRows.length; i++) {
        const itemCartPrice = parseFloat(document.getElementsByClassName('item_price')[i].innerText.replace('$' , ''));
        const itemCartQty = parseFloat(document.getElementsByClassName('quantity_number')[i].value);
        cartTotal = cartTotal + (itemCartPrice * itemCartQty);
    }
    cartTotal = Math.round(cartTotal * 100)/100;
    document.getElementsByClassName('total_price_number')[0].innerHTML = '$' + cartTotal;

}



function qtyChanged(event){
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}



function addItemBtnClicked(event){
    const button = event.target;
    const item = button.parentElement.parentElement;
    const itemName = item.getElementsByClassName('product-box__title')[0].innerText;
    const itemPrice = item.getElementsByClassName('product-box__price')[0].innerText;
    addItemToCart(itemName, itemPrice); 
    updateCartTotal();
}

function addItemToCart(itemName, itemPrice){
    const cartTable = document.getElementsByClassName('cart_items')[0];
    const newCartRow = cartTable.insertRow(1);
    newCartRow.classList.add('items__list');
    const cartItemNames = document.getElementsByClassName('item')
    
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == itemName)  {
           alert("this item is already in cart");
           return 
        } 
    }
    const newCartRowContents = `
    <tr>
        <td class="item">${itemName}</td>
        <td ><input class="quantity_number" type="number" value="1"></td>
        <td class="item_price">${itemPrice}</td> 
        <td><button class="button2" type="delete">x</button></td>
    <tr>`
    newCartRow.innerHTML = newCartRowContents;
    
    newCartRow.getElementsByClassName('button2')[0].addEventListener('click',function(event){
        const removeButtonClicked = event.target;
        removeButtonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    });
    newCartRow.getElementsByClassName('quantity_number')[0].addEventListener('change', qtyChanged);

}



function purchaseClicked() {
    alert('Thank you for your purchase')
    const cartItems = document.getElementsByClassName('items__list');
    while (cartItems.length > 0) {
        document.getElementsByClassName('items__list')[0].remove();
    }
    updateCartTotal()
}