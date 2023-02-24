$(document).ready(function () {
  $(".form-element-input").change(function () {
    if ($(this).val()) {
      $(this).addClass("hasValue");
    } else {
      $(this).removeClass("hasValue");
    }
  });
});



$(document).change(function () {
  $(".form-element-input").change(function () {
    if ($(this).val()) {
      $(this).addClass("hasValue");
    } else {
      $(this).removeClass("hasValue");
    }
  });
});

$(".form-element-input").change(function () {
  if ($(this).val()) {
    $(this).addClass("hasValue");
  } else {
    $(this).removeClass("hasValue");
  }
});

document.onload = start();
window.onload = start();

function start() {
  $(".form-element-input").change(function () {
    if ($(this).val()) {
      $(this).addClass("hasValue");
    } else {
      $(this).removeClass("hasValue");
    }
  });
}
//landing

// const hamburger_menu = document.querySelector(".hamburger-menu");
// const navbar = document.querySelector("header nav");
// const links = document.querySelectorAll(".links a");

// const changeColor = () => {
//   if (window.scrollY >= 100) {
//     navbar.classList.add("nav_bg");
//   } else {
//     navbar.classList.remove("nav_bg");
//   }
// };

// window.addEventListener("scroll", changeColor);

// function closeMenu() {
//   navbar.classList.remove("open");
//   document.body.classList.remove("stop-scrolling");
// }

// hamburger_menu.addEventListener("click", () => {
//   if (!navbar.classList.contains("open")) {
//     navbar.classList.add("open");
//     document.body.classList.add("stop-scrolling");
//   } else {
//     closeMenu();
//   }
// });

// links.forEach((link) => link.addEventListener("click", () => closeMenu()));

// const menuLinks = document.querySelectorAll(".menu-link");

// menuLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     menuLinks.forEach((link) => {
//       link.classList.remove("is-active");
//     });
//     link.classList.add("is-active");
//   });
// });

// Tabs Action
// const tabLink = document.querySelectorAll(".tab-menu-link");
// const tabContent = document.querySelectorAll(".tab-bar-content");

// tabLink.forEach((item) => {
//   item.addEventListener("click", activeTab);
// });

// function activeTab(item) {
//   const btnTarget = item.currentTarget;
//   const content = btnTarget.dataset.content;

//   tabContent.forEach((item) => {
//     item.classList.remove("is-active");
//   });

//   tabLink.forEach((item) => {
//     item.classList.remove("is-active");
//   });

//   document.querySelector("#" + content).classList.add("is-active");
//   btnTarget.classList.add("is-active");
// }

$(document).ready(function () {
  $(".form-element-input").change(function () {
    if ($(this).val()) {
      $(this).addClass("hasValue");
    } else {
      $(this).removeClass("hasValue");
    }
  });
});

// const hamburger_menu = document.querySelector(".hamburger-menu");
// const navbar = document.querySelector(".nav-ul");

// hamburger_menu.addEventListener("click", () => {
//   hamburger_menu.classList.toggle("change");
//   navbar.classList.toggle("new-ul");
// });

// document.querySelectorAll(".nav-li a").forEach((a) =>
//   a.addEventListener("click", () => {
//     hamburger_menu.classList.remove("change");
//   })
// );
