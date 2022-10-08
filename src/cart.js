let label = document.getElementById('label')
let shopingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || []
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shopingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopData.find((y) => y.id === id) || []
      let { Image, price, name } = search
      return ` <div class="cart-items border shadow-sm mb-2">
          <img class="cart-img" src=${Image}>
            <div class="details ">
            <div class="title-price-x d-flex align-items space-around">
            <h4 class="title-price mt-2"> <p>${name}</p>
            <p class="card-item-price p-1 ms-2 rounded shadow-sm">&#8377;${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-circle-fill"></i>
            </div><div class="addcart ps-4 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-dash" viewBox="0 0 16 16" onclick="decrement(${id})">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
              <div id=${id} class="quantity p-1">${item}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-plus" viewBox="0 0 16 16" onclick="increment(${id})">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
        </div>
        <h3 class="ms-4 p-2">&#8377; ${item * search.price}</h3>
            </div>
            </div>`
    }).join(""))
  } else {
    shopingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2> 
        <a href="index.html">
        <button class="homeBtn btn btn-warning shadow mt-3">Back to home</button> </a> `
  }
}
generateCartItems()

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id)
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1;
  }
  generateCartItems()
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id)
  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1;
  }
  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0)
  generateCartItems()
  localStorage.setItem("data", JSON.stringify(basket))


}
let update = (id) => {
  let search = basket.find((x) => x.id === id)
  document.getElementById(id).innerHTML = search.item
  calculation()
  TotalAmount()
}

function removeItem(id) {
  let selectedItem = id
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCartItems()
  TotalAmount()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))

}

let clearCart = () => {
  basket = []
  generateCartItems()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      let search = shopData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0)
    label.innerHTML = `<h3>Total Bill: &#8377 ${amount}</h3>
      <button class="checkout btn btn-success shadow-sm">Checkout</button> 
      <button class="RemoveAll btn btn-danger shadow-sm" onclick="clearCart()">Clear Cart</button>`
  }
  else {

  }
}
TotalAmount()