const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  document.querySelector('#fullname').textContent = user.fullname;
  document.querySelector('#email').textContent = user.email;
} else {
  alert('Vui lòng đăng nhập.');
  window.location.href = 'login.html';
}

const editButton = document.querySelector('#edit-info');
const editForm = document.querySelector('#edit-form');
editButton.addEventListener('click', function() {
  editForm.style.display = 'block';
  document.querySelector('#edit-fullname').value = user.fullname;
  document.querySelector('#edit-email').value = user.email;
});

editForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newFullname = document.querySelector('#edit-fullname').value;
  const newEmail = document.querySelector('#edit-email').value;
  if (!newEmail.includes('@')) {
    alert('Email không hợp lệ.');
    return;
  }
  user.fullname = newFullname;
  user.email = newEmail;
  localStorage.setItem('user', JSON.stringify(user));
  document.querySelector('#fullname').textContent = newFullname;
  document.querySelector('#email').textContent = newEmail;
  editForm.style.display = 'none';
  alert('Thông tin đã được cập nhật.');
});

let calorieGoal = localStorage.getItem('calorieGoal') || 2000;
document.querySelector('#calorie-goal').textContent = calorieGoal;
const goalForm = document.querySelector('#goal-form');
goalForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newGoal = parseInt(document.querySelector('#calorie-target').value);
  if (newGoal > 0) {
    calorieGoal = newGoal;
    localStorage.setItem('calorieGoal', newGoal);
    document.querySelector('#calorie-goal').textContent = newGoal;
    alert('Mục tiêu calo đã được cập nhật.');
  } else {
    alert('Mục tiêu calo phải lớn hơn 0.');
  }
});

const savedMeals = JSON.parse(localStorage.getItem('savedMeals')) || [];
const mealHistoryTable = document.querySelector('#meal-history');
savedMeals.forEach(mealData => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${mealData.date}</td>
    <td>${mealData.totalCalo}</td>
    <td>${mealData.totalProtein}</td>
  `;
  mealHistoryTable.appendChild(row);
});