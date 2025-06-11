function calculateBMI(weight, height) {
  if (weight < 30 || weight > 300 || height < 100 || height > 250) return null;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category;
  if (bmi < 18.5) category = 'Thiếu cân';
  else if (bmi < 25) category = 'Bình thường';
  else if (bmi < 30) category = 'Thừa cân';
  else category = 'Béo phì';
  return { bmi: bmi.toFixed(1), category };
}

function calculateIdealWeight(height, gender) {
  if (height < 100 || height > 250) return null;
  let ideal;
  if (gender === 'male') {
    ideal = 50 + 0.91 * (height - 152);
  } else {
    ideal = 45.5 + 0.91 * (height - 152);
  }
  return ideal.toFixed(1);
}

function calculateBMR(age, gender, weight, height) {
  if (age < 10 || age > 100 || weight < 30 || weight > 300 || height < 100 || height > 250) return null;
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return bmr.toFixed(0);
}

function calculateTDEE(bmr, activity) {
  const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, 'very-active': 1.9 };
  return (bmr * (factors[activity] || 1.2)).toFixed(0);
}

function calculateWaterIntake(weight, activity) {
  if (weight < 30 || weight > 300) return null;
  const base = weight * 0.033;
  const activityAdd = { low: 0, medium: 0.5, high: 1 };
  return (base + (activityAdd[activity] || 0)).toFixed(1);
}

const bmiForm = document.querySelector('#bmi form');
const bmiResult = document.querySelector('#bmi .result');
bmiForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const weight = parseFloat(document.querySelector('#weight').value);
  const height = parseFloat(document.querySelector('#height').value);
  const result = calculateBMI(weight, height);
  bmiResult.innerHTML = result ?
    `<p>BMI của bạn là: ${result.bmi}</p><p>Phân loại: ${result.category}</p>` :
    '<p>Cân nặng (30-300 kg) hoặc chiều cao (100-250 cm) không hợp lệ.</p>';
});

const iwForm = document.querySelector('#ideal-weight form');
const iwResult = document.querySelector('#ideal-weight .result');
iwForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const height = parseFloat(document.querySelector('#height-iw').value);
  const gender = document.querySelector('#gender-iw').value;
  const result = calculateIdealWeight(height, gender);
  iwResult.innerHTML = result ?
    `<p>Cân nặng lý tưởng: ${result} kg</p>` :
    '<p>Chiều cao (100-250 cm) không hợp lệ.</p>';
});

const bmrForm = document.querySelector('#bmr-tdee form');
const bmrResult = document.querySelector('#bmr-tdee .result');
bmrForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const age = parseInt(document.querySelector('#age').value);
  const gender = document.querySelector('#gender').value;
  const weight = parseFloat(document.querySelector('#weight-bmr').value);
  const height = parseFloat(document.querySelector('#height-bmr').value);
  const activity = document.querySelector('#activity').value;
  const bmr = calculateBMR(age, gender, weight, height);
  bmrResult.innerHTML = bmr ?
    `<p>BMR: ${bmr} calo/ngày</p><p>TDEE: ${calculateTDEE(bmr, activity)} calo/ngày</p>` :
    '<p>Tuổi (10-100), cân nặng (30-300 kg), hoặc chiều cao (100-250 cm) không hợp lệ.</p>';
});

const waterForm = document.querySelector('#water-intake form');
const waterResult = document.querySelector('#water-intake .result');
waterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const weight = parseFloat(document.querySelector('#weight-water').value);
  const activity = document.querySelector('#activity-water').value;
  const result = calculateWaterIntake(weight, activity);
  waterResult.innerHTML = result ?
    `<p>Lượng nước cần uống: ${result} lít/ngày</p>` :
    '<p>Cân nặng (30-300 kg) không hợp lệ.</p>';
});