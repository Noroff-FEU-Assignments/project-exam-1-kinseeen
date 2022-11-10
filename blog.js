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
      id1 = reposonseAsJson[i].id;
      mediaId = reposonseAsJson[i].featured_media;
      summary = reposonseAsJson[i].excerpt.rendered;
      
      image = await fetchMedia(mediaId);
      console.log(id1);
      resultsContainer.innerHTML += `<div class = blogPost> <a href="blogSpecific.html?id=${id1}"> 
            <img class=blogImage src="${image}"</img>
            <div class="Champion"> <h2> ${name} <h2> </div>
      `;
    }
    //<div class="Summary" ${summary} </div></div>

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

    const loading = document.querySelector(".loader");

    setTimeout(function () {
      loading.classList.remove("loader-circle");
    }, 2000);
}

fetchInformation();
