const options = {
  method: "GET",
  headers: {
    Authorization: "563492ad6f91700001000001cd815c8f5e7f47a08e2ba8ad20316dbe",
  },
};

let rowNode = document.querySelector("main .row");

const displayImages = (images) => {
  rowNode.innerHTML = "";
  for (let image of images) {
    // console.log(image.src);
    let url = image.src.portrait;
    rowNode.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <img src="${url}" class="card-img-top" alt="Album Image">
          <div class="card-body">
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer. ❤️
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button onclick="showModalImg(event)" type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">
                  View
                </button>
                <button onclick="hideCardImage(event)" type="button" class="btn btn-sm btn-outline-secondary">
                  Hide
                </button>
              </div>
              <small class="text-muted">${image.id}</small>
            </div>
          </div>
        </div>
      </div>`;
  }
};

const fetchInfos = (search) => {
  fetch(`https://api.pexels.com/v1/search?query=${search}`, options)
    .then((response) => response.json())
    .then((json) => {
      if (search === "forest") {
        buildCarousel(json.photos);
      } else {
        displayImages(json.photos);
      }
    })
    .catch((err) => {
      displayError(err);
    });
};

const loadFirstImages = () => {
  fetchInfos("cat");
};

const loadSecondImages = () => {
  fetchInfos("dog");
};

const hideCardImage = (event) => {
  let cardNode =
    event.target.parentElement.parentElement.parentElement.parentElement;
  //   console.log(cardNode);
  let imgNode = cardNode.childNodes[1];
  imgNode.style.visibility = "hidden";
};

const searchImages = () => {
  let inputNode = document.querySelector(".form-control");
  fetchInfos(inputNode.value);
};

const buildCarousel = (images) => {
  let carouselNode = document.querySelector(".carousel-inner");
  let prevButtonNode = document.querySelector(".carousel-control-prev");
  for (let i = 0; i < images.length; i++) {
    let imageNode = document.createElement("div");
    let url = images[i].src.landscape;
    if (i === 0) {
      imageNode.classList.add("carousel-item", "active");
    } else {
      imageNode.classList.add("carousel-item");
    }
    imageNode.innerHTML = `<img src="${url}" class="d-block w-100" alt="Album Image">`;
    carouselNode.insertBefore(imageNode, prevButtonNode);
  }
};

const showModalImg = (event) => {
  let modal = document.querySelector(".modal");
  if (modal !== null) {
    modal.parentElement.removeChild(modal);
  }
  let cardNode =
    event.target.parentElement.parentElement.parentElement.parentElement;
  let imgNode = cardNode.childNodes[1];
  let modalNode = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <img
          src="${imgNode.src}"
          alt="" class="img-fluid">
      </div>
    </div>
  </div>
</div> `;
  document.querySelector("body").innerHTML += modalNode;
};

const displayError = (error) => {
  rowNode.parentElement.innerHTML += `<div class="alert alert-danger" role="alert">
    ${error}
  </div>`;
};

let existingAlert = document.querySelector(".alert");

const showAlert = () => {
  setTimeout(function () {
    let cards = document.querySelectorAll(".card");
    if (existingAlert !== null) {
      existingAlert.parentElement.removeChild(existingAlert);
    }
    let alertNode = `<div class="alert alert-primary mt-2 mb-0" role="alert">
    ${cards.length} images loaded
  </div>`;
    let containerNode = document.querySelector("body > main > section > div");
    containerNode.innerHTML += alertNode;
  }, 400);
};

const removeAlert = () => {
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 5000);
};

window.onload = fetchInfos("forest");
