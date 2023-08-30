import Swiper from "swiper";
import { Pagination, Navigation, EffectCards } from "swiper/modules";
import preset from "jss-preset-default";
import jss from "jss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

jss.setup(preset());

class Review {
  constructor(imageSrc, name, status, review, mark) {
    this.imageSrc = imageSrc;
    this.name = name;
    this.status = status;
    this.mark = mark;
    this.review = review;
    this.styles = jss
      .createStyleSheet({
        reviewSlide: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "1030px",
        },
        reviewsImage: {
          width: "100px",
          height: "100px",
          borderRadius: "15px",
          objectFit: "cover",
        },
        review: {
          fontFamily: "Raleway",
          color: "#777",
          fontSize: "16px",
          lineHeight: "26px",
          textAlign: "center",
          marginTop: "30px",
        },
        name: {
          color: "#5E2727",
          fontFamily: "Raleway",
          fontSize: "24px",
          fontWeight: 700,
          marginTop: "62px",
        },
        status: {
          fontFamily: "Raleway",
          fontSize: "16px",
          fontWeight: 300,
        },
        stars: {
          display: "flex",
          marginTop: "13px",
        },
        star: {
          marginLeft: "10px",
        },
        reviewSlideWrap: {
          display: "flex",
          justifyContent: "center",
        },
      })
      .attach();
  }

  get getStars() {
    let markString = "";
    for (let i = 1; i <= 5; i++) {
      const color = i <= this.mark ? "#FFBC00" : "#777";
      markString += `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            fill="${color}"
            class="${i > 1 ? this.styles.classes.star : ""}"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>`;
    }
    return markString;
  }

  get getView() {
    return `<div class="swiper-slide ${this.styles.classes.reviewSlide}">
                    <div class="${this.styles.classes.reviewSlide}">
                        <img class="${this.styles.classes.reviewsImage}" width="100px" height="100px" src="${this.imageSrc}" alt="${this.name}" draggable="false"/>
                        <p class="${this.styles.classes.review}">${this.review}</P>
                        <span class="${this.styles.classes.name}">${this.name}</span>
                        <span class="${this.styles.classes.status}">${this.status}</span>
                        <div class="${this.styles.classes.stars}">${this.getStars}</div>
                    </div>
                </div>`;
  }
}

const reviews = [
  new Review(
    "./assets/img/man.jfif",
    "Craig Berthed",
    "Client",
    "Lorem Ipsum is simply dummy text of the printing & typesetting their industry. Lorem Ipsum has been the industry their standard dummy text ever since the 1500s, when an unknown printers tooks a galley of types and scrambled to makes a types theirs specimen book. It’s has survived not only five centuries,  but also the leap into electronics types settings, remaining the essentially unchanged. It was popularized in the 1960s with the Letterset sheets.",
    5
  ),
  new Review(
    "./assets/img/man.jfif",
    "Craig Berthed",
    "Client",
    "Lorem Ipsum is simply dummy text of the printing & typesetting their industry. Lorem Ipsum has been the industry their standard dummy text ever since the 1500s, when an unknown printers tooks a galley of types and scrambled to makes a types theirs specimen book. It’s has survived not only five centuries,  but also the leap into electronics types settings, remaining the essentially unchanged. It was popularized in the 1960s with the Letterset sheets.",
    3
  ),
];

const reviewsContainer = document
  .querySelector(".reviews")
  .querySelector(".swiper-wrapper");

reviews.forEach((slide) => {
  reviewsContainer.innerHTML += slide.getView;
});
const reviewsPaginationClasses = jss
  .createStyleSheet({
    bullet: {
      display: "inline-block",
      width: "13px",
      height: "13px",
      background: "#5E2727",
      borderRadius: "50%",
      marginRight: "10px",
    },
    active: {
      background: "#5E2727",
      opacity: 1,
    },
  })
  .attach();

new Swiper(".reviews", {
  modules: [Pagination, Navigation],
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass: `swiper-pagination-bullet`,
    renderBullet: (index, className) => {
      return `<span class="${className} ${reviewsPaginationClasses.classes.bullet}"></span>`;
    },
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

new Swiper(".projects", {
  modules: [Navigation, EffectCards],
  effect: "cards",
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});
const topMenu = document.querySelector(".top-menu");
const topMenuLinks = document.querySelectorAll(".top-menu__link");
const sections = document.querySelectorAll("section");
const contactus = document.getElementById("contactus");

if (topMenu) {
  const fixedStart = topMenu.offsetTop;
  window.addEventListener("scroll", () => {
    if (window.scrollY >= fixedStart) topMenu.classList.add("top-menu_fixed");
    else topMenu.classList.remove("top-menu_fixed");
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop && section.id) {
        topMenuLinks.forEach((k) => {
          k.classList.remove("top-menu__link_active");
        });
        document
          .querySelector(`a[href="#${section.id}"]`)
          .classList.add("top-menu__link_active");
      } else {
        document
          .querySelector(`a[href="#${section.id}"]`)
          .classList.remove("top-menu__link_active");
      }
    });
    if (window.scrollY >= contactus.offsetTop) {
      topMenuLinks.forEach((k) => {
        k.classList.remove("top-menu__link_active");
      });
      document
        .querySelector(`a[href="#contactus"]`)
        .classList.add("top-menu__link_active");
    }
  });
}

/*topMenuLinks.forEach((x) => {
  x.addEventListener("click", () => {
    topMenuLinks.forEach((k) => {
      k.classList.remove("top-menu__link_active");
    });
    x.classList.add("top-menu__link_active");
  });
});*/
