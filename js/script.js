// ========== EXPLORE STORES ==========
const storeSearchForm = document.getElementById("storeSearchForm");
const storeSearch = document.getElementById("storeSearch");
const stores = document.querySelectorAll(".store");
const categoryButtons = document.querySelectorAll(".category-buttons button");
const noResult = document.getElementById("noResult");

let currentCategory = "all";

// search text aur category dono ke hisab se stores dikhata hai
function filterStores() {
  const searchText = storeSearch.value.toLowerCase().trim();
  let count = 0;

  stores.forEach(function (store) {
    const storeName = store.querySelector("h4").textContent.toLowerCase();
    const storeCategory = store.getAttribute("data-category");

    const nameMatch = storeName.includes(searchText);
    const categoryMatch =
      currentCategory === "all" || currentCategory === storeCategory;

    if (nameMatch && categoryMatch) {
      store.style.display = ""; // CSS wala default display wapas
      count++;
    } else {
      store.style.display = "none";
    }
  });

  // koi store na mile to message dikhao
  noResult.style.display = count === 0 ? "block" : "none";
}

// Explore Stores ka search
storeSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  filterStores();
});

// Category buttons
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentCategory = button.getAttribute("data-category");

    categoryButtons.forEach(function (btn) {
      btn.classList.remove("active-btn");
    });
    button.classList.add("active-btn");

    filterStores();
  });
});

// Navbar aur Hero ka search: Explore Stores me jaakar search kare
const topSearchForms = document.querySelectorAll("#navbar .search-box, #hero .search-bar");

topSearchForms.forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    storeSearch.value = form.querySelector("input").value;
    filterStores();
    document.getElementById("explorestores").scrollIntoView();
  });
});


// ========== STORE POPUP ==========
const storeModal = document.getElementById("storeModal");
const closeModal = document.getElementById("closeModal");
const modalStoreName = document.getElementById("modalStoreName");
const modalCategory = document.getElementById("modalCategory");
const modalFloor = document.getElementById("modalFloor");

const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.parentElement;
    const storeInfo = card.querySelectorAll(".store-info");

    modalStoreName.textContent = card.querySelector("h4").textContent;
    modalCategory.textContent = "Category: " + storeInfo[0].textContent.trim();
    modalFloor.textContent = storeInfo[1].textContent.trim();

    storeModal.style.display = "flex";
  });
});

closeModal.addEventListener("click", function () {
  storeModal.style.display = "none";
});

// popup ke bahar click karne par band
storeModal.addEventListener("click", function (event) {
  if (event.target === storeModal) {
    storeModal.style.display = "none";
  }
});


// ========== MALL MAP ==========
const floorMap = document.getElementById("floorMap");
const floorButtons = document.querySelectorAll(".floor-buttons button");

const floorImages = {
  ug: "assets/images/icons/ground floor.png",
  first: "assets/images/icons/first floor.png",
  second: "assets/images/icons/second floor.png",
};

floorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFloor = button.getAttribute("data-floor");

    // pehle sab se active class hatao
    floorButtons.forEach(function (btn) {
      btn.classList.remove("active-btn");
    });

    // clicked button par lagao aur map badlo
    button.classList.add("active-btn");
    floorMap.src = floorImages[selectedFloor];
  });
});


// ========== PARKING ASSISTANT ==========
const parkingLevel = document.getElementById("parkingLevel");
const parkingSlot = document.getElementById("parkingSlot");
const parkingNote = document.getElementById("parkingNote");

const saveParking = document.getElementById("saveParking");
const findParking = document.getElementById("findParking");
const clearParking = document.getElementById("clearParking");

const parkingMessage = document.getElementById("parkingMessage");
const parkingDetails = document.getElementById("parkingDetails");
const resultLevel = document.getElementById("resultLevel");
const resultSlot = document.getElementById("resultSlot");
const resultNote = document.getElementById("resultNote");

// parking card me data dikhata hai
function showParking(data) {
  resultLevel.textContent = data.level;
  resultSlot.textContent = data.slot;
  resultNote.textContent = data.note || "No note";
  parkingDetails.style.display = "block";
}

saveParking.addEventListener("click", function () {
  const level = parkingLevel.value.trim();
  const slot = parkingSlot.value.trim();
  const note = parkingNote.value.trim();

  // note optional hai, level aur slot zaroori
  if (level === "" || slot === "") {
    parkingMessage.textContent = "Please enter parking level and slot!";
    parkingDetails.style.display = "none";
    return;
  }

  const parkingData = { level: level, slot: slot, note: note };
  localStorage.setItem("myParking", JSON.stringify(parkingData));

  parkingMessage.textContent = "Parking saved successfully!";
  showParking(parkingData);
});

findParking.addEventListener("click", function () {
  const savedData = JSON.parse(localStorage.getItem("myParking"));

  if (savedData === null) {
    parkingMessage.textContent = "No parking details found! Please save your parking first.";
    parkingDetails.style.display = "none";
  } else {
    parkingMessage.textContent = "Here is your car location:";
    showParking(savedData);
  }
});

clearParking.addEventListener("click", function () {
  localStorage.removeItem("myParking");

  parkingLevel.value = "";
  parkingSlot.value = "";
  parkingNote.value = "";

  parkingDetails.style.display = "none";
  parkingMessage.textContent = "Parking location cleared successfully!";
});


// ========== DINING ==========
const diningModal = document.getElementById("diningModal");
const closeDiningModal = document.getElementById("closeDiningModal");

const diningName = document.getElementById("diningName");
const diningCuisine = document.getElementById("diningCuisine");
const diningDescription = document.getElementById("diningDescription");
const diningPopular = document.getElementById("diningPopular");

const diningButtons = document.querySelectorAll(".dining-details");

const restaurantData = {
  "McDonald's": {
    cuisine: "Burgers & Fast Food",
    description: "Enjoy delicious burgers, crispy fries and refreshing beverages.",
    popular: "Burgers, Fries, Beverages",
  },
  "KFC": {
    cuisine: "Fried Chicken & Fast Food",
    description: "Enjoy crispy fried chicken and delicious fast food.",
    popular: "Chicken Bucket, Burgers, Fries",
  },
  "Pizza Hut": {
    cuisine: "Pizza & Italian-style Food",
    description: "Enjoy delicious pizzas, garlic bread and more.",
    popular: "Pizza, Garlic Bread, Beverages",
  },
};

diningButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.parentElement.querySelector("h3").textContent;
    const data = restaurantData[name];

    diningName.textContent = name;
    diningCuisine.textContent = data.cuisine;
    diningDescription.textContent = data.description;
    diningPopular.textContent = data.popular;

    diningModal.style.display = "flex";
  });
});

closeDiningModal.addEventListener("click", function () {
  diningModal.style.display = "none";
});

diningModal.addEventListener("click", function (event) {
  if (event.target === diningModal) {
    diningModal.style.display = "none";
  }
});