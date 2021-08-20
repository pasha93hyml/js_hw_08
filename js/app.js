import galleryItems from "../gallery-items.js";

class Gallery {
  constructor(gallerySelector, modalSelector, imgSelector) {
    this.gallery = document.querySelector(gallerySelector);
    this.modal = document.querySelector(modalSelector);
    this.img = document.querySelector(imgSelector);
  }

  render(imagesArr) {
    imagesArr.forEach((img) => {
      this.gallery.insertAdjacentHTML(
        "afterbegin",
        `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${img.original}
      >
        <img
          class="gallery__image"
          src=${img.preview}
          data-source=${img.original}
          alt='${img.description}'
        />
      </a>
    </li>`
      );
    });
  }
}

let sunflowersGallery = new Gallery(
  ".js-gallery",
  ".js-lightbox",
  ".lightbox__image"
);

sunflowersGallery.render(galleryItems);
sunflowersGallery.gallery.addEventListener("click", onClickGallery);
sunflowersGallery.modal.addEventListener("click", closeImg);


function onClickGallery(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  sunflowersGallery.img.src = event.target.dataset.source;
  sunflowersGallery.modal.classList.add("is-open");
  window.addEventListener("keydown", nextOrPrevImg);
  window.addEventListener("keydown", keyClose);
}

function closeImg(event) {
  let node = event.target.nodeName;
  if (node === "BUTTON" || node !== "IMG") {
    sunflowersGallery.modal.classList.remove("is-open");
    sunflowersGallery.img.src = "";
    window.removeEventListener("keydown", nextOrPrevImg);
  window.removeEventListener("keydown", keyClose);
  }
}

function keyClose(event) {
  if (event.key === "Escape") {
    sunflowersGallery.modal.classList.remove("is-open");
    sunflowersGallery.img.src = "";
  }
}

function nextOrPrevImg(event) {
  let imgs = sunflowersGallery.gallery.querySelectorAll(".gallery__image");
  if (event.key === "ArrowRight") {
    nextImg(imgs);
  }
  if (event.key === "ArrowLeft") {
    prevImg(imgs);
  }
}

function nextImg(images) {
  if (event.key === "ArrowRight") {
    for (let i = 0; i < images.length; i += 1) {
      if (
        sunflowersGallery.img.src === images[images.length - 1].dataset.source
      ) {
        break;
      }
      if (sunflowersGallery.img.src === images[i].dataset.source) {
        sunflowersGallery.img.src = images[i + 1].dataset.source;
        break;
      }
    }
  }
}

function prevImg(images) {
  if (event.key === "ArrowLeft") {
    for (let i = 0; i < images.length; i += 1) {
      if (sunflowersGallery.img.src === images[0].dataset.source) {
        break;
      }
      if (sunflowersGallery.img.src === images[i].dataset.source) {
        sunflowersGallery.img.src = images[i - 1].dataset.source;
        break;
      }
    }
  }
}
