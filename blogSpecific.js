const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const id = params.get("id");

console.log(id);

const detailsContainer = document.querySelector(".blogDetails");

async function BlogPost(test) {
  try {
    const response = await fetch(
      `https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/posts/${test}`
    );
    const reposonseAsJson = await response.json();
    console.log(reposonseAsJson);
    mediaId = reposonseAsJson.featured_media;
    image = await fetchMedia(mediaId);
    createHTML(reposonseAsJson, image);
  } catch (error) {
    detailsContainer.innerHTML = "An error has occured";
  }

  const loading = document.querySelector(".loader");

  setTimeout(function () {
    loading.classList.remove("loader-circle");
  }, 2000);
}

function createHTML(champion, image) {
  detailsContainer.innerHTML = `<div class=championPost> <h1> ${champion.title.rendered} </h1>
<img class=championimage img id=championimage src="${image}">
<div class="ChampionStory">  ${champion.content.rendered}  </div> </div>
<div id="modalImage" class="modal">
  <div class="modalContent">
    <span class="close">&times;</span>
    <img class=championimage img src="${image}">
  </div>

</div>
`;

  var modal = document.getElementById("modalImage");

  var btn = document.getElementById("championimage");

  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function imageClick() {}

async function fetchMedia(id) {
  try {
    const response = await fetch(
      `https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/media/${id}`
    );
    console.log("the media is", response);
    const reposonseAsJson = await response.json();
    return reposonseAsJson.guid.rendered;
  } catch (error) {
    console.log(error);
  }
}

BlogPost(id);
