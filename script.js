let products = [
  {name:"Laptop",price:800,category:"Electronics",img:"https://cdn.mos.cms.futurecdn.net/5A6UCbS9bp7o6KMtbJWgFW.jpg"},
  {name:"Phone",price:500,category:"Electronics",img:"https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review-1024x691.jpg"},
  {name:"Headphones",price:100,category:"Electronics",img:"https://images.pexels.com/photos/159463/headphones-instagram-video-games-razer-159463.jpeg?cs=srgb&dl=black-and-white-headphones-hanging-159463.jpg&fm=jpg"},
  {name:"Keyboard",price:70,category:"Accessories",img:"https://www.lolvvv.com/_next/image?url=https:%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41VH49ThPwL._SL500_.jpg&w=640&q=75"},
  {name:"Chair",price:120,category:"Furniture",img:"https://static.vecteezy.com/system/resources/previews/026/603/684/non_2x/modern-red-chair-isolated-free-photo.jpg"},
  {name:"Table",price:250,category:"Furniture",img:"https://img.freepik.com/premium-photo/dining-table-set-indoor-photo-studio-professional-photography_925376-26683.jpg"}
]

let cart = JSON.parse(localStorage.getItem("cart")) || []

const categorySelect = document.getElementById("filterCategory")
let categories = ["all", ...new Set(products.map(p=>p.category))]
categories.forEach(c=>{
  let opt = document.createElement("option")
  opt.value = c
  opt.textContent = c
  categorySelect.appendChild(opt)
})

function displayProducts(list){
  let container = document.getElementById("products")
  container.innerHTML=""
  list.forEach((p,index)=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${index})">Add to cart</button>
      </div>
    `
  })
}

function addToCart(index){
  cart.push(products[index])
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCart()
}

function updateCart(){
  let cartList = document.getElementById("cart")
  cartList.innerHTML=""
  let total = 0
  cart.forEach((item,i)=>{
    total += item.price
    cartList.innerHTML += `<li>${item.name} - $${item.price} <button onclick="removeItem(${i})">X</button></li>`
  })
  document.getElementById("total").innerText = total
}

function removeItem(i){
  cart.splice(i,1)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCart()
}

function clearCart(){
  cart = []
  localStorage.removeItem("cart")
  updateCart()
}

function searchProduct(){
  let value = document.getElementById("search").value.toLowerCase()
  let filtered = products.filter(p => p.name.toLowerCase().includes(value))
  let category = document.getElementById("filterCategory").value
  if(category !== "all") filtered = filtered.filter(p=>p.category===category)
  displayProducts(filtered)
}

function filterCategory(){
  searchProduct()
}

// Initial display
displayProducts(products)
updateCart()