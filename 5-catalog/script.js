const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function getFiltered() {
  // [Баг 7]
  let result = [...products];
  // [Баг 3]
  const search = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  // [Баг 4 и Баг 8]
  if (search) {
    result = result.filter((p) => p.name.toLowerCase().includes(search));
  }

  // [Баг 5 и Баг 8]
  if (category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  // [Баг 6]
  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

function render() {
  // [Баг 2]
  grid.innerHTML = "";
  const items = getFiltered();
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  // [Баг 9]
  countEl.textContent = items.length;
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

// [Баг 10]
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";
  render();
});

// [Баг 1]
render();
