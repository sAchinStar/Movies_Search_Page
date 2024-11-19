addEventListener("DOMContentLoaded", () => {
   
   // Movie search
   
   let search_box = document.getElementById("search");
   search_box.addEventListener("keyup", async (e) => {
      posterContainer()
      showContainer()
      let data = await movieSearch(search_box.value)
      let search_list_container = document.getElementById("search_list_container")
      search_list_container.innerHTML = ""
      if (search_box.value.length > 2) {
         showList()
      }
      let arr = data.Search
      // console.log(arr);
      
      arr.forEach(element => {
         if (element.Poster == "N/A") {
            console.log("iam in POSter change if");

            element.Poster = "NoImage.png"
         }
         search_list_container.innerHTML +=
         `<div class="search_list">
         <img src=${element.Poster} alt="thumbnail" class="thumbnail" id="img">
         <p class="thumbnail_name" id="name">${element.Title} ${element.Year}</p>
         <p class="ID" style="display:none;">${element.imdbID}</p>
         </div>
         <hr>`
      });
      // <p class="thumbnail_year" id="year"></p>
      // console.log(search_list_container);
   })
   let search_list_container = document.getElementById("search_list_container")
   search_list_container.addEventListener("click", async e => {
      // console.log(e.target);
      
      //changing poster
      let img = document.getElementById("img")
      let name = document.getElementById("name")
      let year = document.getElementById("year")
      console.log(e.target);
      
      
      if (e.target.tagName == name.tagName || e.target.tagName == year.tagName ||e.target.tagName == e.target.parentElement.tagName == search_list_container.tagName) {
         console.log("iam in name/year condition");
         let element = e.target.parentElement.querySelector(".thumbnail")
         // console.log(element);
         let url = element.getAttribute("src")
         //For Showing poster
         let poster = document.getElementById("poster")
         poster.setAttribute("src", url)
         // For Getting ID
         let p = e.target.parentElement.querySelector(".ID")
         content(p)
         
      }
      else if (e.target.tagName == img.tagName) {
         // console.log("iam in img condition");
         
         let element = e.target
         // console.log(element);
         let url = element.getAttribute("src")
         //For Showing poster
         let poster = document.getElementById("poster")
         poster.setAttribute("src", url)
         // For Getting ID
         let p = e.target.parentElement.querySelector(".ID")
         content(p)
      }
      else {
         console.log("iam in else condition");
         let element = e.target.querySelector(".thumbnail");
         // console.log(element);
         let url = element.getAttribute("src")
         // console.log(url);
         
         //For Showing poster
         let poster = document.getElementById("poster")
         poster.setAttribute("src", url)
         // For Getting ID
         let p = e.target.querySelector(".ID");
         content(p)

      }

   })

   // let search_box = document.getElementById("search")
   search_box.addEventListener("click", () => {
      showList()
   })
   let container = document.getElementById("container")
   // console.log(typeof container, container)
   container.addEventListener("click", (e) => {
      hideList()
   })

   // Fetch Data By Title
   async function movieSearch(movieName) {
      let url = `https://www.omdbapi.com/?s=${movieName}&apikey=`
      let key = "7c9f5688"
      let res = await fetch(url + key)
      console.log(res);
      if (res.ok) {
         let data = res.json()
         return data
      }
      else {
         return Promise.reject("Data Not Fetched")
      }
   }

   //Fetch Data By ID
   async function movieDetails(ID) {
      let res = await fetch(`https://www.omdbapi.com/?i=${ID}&apikey=7c9f5688`)
      // console.log(res);
      if (res.ok) {
         let data = res.json()
         return data
      }
      else {
         return Promise.reject("Data Not Fetched")
      }
   }
   function showContainer(){
      let container=document.getElementById("container")
      container.style="display:flex;"
   }
   function posterContainer(){
      let poster_container=document.getElementById("poster_container")
      poster_container.style="display=block;"
   }
   //Showing Search List 
   function showList() {
      hideContent()
      let list_container = document.getElementById("search_list_container")
      list_container.style = "display:flex"
      //  list_container.
   }

   function hideList() {
      let list_container = document.getElementById("search_list_container")
      list_container.style = "display:none"
      showContent()
   }

   //Showing Content
   function showContent() {
      let content_container = document.getElementById("content_container")
      content_container.style = "display:block"

   }
   //Hiding Content
   function hideContent() {
      let content_container = document.getElementById("content_container")
      content_container.style = "display:none"
   }
   //Clear search
   function clearSearch() {
      let search_box = document.getElementById("search");
      // console.log(search_box.value);
      search_box.value = ""
   }
   async function content(p) {
      //For Content       
      let ID = p.innerText
      console.log(ID);
      let data_obj = await movieDetails(ID) //Data in Object Form
      let content_container = document.getElementById("content_container")
      content_container.innerHTML =
         `<p class="content" id="movie_name"><strong>${data_obj.Title}</strong></p>
            <ul id="row_content" class="content">
                <li><strong class="bold_content">Year: </strong>${data_obj.Year}</li>
                <li><strong class="bold_content">IMDB rating: </strong>${data_obj.imbdRating}</li>
                <li><strong class="bold_content">Release date:</strong>${data_obj.Released}</li>
            </ul>
            <p class="content"><strong class="bold_content">Genre: </strong>${data_obj.Genre}</p>
            <p class="content"><strong class="bold_content">Language: </strong>${data_obj.Language}</p>
            <p class="content"><strong class="bold_content">Writer: </strong>${data_obj.Writer}</p>
            <p class="content"><strong class="bold_content">Actors: </strong>${data_obj.Actors}</p>
            <p class="content"><strong class="bold_content">Plot: </strong>${data_obj.Plot}</p>`
      showContent()
      clearSearch()

   }
})
