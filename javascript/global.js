const foods = [
  // Carb
  {
    name: "Bánh mì",
    category: "carb",
    image: "../images/foodgrid/carb/banhmi.jpg",
    calories: 265,
    protein: 9,
  },
  {
    name: "Bắp ngô",
    category: "carb",
    image: "../images/foodgrid/carb/bapngo.jpg",
    calories: 86,
    protein: 3.2,
  },
  {
    name: "Gạo",
    category: "carb",
    image: "../images/foodgrid/carb/gao.jpg",
    calories: 130,
    protein: 2.7,
  },
  {
    name: "Mì",
    category: "carb",
    image: "../images/foodgrid/carb/mi.jpg",
    calories: 158,
    protein: 5.8,
  },
  {
    name: "Ngũ cốc",
    category: "carb",
    image: "../images/foodgrid/carb/ngucoc.jpg",
    calories: 340,
    protein: 8,
  },
  {
    name: "Yến mạch",
    category: "carb",
    image: "../images/foodgrid/carb/yenmach.jpg",
    calories: 389,
    protein: 16.9,
  },
  // Fruit
  {
    name: "Bơ",
    category: "fruit",
    image: "../images/foodgrid/fruit/bo.jpg",
    calories: 160,
    protein: 2,
  },
  {
    name: "Cam",
    category: "fruit",
    image: "../images/foodgrid/fruit/cam.jpg",
    calories: 47,
    protein: 0.9,
  },
  {
    name: "Chuối",
    category: "fruit",
    image: "../images/foodgrid/fruit/chuoi.jpg",
    calories: 89,
    protein: 1.1,
  },
  {
    name: "Dâu tây",
    category: "fruit",
    image: "../images/foodgrid/fruit/dautay.jpg",
    calories: 32,
    protein: 0.7,
  },
  {
    name: "Dưa hấu",
    category: "fruit",
    image: "../images/foodgrid/fruit/duahau.jpg",
    calories: 30,
    protein: 0.6,
  },
  {
    name: "Táo",
    category: "fruit",
    image: "../images/foodgrid/fruit/tao.jpg",
    calories: 52,
    protein: 0.3,
  },
  // Meat
  {
    name: "Thịt bò",
    category: "meat",
    image: "../images/foodgrid/meat/thitbo.jpg",
    calories: 250,
    protein: 26,
  },
  {
    name: "Thịt cá hồi",
    category: "meat",
    image: "../images/foodgrid/meat/thitcahoi.jpg",
    calories: 208,
    protein: 20,
  },
  {
    name: "Thịt cừu",
    category: "meat",
    image: "../images/foodgrid/meat/thitcuu.jpg",
    calories: 294,
    protein: 25,
  },
  {
    name: "Thịt gà",
    category: "meat",
    image: "../images/foodgrid/meat/thitga.jpg",
    calories: 165,
    protein: 31,
  },
  {
    name: "Thịt heo",
    category: "meat",
    image: "../images/foodgrid/meat/thitheo.jpg",
    calories: 242,
    protein: 27,
  },
  {
    name: "Tôm",
    category: "meat",
    image: "../images/foodgrid/meat/tom.jpg",
    calories: 99,
    protein: 24,
  },
  // Vegetable
  {
    name: "Bắp cải",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/bapcai.jpg",
    calories: 25,
    protein: 1.3,
  },
  {
    name: "Cà rốt",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/carot.jpg",
    calories: 41,
    protein: 0.9,
  },
  {
    name: "Dưa leo",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/dualeo.jpg",
    calories: 16,
    protein: 0.7,
  },
  {
    name: "Măng tây",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/mangtay.jpg",
    calories: 20,
    protein: 2.2,
  },
  {
    name: "Rau mồng tơi",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/raumongtoi.jpg",
    calories: 19,
    protein: 1.8,
  },
  {
    name: "Su hào",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/suhao.jpg",
    calories: 27,
    protein: 1.7,
  },
  {
    name: "Súp lơ",
    category: "vegetable",
    image: "../images/foodgrid/vegetable/suplo.jpg",
    calories: 25,
    protein: 1.9,
  },
];

