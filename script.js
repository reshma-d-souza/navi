// --- Mall timing ---
const openTime = 9;
const closeTime = 21;

function updateMallStatus() {
  const hour = new Date().getHours();
  const status = (hour >= openTime && hour < closeTime)
    ? "🟢 Mall is OPEN"
    : "🔴 Mall is CLOSED";

  document.getElementById("mallStatus").innerText = status;
}

updateMallStatus();

// --- Store Layout Data ---
let currentFloor = 0;

const floors = [
  {
    name: "Ground Floor",
    layout: Array(80).fill(0),
    items: {
      5: "Shoes",
      20: "Bags",
      45: "Watches"
    }
  },
  {
    name: "1st Floor",
    layout: Array(80).fill(0),
    items: {
      10: "Groceries",
      32: "Snacks",
      56: "Drinks"
    }
  },
  {
    name: "2nd Floor",
    layout: Array(80).fill(0),
    items: {
      6: "Electronics",
      22: "Mobiles",
      40: "Laptops"
    }
  }
];

// --- Display Layout ---
function renderLayout() {
  const layoutDiv = document.getElementById("storeLayout");
  layoutDiv.innerHTML = "";
  const floor = floors[currentFloor];

  for (let i = 0; i < floor.layout.length; i++) {
    const block = document.createElement("div");
    block.className = "block";

    if (floor.items[i]) {
      block.classList.add("item");
      block.innerText = floor.items[i][0];
      block.onclick = () => showItem(i);
    }

    layoutDiv.appendChild(block);
  }
}

renderLayout();

// --- Change Floor ---
function changeFloor(n) {
  currentFloor = n;
  renderLayout();
  loadItems();
}

// --- Load item list ---
function loadItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";

  const items = floors[currentFloor].items;

  for (const i in items) {
    const li = document.createElement("li");
    li.innerText = items[i];
    li.onclick = () => showItem(i);
    list.appendChild(li);
  }
}

loadItems();

// --- Search ---
function searchItem() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const list = document.querySelectorAll("#itemList li");

  list.forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(search) ? "block" : "none";
  });
}

// --- Show Item Popup ---
function showItem(index) {
  const item = floors[currentFloor].items[index];
  document.getElementById("popupName").innerText = item;
  document.getElementById("popupLocation").innerText =
    `Location: Block ${index} on ${floors[currentFloor].name}`;
  document.getElementById("itemPopup").classList.remove("hidden");

  highlightPath(index);
}

function closePopup() {
  document.getElementById("itemPopup").classList.add("hidden");
  clearPath();
}

// --- Highlight shortest path (simple demo) ---
function highlightPath(index) {
  clearPath();
  const blocks = document.querySelectorAll(".block");

  let start = 0;
  let end = index;

  let step = start;
  while (step <= end) {
    blocks[step].classList.add("path");
    step++;
  }
}

function clearPath() {
  document.querySelectorAll(".block").forEach(b => b.classList.remove("path"));
}

// --- Shopkeeper edit mode ---
let editMode = false;

function toggleEditMode() {
  editMode = !editMode;
  alert(editMode ? "Shopkeeper Mode ON" : "Shopkeeper Mode OFF");
}
