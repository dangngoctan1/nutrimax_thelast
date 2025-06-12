// ===== KHAI BÁO BIẾN =====
// Chọn phần tử cho lưới thực phẩm chính bằng ID duy nhất
const foodGrid = document.getElementById("main-food-grid");
const mealItems = document.querySelector(".meal-items");
const totalCalo = document.querySelector(".meal-summary p:nth-child(1) span");
const totalProtein = document.querySelector(
  ".meal-summary p:nth-child(2) span"
);
const filterTabs = document.querySelectorAll(".filter-tabs .tab");
const carouselImages = document.querySelectorAll(".carousel-container img");
const prevButton = document.querySelector(".carousel-controls .prev");
const nextButton = document.querySelector(".carousel-controls .next");
const saveMealButton = document.querySelector(".save-meal");
const clearMealButton = document.querySelector(".clear-meal");
const shareMealButton = document.querySelector(".share-meal");
const header = document.querySelector("header");
const mainContainer = document.querySelector(".main-container");

// Biến cho chức năng tìm kiếm
const searchForm = document.querySelector(".search-section form");
const searchInput = document.querySelector(".search-section input");
const searchResultsContainer = document.getElementById("search-results");
const searchResultsGrid = document.getElementById("search-results-grid");

// Biến trạng thái
let meal = [];
let currentCategory = "all";
let currentIndex = 0;

// ===== CÁC HÀM RENDER =====

// Hàm render thực phẩm cho lưới chính (khi lọc bằng tab)
function renderFoodGrid(foodsToDisplay) {
  foodGrid.innerHTML = "";
  foodsToDisplay.forEach((food) => {
    const card = document.createElement("div");
    card.classList.add("food-card");
    card.innerHTML = `
      <img src="${food.image}" alt="${food.name}">
      <h3>${food.name}</h3>
      <p>Calo: ${food.calories} / 100g</p>
      <p>Protein: ${food.protein}g / 100g</p>
      <button class="add-to-meal" data-name="${food.name}">Thêm vào thực đơn</button>
    `;
    foodGrid.appendChild(card);
  });
}

// Hàm render kết quả cho khung tìm kiếm
function renderSearchResults(foodsToDisplay) {
  searchResultsGrid.innerHTML = ""; // Xóa kết quả cũ
  if (foodsToDisplay.length > 0) {
    foodsToDisplay.forEach((food) => {
      const card = document.createElement("div");
      card.classList.add("food-card");
      card.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <h3>${food.name}</h3>
        <p>Calo: ${food.calories} / 100g</p>
        <p>Protein: ${food.protein}g / 100g</p>
        <button class="add-to-meal" data-name="${food.name}">Thêm vào thực đơn</button>
      `;
      searchResultsGrid.appendChild(card);
    });
    searchResultsContainer.style.display = "block";
  } else {
    // Vẫn hiển thị container để CSS có thể hiện thông báo "Không tìm thấy"
    searchResultsContainer.style.display = "block";
  }
}

// Hàm render các món ăn trong "Thực đơn hiện tại"
function renderMeal() {
  mealItems.innerHTML = "";
  meal.forEach((item, index) => {
    const food = foods.find((f) => f.name === item.name);
    const div = document.createElement("div");
    div.classList.add("meal-item");
    div.innerHTML = `
      <img src="${food.image}" alt="${
      food.name
    }" style="width:60px;height:45px;">
      <span>${food.name}</span>
      <input type="number" value="${
        item.quantity
      }" min="1" step="1" data-index="${index}">
      <span>Calo: ${((food.calories / 100) * item.quantity).toFixed(2)}</span>
      <button class="remove-item" data-index="${index}">X</button>
    `;
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "12px";
    mealItems.appendChild(div);
  });
  calculateTotals();
}

// Hàm tính tổng calo và protein
function calculateTotals() {
  let totalC = 0;
  let totalP = 0;
  meal.forEach((item) => {
    const food = foods.find((f) => f.name === item.name);
    const quantity = item.quantity;
    if (food) {
      totalC += (food.calories / 100) * quantity;
      totalP += (food.protein / 100) * quantity;
    }
  });
  if (totalCalo) totalCalo.textContent = totalC.toFixed(2);
  if (totalProtein) totalProtein.textContent = totalP.toFixed(2);
}

// ===== CÁC HÀM XỬ LÝ SỰ KIỆN =====

// Lắng nghe sự kiện click trên toàn trang để xử lý nút "Thêm vào thực đơn"
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-meal")) {
    const name = e.target.dataset.name;
    const existingItem = meal.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 100;
    } else {
      meal.push({ name, quantity: 100 });
    }
    renderMeal();
  }
});

// Sự kiện cho các món trong thực đơn (thay đổi số lượng, xóa)
mealItems.addEventListener("input", function (e) {
  if (e.target.type === "number") {
    const index = e.target.dataset.index;
    const quantity = parseInt(e.target.value);
    if (quantity >= 1) {
      meal[index].quantity = quantity;
      renderMeal();
    }
  }
});

mealItems.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.dataset.index;
    meal.splice(index, 1);
    renderMeal();
  }
});

// --- LOGIC MỚI CHO CAROUSEL ---
const carouselContainer = document.querySelector(".carousel-container");

if (carouselContainer && carouselImages.length > 0) {
  let currentIndex = 0;
  const totalImages = carouselImages.length;
  let autoSlideInterval;

  // Hàm cập nhật vị trí của carousel
  function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  }

  function startAutoSlide() {
    clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(showNextImage, 1500);
  }
  nextButton.addEventListener("click", () => {
    showNextImage();
    startAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    showPrevImage();
    startAutoSlide();
  });

  startAutoSlide();
}

// Sự kiện cho bộ lọc (Filter Tabs)
function filterFoods() {
  let filtered = foods;
  if (currentCategory !== "all") {
    filtered = filtered.filter((food) => food.category === currentCategory);
  }
  renderFoodGrid(filtered);
}

filterTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      currentCategory = "all";
    } else {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.dataset.category;
    }
    filterFoods();

    if (header && mainContainer) {
      const headerHeight = header.offsetHeight;
      const mainContainerTop = mainContainer.offsetTop;
      const scrollPosition = mainContainerTop - headerHeight - 20;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  });
});

// Sự kiện cho thanh tìm kiếm
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    searchResultsContainer.style.display = "none";
    return;
  }

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm)
  );

  renderSearchResults(filteredFoods);
});

searchInput.addEventListener("input", function (e) {
  if (e.target.value.trim() === "") {
    searchResultsContainer.style.display = "none";
  }
});

// Sự kiện cho các nút trong "Thực đơn hiện tại"
saveMealButton.addEventListener("click", function () {
  if (meal.length === 0) {
    alert("Thực đơn trống!");
    return;
  }
  const date = new Date().toLocaleDateString();
  let totalC = 0;
  let totalP = 0;
  meal.forEach((item) => {
    const food = foods.find((f) => f.name === item.name);
    totalC += (food.calories / 100) * item.quantity;
    totalP += (food.protein / 100) * item.quantity;
  });
  const savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
  savedMeals.push({
    date,
    totalCalo: totalC.toFixed(2),
    totalProtein: totalP.toFixed(2),
  });
  localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
  alert("Thực đơn đã được lưu!");
});

clearMealButton.addEventListener("click", function () {
  meal = [];
  renderMeal();
});

shareMealButton.addEventListener("click", function () {
  alert("Chức năng chia sẻ đang được phát triển.");
});

// ===== KHỞI TẠO KHI TẢI TRANG =====
// Render lưới thực phẩm chính lần đầu
renderFoodGrid(foods);
