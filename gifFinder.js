console.log("Hello Mars we are linked");

const apiKey= "EioowPzkpK23NP4jNbLR8442NoZxMpqL"

window.onload = function() {
    setTimeout(function() {
        document.getElementById('typingHeader').style.display = 'none';
    }, 4000);
}


function catFetch(){
    event.preventDefault();
    let searchInput = document.querySelector("#searchGif").value;
    console.log(searchInput);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchInput}`)
    .then((response)=>{
        const result = response.json()
        console.log(result)
        return result;
    })
    
    .then((objectReturned)=>{
        console.log(objectReturned.data);
        const img = document.querySelector("#gif1");

        img.classList.remove("hidden")
        img.src = objectReturned.data.images.original.url;
        searchGif.value = "";
    })
    .catch((err)=> {
        console.log(err.message)
    })
}

document.getElementById("searchGif").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        catFetch(event);
    }
});

// document.getElementById("searchButton").addEventListener("click", catFetch);






