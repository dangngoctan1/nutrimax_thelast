document.addEventListener("DOMContentLoaded", function () {
  const calculateBtnBmi = document.getElementById("calculate-btn-bmi");
  const resultAreaBmi = document.getElementById("result-area-bmi");

  // Hàm xử lý việc chuyển đổi active class cho các nhóm nút
  function setupToggleBmi(groupId) {
    const group = document.getElementById(groupId);
    if (group) {
      group.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          const buttons = group.querySelectorAll("button");
          buttons.forEach((btn) => btn.classList.remove("active"));
          e.target.classList.add("active");
        }
      });
    }
  }

  // Khởi tạo cho các nhóm nút trong BMI
  setupToggleBmi("gender-group");
  setupToggleBmi("height-unit-group");
  setupToggleBmi("weight-unit-group");

  if (calculateBtnBmi) {
    calculateBtnBmi.addEventListener("click", () => {
      const age = parseFloat(document.getElementById("age-bmi").value);
      let height = parseFloat(document.getElementById("height-bmi").value);
      let weight = parseFloat(document.getElementById("weight-bmi").value);

      const heightUnit = document.querySelector("#height-unit-group .active")
        .dataset.unit;
      const weightUnit = document.querySelector("#weight-unit-group .active")
        .dataset.unit;

      if (
        isNaN(age) ||
        isNaN(height) ||
        isNaN(weight) ||
        age <= 0 ||
        height <= 0 ||
        weight <= 0
      ) {
        resultAreaBmi.innerHTML = `<p style="color: #dc3545;">Vui lòng nhập đầy đủ và chính xác các thông tin.</p>`;
        resultAreaBmi.style.backgroundColor = "#f8d7da";
        return;
      }

      if (heightUnit === "cm") {
        height = height / 100;
      } else if (heightUnit === "ft") {
        height = height * 0.3048;
      }

      if (weightUnit === "lb") {
        weight = weight * 0.453592;
      }

      const bmi = weight / (height * height);
      const bmiScore = bmi.toFixed(1);

      let category = "";
      let color = "";

      if (bmiScore < 18.5) {
        category = "Thiếu cân (Gầy)";
        color = "#007bff";
      } else if (bmiScore >= 18.5 && bmiScore <= 24.9) {
        category = "Bình thường";
        color = "#28a745";
      } else if (bmiScore >= 25 && bmiScore <= 29.9) {
        category = "Thừa cân";
        color = "#ffc107";
      } else if (bmiScore >= 30 && bmiScore <= 34.9) {
        category = "Béo phì độ I";
        color = "#fd7e14";
      } else {
        category = "Béo phì độ II";
        color = "#dc3545";
      }

      resultAreaBmi.innerHTML = `
    <p>Chỉ số BMI của bạn là:</p>
    <p class="bmi-score" style="color: ${color};">${bmiScore}</p>
    <p>Tình trạng cơ thể: <strong style="color: ${color};">${category}</strong></p>
`;
      resultAreaBmi.style.backgroundColor = `${color}20`;
    });
  }
  const calculateBtnIw = document.getElementById("calculate-btn-iw");
  const resultAreaIw = document.getElementById("result-area-iw");

  // Khởi tạo toggle cho các nút trong công cụ Cân nặng lý tưởng
  setupToggleBmi("gender-group-iw");
  setupToggleBmi("height-unit-group-iw");

  if (calculateBtnIw) {
    calculateBtnIw.addEventListener("click", () => {
      let height = parseFloat(document.getElementById("height-iw").value);
      const gender = document.querySelector("#gender-group-iw .active").dataset
        .value;
      const heightUnit = document.querySelector("#height-unit-group-iw .active")
        .dataset.unit;

      if (isNaN(height) || height <= 0) {
        resultAreaIw.innerHTML = `<p style="color: #dc3545;">Vui lòng nhập chiều cao hợp lệ.</p>`;
        resultAreaIw.style.backgroundColor = "#f8d7da";
        return;
      }

      // Chuyển chiều cao sang cm nếu cần
      if (heightUnit === "ft") {
        // Giả sử người dùng nhập feet, chuyển sang cm (1 ft = 30.48 cm)
        height = height * 30.48;
      }

      // Công thức Robinson tính cân nặng lý tưởng
      let idealWeight;
      const heightInInches = height / 2.54;

      if (gender === "male") {
        // Nam: 52 kg + 1.9 kg cho mỗi inch trên 5 feet
        idealWeight = 52 + 1.9 * (heightInInches - 60);
      } else {
        // Nữ: 49 kg + 1.7 kg cho mỗi inch trên 5 feet
        idealWeight = 49 + 1.7 * (heightInInches - 60);
      }

      if (idealWeight < 0) {
        resultAreaIw.innerHTML = `<p style="color: #dc3545;">Chiều cao không hợp lệ để tính toán.</p>`;
        resultAreaIw.style.backgroundColor = "#f8d7da";
        return;
      }

      const resultWeight = idealWeight.toFixed(1);

      resultAreaIw.innerHTML = `
            <p>Gợi ý cân nặng lý tưởng của bạn là:</p>
            <p class="bmi-score" style="color: var(--primary-color);">${resultWeight} kg</p>
        `;
      resultAreaIw.style.backgroundColor = `var(--background-color)`;
    });
  }
  // --- Tool visibility logic ---
  const allTools = document.querySelectorAll(".tool");

  function hideAllTools() {
    allTools.forEach((tool) => {
      tool.style.display = "none";
    });
  }

  function showTool(toolId) {
    hideAllTools();
    const toolToShow = document.getElementById(toolId);
    if (toolToShow) {
      toolToShow.style.display = "block";
    } else {
      // If no valid toolId is found, show the first tool as a default
      const defaultTool = document.querySelector(".tool");
      if (defaultTool) {
        defaultTool.style.display = "block";
      }
    }
  }

  function handleHashChange() {
    const hash = window.location.hash.substring(1); // remove the '#'
    if (hash) {
      showTool(hash);
    } else {
      // Show the BMI tool by default if no hash is present
      showTool("bmi");
    }
  }

  // Handle initial page load
  handleHashChange();

  // Listen for hash changes to show/hide tools without a full page reload
  window.addEventListener("hashchange", handleHashChange);

  // --- Original calculation functions and event listeners ---

  function calculateBMR(age, gender, weight, height) {
    if (
      age < 10 ||
      age > 100 ||
      weight < 30 ||
      weight > 300 ||
      height < 100 ||
      height > 250
    )
      return null;
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return bmr.toFixed(0);
  }

  function calculateTDEE(bmr, activity) {
    const factors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };
    return (bmr * (factors[activity] || 1.2)).toFixed(0);
  }

  function calculateWaterIntake(weight, activity) {
    if (weight < 30 || weight > 300) return null;
    const base = weight * 0.033;
    const activityAdd = { low: 0, medium: 0.5, high: 1 };
    return (base + (activityAdd[activity] || 0)).toFixed(1);
  }

  const bmiForm = document.querySelector("#bmi form");
  const bmiResult = document.querySelector("#bmi .result");
  if (bmiForm) {
    bmiForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const weight = parseFloat(document.querySelector("#weight").value);
      const height = parseFloat(document.querySelector("#height").value);
      const result = calculateBMI(weight, height);
      bmiResult.innerHTML = result
        ? `<p>BMI của bạn là: ${result.bmi}</p><p>Phân loại: ${result.category}</p>`
        : "<p>Cân nặng (30-300 kg) hoặc chiều cao (100-250 cm) không hợp lệ.</p>";
    });
  }

  const bmrForm = document.querySelector("#bmr-tdee form");
  const bmrResult = document.querySelector("#bmr-tdee .result");
  if (bmrForm) {
    bmrForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const age = parseInt(document.querySelector("#age").value);
      const gender = document.querySelector("#gender").value;
      const weight = parseFloat(document.querySelector("#weight-bmr").value);
      const height = parseFloat(document.querySelector("#height-bmr").value);
      const activity = document.querySelector("#activity").value;
      const bmr = calculateBMR(age, gender, weight, height);
      bmrResult.innerHTML = bmr
        ? `<p>BMR: ${bmr} calo/ngày</p><p>TDEE: ${calculateTDEE(
            bmr,
            activity
          )} calo/ngày</p>`
        : "<p>Tuổi (10-100), cân nặng (30-300 kg), hoặc chiều cao (100-250 cm) không hợp lệ.</p>";
    });
  }

  const waterForm = document.querySelector("#water-intake form");
  const waterResult = document.querySelector("#water-intake .result");
  if (waterForm) {
    waterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const weight = parseFloat(document.querySelector("#weight-water").value);
      const activity = document.querySelector("#activity-water").value;
      const result = calculateWaterIntake(weight, activity);
      waterResult.innerHTML = result
        ? `<p>Lượng nước cần uống: ${result} lít/ngày</p>`
        : "<p>Cân nặng (30-300 kg) không hợp lệ.</p>";
    });
  }
});
