const querystring= document.location.search;
const params = new URLSearchParams(querystring);

const id = params.get("id");

console.log (id);

const detailsContainer = document.querySelector(".blogDetails");

async function BlogPost (test) {
    try {
        const response = await fetch (`https://www.kinejakobsenleagueoflegends.tech/wp-json/wp/v2/posts/${test}`)
        const reposonseAsJson = await response.json();
        console.log(reposonseAsJson);
        //createHTML(reposonseAsJson)
    } catch (error) { 
        detailsContainer.innerHTML = "An error has occured";
    } 
}

BlogPost(id);