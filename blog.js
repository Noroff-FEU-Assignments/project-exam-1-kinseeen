const resultsContainer = document.querySelector(".blogContainer");

async function fetchInformation() {
  try {
    const response = await fetch(
      "https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/posts"
    );
    console.log("the response is", response);
    const reposonseAsJson = await response.json();

    resultsContainer.innerHTML = "";
    for (let i = 0; i < reposonseAsJson.length; i++) {
      name = reposonseAsJson[i].title.rendered;
      id = reposonseAsJson[i].id;
      mediaId = reposonseAsJson[i].featured_media;
      summary = reposonseAsJson[i].excerpt.rendered;
      //image = reposonseAsJson[i]._links["wp:featuredmedia"][0].href;

      image = await fetchMedia(mediaId);
      console.log(id);
      resultsContainer.innerHTML += `<div class = blogPost> <a href="blogSpecific.html?id=${id}"> 
            <img class=blogImage src="${image}"</img>
            <div class="Champion"> <h2> ${name} <h2> </div>
      <div class="Summary" ${summary} </div>`;
    }
    //<div class="blogPost"></div>

  } catch (error) {
    resultsContainer.innerHTML = "An error har occured";
  }
}

async function fetchMedia(postId) {
    try {
        const response = await fetch(
            `https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/media/${postId}`
          );
          console.log("the media is", response);
          const reposonseAsJson = await response.json();
          return reposonseAsJson.guid.rendered;
    } catch (error) {
        console.log(error);
        
    }
}

fetchInformation();
