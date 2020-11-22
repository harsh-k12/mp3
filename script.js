$(document).ready(() => {

    $("#submit").click(()=>{
let searchByTitle=document.getElementById("title").value;
let searchByYear=document.getElementById("year").value;

if(searchByTitle!="")
{
    getMovieDetails(searchByTitle);
}
else if(searchByTitle!="" && searchByYear!="")
{
    getMovieDetails(searchByTitle,searchByYear);
}
else
{
  alert("First Input Some Data")
}

    });

   });
  
let getMovieDetails = (searchByTitle,searchByYear) => {  

    console.log("making request")

    $.ajax({
        type: 'GET', 
        dataType: 'json', 
        async:true,
        url:'https://www.omdbapi.com/?t='+searchByTitle+'&y='+searchByYear+'&apikey=df789615 ', // URL of getting data
        success: (data) => { 
                        let response = data.Response;

                         if (response == "True") {
                            let poster
                            if (data.Poster != "N/A")
                                poster = data.Poster;
                            else
                                poster = "image_not_found.png";

                        responseData = `
                        <tr><td style="text-align: center;"><img src="${poster}" height="350px"></td></tr>
                        <tr><td><b>Title</td><td><b>${data.Title}</td></tr>
                        <tr><td><b>Year</td><td><b>${data.Year}</td></tr>
                        <tr><td><b>imdbID</td><td><b>${data.imdbID}</td></tr>
                        <tr><td><b>Rated</td><td><b>${data.Rated}</td></tr>
                        <tr><td><b>Released</td><td><b>${data.Released}</td></tr>
                        <tr><td><b>Runtime</td><td><b>${data.Runtime}</td></tr>
                        <tr><td><b>Genre</td><td><b>${data.Genre}</td></tr>
                        <tr><td><b>Director</td><td><b>${data.Director}</td></tr>
                        <tr><td><b>Actors</td><td><b>${data.Actors}</td></tr>
                        <tr><td><b>imdbRating</td><td><b>${data.imdbRating}</td></tr>
                        <tr><td><b>Plot</td><td><b>${data.Plot}</td></tr>`;
            }
             else if (response == "False") {
                responseData = `<tr><td colspan="3" style="text-align: center;">No Movie Found With The Given Details</td></tr>`;
            }


            $("#infoTable").html(responseData);


},
        error: (data) => { // in case of error response

            alert("ERROR")

        },

        timeout:99999 // this is in milli seconds

    }); // end of AJAX request
}
