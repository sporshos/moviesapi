const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");
const rowwContainer = document.querySelector(".roww");

const getMovies = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    showMovies(data.results);
};

const showMovies = (data) => {
    console.log(data);
    moiveBox.innerHTML = "";

    data.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");

        // Round vote_average to one decimal place
        const roundedVoteAverage = item.vote_average.toFixed(1);

        box.innerHTML = `
            <div class="box" style="width: 148.13px; height: 245.59px;">
                <img src="${IMGPATH + item.poster_path}" alt="" style="width: 100%; height: 100%;">
                <h4 class="text-white" id="title" style="fon-size: 14px;">${item.original_title}</h4>
                <div class="overlay">
                    <div class="title">
                        <h2 class="h5">Dual Audio ORG</h2>
                    </div>
                    <div class="span"> <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${roundedVoteAverage}</span></div>
                    <div class="play"> <i class="fa-solid fa-play" style="color: #ffffff;"></i></div>
                </div>
            </div>`;
        moiveBox.appendChild(box);
    });

    // Calculate the number of rows and adjust the height accordingly
    const numItems = data.length;
    const numItemsPerRow = 4; // Adjust this based on your layout
    const numRows = Math.ceil(numItems / numItemsPerRow);
    const boxHeight = 245.59; // Height of each box
    const margin = 10; // Margin between boxes

    const rowwHeight = numRows * (boxHeight + margin) + "px";

    rowwContainer.style.height = rowwHeight;
};

const search = document.querySelector("#search");
search.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value);
        } else {
            getMovies(APIURL);
        }
    }else if(event.target.value === ""){
        getMovies(APIURL)
    }
     else {
        getMovies(APIURL);
    }
});

getMovies(APIURL);
