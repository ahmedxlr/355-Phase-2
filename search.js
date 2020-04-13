var searchButton = document.getElementById("searchbar");

searchButton.addEventListener("submit", function(e) {
    search(searchButton.children[0].value);});

var baseurl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAMm914_KHzS2ZIYiaqttopCl2dLsCI4Ws&cx=011476052725253523431:1njrvmffpvs&q=";

function search(searchTerm) {
    var res = document.getElementsByClassName("results")[0].innerHTML = "";
    var url = baseurl + searchTerm;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    console.log("searching...");
    request.onload = function () {
	console.log("loaded");
	var data = JSON.parse(this.response);
	if (request.status == 200) {
	    var results = document.getElementsByClassName("results")[0];
	    for (var i = 0; i < data["items"].length; i++) {
        var container = document.createElement("div");
        
                container.className = "result";
                var checkb = document.createElement("input");
                checkb.type = "checkbox";

                var link = document.createElement("a");
                link.href = data["items"][i].formattedUrl;
                link.innerHTML = data["items"][i].title;

                var url = document.createElement("p");
                url.className = "url";
                url.innerHTML = data["items"][i].formattedUrl;

                var desc = document.createElement("p");
                desc.className = "desc";
                desc.innerHTML = data["items"][i].snippet;
                
                var br = document.createElement("br");
		container.appendChild(checkb);
		container.appendChild(link);
		container.appendChild(url);
		container.appendChild(desc);
		container.appendChild(br);
		results.appendChild(container);
	    }
	}
    }
    request.send();
}

	    
