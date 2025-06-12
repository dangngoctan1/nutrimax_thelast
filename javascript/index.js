const foodGrid = document.querySelector('.food-grid');
const mealItems = document.querySelector('.meal-items');
const totalCalo = document.querySelector('.meal-summary span:nth-child(1)');
const totalProtein = document.querySelector('.meal-summary span:nth-child(2)');
const searchInput = document.querySelector('.search-section input');
const filterTabs = document.querySelectorAll('.filter-tabs .tab');
const carouselImages = document.querySelectorAll('.carousel-container img');
const prevButton = document.querySelector('.carousel-controls .prev');
const nextButton = document.querySelector('.carousel-controls .next');
const saveMealButton = document.querySelector('.save-meal');
const clearMealButton = document.querySelector('.clear-meal');
const shareMealButton = document.querySelector('.share-meal');

let meal = [];
let currentCategory = 'all';
let searchTerm = '';
let currentIndex = 0;

function renderFoodGrid(foodsToDisplay) {
  foodGrid.innerHTML = '';
  foodsToDisplay.forEach(food => {
    const card = document.createElement('div');
    card.classList.add('food-card');
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

function calculateTotals() {
  let totalC = 0;
  let totalP = 0;
  meal.forEach(item => {
    const food = foods.find(f => f.name === item.name);
    const quantity = item.quantity;
    if (food) {
      totalC += (food.calories / 100) * quantity;
      totalP += (food.protein / 100) * quantity;
    }
  });
  if (totalCalo) totalCalo.textContent = totalC.toFixed(2);
  if (totalProtein) totalProtein.textContent = totalP.toFixed(2);
}

function renderMeal() {
  mealItems.innerHTML = '';
  meal.forEach((item, index) => {
    const food = foods.find(f => f.name === item.name);
    const div = document.createElement('div');
    div.classList.add('meal-item');
    div.innerHTML = `
      <img src="${food.image}" alt="${food.name}" style="width:60px;height:45px;">
      <span>${food.name}</span>
      <input type="number" value="${item.quantity}" min="1" step="1" data-index="${index}">
      <span>Calo: ${(food.calories / 100 * item.quantity).toFixed(2)}</span>
      <button class="remove-item" data-index="${index}">X</button>
    `;
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '12px';
    mealItems.appendChild(div);
  });
  calculateTotals();
}

foodGrid.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-meal')) {
    const name = e.target.dataset.name;
    const existingItem = meal.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 100;
    } else {
      meal.push({ name, quantity: 100 });
    }
    renderMeal();
  }
});

mealItems.addEventListener('input', function(e) {
  if (e.target.type === 'number') {
    const index = e.target.dataset.index;
    const quantity = parseInt(e.target.value);
    if (quantity >= 1) {
      meal[index].quantity = quantity;
      renderMeal();
    }
  }
});

mealItems.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.dataset.index;
    meal.splice(index, 1);
    renderMeal();
  }
});

function showNextImage() {
  carouselImages[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % carouselImages.length;
  carouselImages[currentIndex].style.display = 'block';
}

setInterval(showNextImage, 1000);
carouselImages.forEach((img, index) => img.style.display = index === 0 ? 'block' : 'none');

prevButton.addEventListener('click', function() {
  carouselImages[currentIndex].style.display = 'none';
  currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  carouselImages[currentIndex].style.display = 'block';
});

nextButton.addEventListener('click', showNextImage);

function filterFoods() {
  let filtered = foods;
  if (currentCategory !== 'all') {
    filtered = filtered.filter(food => food.category === currentCategory);
  }
  if (searchTerm) {
    filtered = filtered.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  renderFoodGrid(filtered);
}

searchInput.addEventListener('input', function(e) {
  searchTerm = e.target.value;
  filterFoods();
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      currentCategory = 'all';
    } else {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
    }
    filterFoods();
  });
});

saveMealButton.addEventListener('click', function() {
  if (meal.length === 0) {
    alert('Thực đơn trống!');
    return;
  }
  const date = new Date().toLocaleDateString();
  let totalC = 0;
  let totalP = 0;
  meal.forEach(item => {
    const food = foods.find(f => f.name === item.name);
    totalC += (food.calories / 100) * item.quantity;
    totalP += (food.protein / 100) * item.quantity;
  });
  const savedMeals = JSON.parse(localStorage.getItem('savedMeals')) || [];
  savedMeals.push({ date, totalCalo: totalC.toFixed(2), totalProtein: totalP.toFixed(2) });
  localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
  alert('Thực đơn đã được lưu!');
});

clearMealButton.addEventListener('click', function() {
  meal = [];
  renderMeal();
});

shareMealButton.addEventListener('click', function() {
  alert('Chức năng chia sẻ đang được phát triển.');
});

renderFoodGrid(foods);