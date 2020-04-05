
let APIvalue = "AIzaSyDa4TgdW_Z4t-f5Nsd8Agm8HSEaimYgQlU";
let search = document.getElementById("search");
let keywordValue = "Doctor who";
let videosToShow = document.getElementById("videos");
let body = document.querySelector("body");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let nextPage = "";
let previousPage = "";
next.disabled = true;
previous.disabled = true;

function searchNow(){

  search.addEventListener( 'click', (event) => {
         event.preventDefault();
         keywordValue = document.getElementById("Keyword").value;
         let request = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIvalue}&q=${keywordValue}&maxResults=10`; //Default value on api is GET so no need to add it.
         fetchValue(request);
     });
}

function fetchValue(request){

  fetch(request)
     .then(receivedResponse => {
         if(receivedResponse.ok ){
             return receivedResponse.json(); //return the response
         }else{
           console.log("Error on fetch")
         }
     })

     .then(videoList => {
                 displayResults(videoList);
             })
}

function displayResults( videoList ){
    videosToShow.innerHTML = "";
    previousPage = videoList.prevPageToken;
    nextPage = videoList.nextPageToken;
    for( var i in videoList.items){
        let video = videoList.items[i];
        videosToShow.innerHTML = videosToShow.innerHTML + `
        <div id = "videoBox">
               <p class="videoTitle">
                    <a href = "https://www.youtube.com/watch?v=${video.id.videoId}">${video.snippet.title}</a>
                </p>
                <a href = "https://www.youtube.com/watch?v=${video.id.videoId}"> <img src = "${video.snippet.thumbnails.high.url}"></a>
        </div>
        `;

   }

   nextPage = videoList.nextPageToken;
   previousPage = videoList.prevPageToken;

   if(nextPage == undefined){
     next.disabled = true;
   }else{
      next.disabled = false;
   }

   if(previousPage == undefined){
     previous.disabled = true;
   }else{
     previous.disabled = false;
   }

}

function navigationPages(){

  next.addEventListener( 'click', (event) => {
         event.preventDefault();
        //console.log("HEY");
         let request = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIvalue}&q=${keywordValue}&maxResults=10&pageToken=${nextPage}`; //Default value on api is GET so no need to add it.
         fetchValue(request);
     });

     previous.addEventListener( 'click', (event) => {
            event.preventDefault();
            //console.log("JUDE");
            let request = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIvalue}&q=${keywordValue}&maxResults=10&pageToken=${previousPage}`; //Default value on api is GET so no need to add it.
            fetchValue(request);
        });
}

function init(){
  searchNow();
  navigationPages();
}


init();
