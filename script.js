var slidesContainer = document.getElementById("slideContainer");
var prevButton = document.getElementById("slideArrowPrevious");
var nextButton = document.getElementById("slideArrowNext");
var slide = document.querySelector(".slide");

async function fetchSlides() {
  try {
    const response = await fetch(
      "https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/posts?per_page=12"
    );
    //console.log("the response is", response);
    const reposonseAsJson = await response.json();

    //carouselContainer.innerHTML = "";
    //slidesContainer.innerHTML = "";
    for (let i = 0; i < reposonseAsJson.length; i += 3) {
      name0 = reposonseAsJson[i].title.rendered;
      name1 = reposonseAsJson[i + 1].title.rendered;
      name2 = reposonseAsJson[i + 2].title.rendered;
      id0 = reposonseAsJson[i].id;
      id1 = reposonseAsJson[i + 1].id;
      id2 = reposonseAsJson[i + 2].id;
      mediaId0 = reposonseAsJson[i].featured_media;
      mediaId1 = reposonseAsJson[i + 1].featured_media;
      mediaId2 = reposonseAsJson[i + 2].featured_media;
      //console.log(id1);

      image0 = await fetchMedia(mediaId0);
      image1 = await fetchMedia(mediaId1);
      image2 = await fetchMedia(mediaId2);

      const slide = document.createElement("slide");
      slide.classList.add("slide");

      slide.innerHTML += `
      <div class="slide">
     <a href="blogSpecific.html?id=${id0}">
      <img class="championImage2" src="${image0}">
      <div class=champion> <h4> ${name0} </h4></div>
      <a href="blogSpecific.html?id=${id1}">
      <img class="championImage2" src="${image1}">
      <div class=champion> <h4> ${name1} </h4></div>
      <a href="blogSpecific.html?id=${id2}">
      <img class="championImage2" src="${image2}">
      <div class=champion> <h4> ${name2} </h4></div>
      </div>
      `;

      slidesContainer.appendChild(slide);
    }
  } catch (error) {
    slidesContainer.innerHTML = "An error has occured";
  }
}

async function fetchMedia(postId) {
  try {
    const response = await fetch(
      `https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/media/${postId}`
    );
    //console.log("the media is", response);
    const reposonseAsJson = await response.json();
    //console.log("the rendered is", reposonseAsJson.guid);
    return reposonseAsJson.guid.rendered;
  } catch (error) {
    //console.log(error);
  }
}

async function fetchMoreBlogPosts(page) {
  try {
    const response = await fetch(
      `https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/posts?page=${page}`
    );
    //console.log("the response is", response);
    const reposonseAsJson = await response.json();

    for (let i = 0; i < reposonseAsJson.length; i++) {
      name1 = reposonseAsJson[i].title.rendered;
      id1 = reposonseAsJson[i].id;
      mediaId = reposonseAsJson[i].featured_media;
      summary = reposonseAsJson[i].excerpt.rendered;

      image = await fetchMedia(mediaId);
      //console.log(id1);

      slidesContainer.innerHTML += ` <div class = mySlides>
      <a href="blogSpecific.html?id=${id1}" style="width:33%">
         <img class=blogImage src="${image}" alt="League of legends champion"> </img>
         <div class="champion">
         <h4> ${name1} </h4>
         </div>`;
    }
  } catch (error) {
    slidesContainer.innerHTML = "An error har occured";
  }

  const loading = document.querySelector(".loader");

  setTimeout(function () {
    loading.classList.remove("loader-circle");
  }, 2000);
}

async function initialStuff() {
  await fetchSlides();
}

initialStuff();

function onLeftClick() {
  console.log("leftClick");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
}

function onRightClick() {
  console.log("rightClick");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
}

/* prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
nextButton.addEventListener("click", () => {

  console.log("click");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
}); */