window.foods = foods;

document.addEventListener("DOMContentLoaded", () => {
  // ===== LOGIC CHUNG CÓ SẴN =====
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const dropbtn = dropdown.querySelector(".dropbtn");
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    dropbtn.addEventListener("click", function (event) {
      if (window.location.pathname.includes("/tools.html")) {
        event.preventDefault();
      }
      event.stopPropagation();
      dropdownContent.classList.toggle("show");
    });
    dropdownContent.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        dropdownContent.classList.remove("show");
      }
    });
  }
  window.addEventListener("click", function (event) {
    const dropdownContent = document.querySelector(".dropdown-content");
    if (dropdownContent && dropdownContent.classList.contains("show")) {
      if (!event.target.closest(".dropdown")) {
        dropdownContent.classList.remove("show");
      }
    }
  });

  // ===== LOGIC CHO GIAO DIỆN SÁNG/TỐI VÀ CỠ CHỮ (ĐÃ CẬP NHẬT) =====

  // --- Biến và Phần tử ---
  const themeToggleButton = document.getElementById("theme-toggle");
  const fontSizeToggleButton = document.getElementById("font-size-toggle");
  const moonIcon = "🌙";
  const sunIcon = "☀️";
  const rootElement = document.documentElement; // Thẻ <html>

  // --- Logic cho Giao diện (Theme) ---
  const applyTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.body.classList.add("dark-mode");
      if (themeToggleButton) themeToggleButton.innerHTML = moonIcon;
    } else {
      document.body.classList.remove("dark-mode");
      if (themeToggleButton) themeToggleButton.innerHTML = sunIcon;
    }
  };

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggleButton.innerHTML = moonIcon;
      } else {
        localStorage.setItem("theme", "light");
        themeToggleButton.innerHTML = sunIcon;
      }
    });
  }

  // --- Logic cho Cỡ chữ (Font Size) - ĐÃ NÂNG CẤP LÊN 4 CẤP ĐỘ ---
  const fontSizes = ["m", "l", "xl", "s"]; // Chu trình: Vừa -> Lớn -> Rất Lớn -> Nhỏ

  const applyFontSize = () => {
    const savedSize = localStorage.getItem("fontSize") || "m"; // Mặc định là 'm'
    rootElement.setAttribute("data-font-size", savedSize);
  };

  if (fontSizeToggleButton) {
    fontSizeToggleButton.addEventListener("click", () => {
      // Lấy cỡ chữ hiện tại từ thuộc tính data, nếu không có thì mặc định là 'm'
      const currentSize = rootElement.getAttribute("data-font-size") || "m";

      // Tìm vị trí của cỡ hiện tại trong chu trình
      const currentIndex = fontSizes.indexOf(currentSize);

      // Lấy vị trí của cỡ tiếp theo, quay vòng lại từ đầu nếu hết
      const nextIndex = (currentIndex + 1) % fontSizes.length;

      // Lấy cỡ chữ mới
      const newSize = fontSizes[nextIndex];

      // Cập nhật giao diện và lưu vào localStorage
      rootElement.setAttribute("data-font-size", newSize);
      localStorage.setItem("fontSize", newSize);
    });
  }

  // --- Áp dụng cả hai cài đặt khi tải trang ---
  applyTheme();
  applyFontSize();
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (cursorDot && cursorRing) {
    // Vị trí của con trỏ chuột
    let mouseX = 0;
    let mouseY = 0;

    // Vị trí của vòng sáng (sẽ đi theo con trỏ)
    let ringX = 0;
    let ringY = 0;

    // Tốc độ di chuyển của vòng sáng (số càng nhỏ, càng trễ)
    const speed = 0.15;

    // Hàm cập nhật vị trí con trỏ
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hàm tạo animation
    const animateCursor = () => {
      // Cập nhật vị trí của chấm tròn (theo chuột ngay lập tức)
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Tính toán và cập nhật vị trí của vòng sáng một cách mượt mà
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      // Lặp lại animation ở khung hình tiếp theo
      requestAnimationFrame(animateCursor);
    };

    // Bắt đầu animation
    animateCursor();
  }
});
