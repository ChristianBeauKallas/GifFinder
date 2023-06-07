const apiKey= "EioowPzkpK23NP4jNbLR8442NoZxMpqL"
let lastSearch = "";  // Save the last search input

window.onload = function() {
    setTimeout(function() {
        document.getElementById('typingHeader').style.display = 'none';
    }, 2000);
}

function catFetch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#searchGif").value;
    console.log(searchInput);
    lastSearch = searchInput;  // Save the search input
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
        document.getElementById("searchGif").classList.add("btnHidden");  // Hide the search input
        document.getElementById("buttonContainer").classList.remove("btnHidden");  // Show the buttons
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

document.getElementById("saveButton").addEventListener("click", function(event) {
    const img = document.querySelector("#gif1");

    fetch(img.src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.gif';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.log(error.message);
        });
});

document.getElementById("regenerateButton").addEventListener("click", function(event) {
    document.querySelector("#searchGif").value = lastSearch;
    catFetch(event);
});

document.getElementById("newSearchButton").addEventListener("click", function(event) {
    document.getElementById("searchGif").classList.remove("btnHidden");  // Show the search input
    document.getElementById("buttonContainer").classList.add("btnHidden");  // Hide the buttons
    document.querySelector("#gif1").classList.add("hidden");  // Hide the gif
});


