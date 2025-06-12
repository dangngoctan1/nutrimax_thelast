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
  const header = document.querySelector("header");

  // Header scroll effect logic
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // --- Dropdown Menu Logic ---
  const dropdown = document.querySelector(".dropdown");

  if (dropdown) {
    const dropbtn = dropdown.querySelector(".dropbtn");
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    dropbtn.addEventListener("click", function (event) {
      // If on tools.html, prevent the link from reloading the page
      if (window.location.pathname.includes("/tools.html")) {
        event.preventDefault();
      }
      // Stop the click from bubbling up to the window listener
      event.stopPropagation();
      // Toggle the .show class to display/hide the dropdown
      dropdownContent.classList.toggle("show");
    });

    // Close dropdown when a link inside it is clicked
    dropdownContent.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        dropdownContent.classList.remove("show");
      }
    });
  }

  // Close the dropdown if the user clicks anywhere outside of it
  window.addEventListener("click", function (event) {
    const dropdownContent = document.querySelector(".dropdown-content");
    if (dropdownContent && dropdownContent.classList.contains("show")) {
      if (!event.target.closest(".dropdown")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
});
