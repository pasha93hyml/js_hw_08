import galleryItems from "../gallery-items.js";


let refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    lightboxImage: document.querySelector(".lightbox__image"),
    lightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
}


function render() {
    galleryItems.forEach((img)=>{
        refs.gallery.insertAdjacentHTML( "afterbegin",
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

render(galleryItems);



/* Open Lightbox */

refs.gallery.addEventListener("click",(event)=>{
    event.preventDefault();
    if(event.target.nodeName !=="IMG"){
        return;
    }
    refs.lightbox.classList.add('is-open');
    
    refs.lightboxImage.src = event.target.dataset.source;
    window.addEventListener("keydown",closeLightboxEsc)
})

/* Close Lightbox */
refs.lightboxBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImage.src = "";
}

function closeLightboxEsc(event) {
    if(event.key === "Escape"){
       closeLightbox()
    }
}
