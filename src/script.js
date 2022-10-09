let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
  return (shop.innerHTML = shopData.map((x) => {
    let { id, name, price, description, Image } = x
    let search = basket.find((x) => x.id === id) || []
    return `  <div id=product-id-${id} class="col col-12 col-sm-6 col-md-4  pb-3" >
<div class="card shadow-sm mb-2"  style="width: 20rem; ">
<img src=${Image} class="card-img-top img-responsive " alt="...">
<div class="card-body">
  <h5 class="card-title">${name}</h5>
  <p class="card-text">${description}</p>
  <div class="price-quantity ">
    <div class="price"> &#8377;${price}</div>
    <div class="addcart">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-dash" viewBox="0 0 16 16" onclick="decrement(${id})">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>
          <div id=${id} class="quantity p-1">${search.item === undefined ? 0 : search.item}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-plus" viewBox="0 0 16 16" onclick="increment(${id})">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
    </div>
  </div>
  <a href="./cart.html" class="btn btn-primary shadow ">Go to cart</a>
</div>
</div>
</div> `
  }).join(""))
}

generateShop()

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
  //console.log(basket);
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
  //console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket))


}
let update = (id) => {
  let search = basket.find((x) => x.id === id)
  document.getElementById(id).innerHTML = search.item
  //console.log(search.item);
  calculation()
}

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

}
calculation()