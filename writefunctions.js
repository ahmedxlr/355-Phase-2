var searchButton = document.getElementById("searchbar");

searchButton.addEventListener("submit", function (e) {
    search(searchButton.children[0].value);
});

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




function downloadResults(name) {
    var formatToDownload = $("#ddlFormat option:selected").text();
    if (formatToDownload === "XML") {

        var results = document.getElementsByClassName("results")[0];
        var indRes = results.children;
        var result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<results>\n";
        for (var i = 0; i < indRes.length; i++) {
            if (indRes[i].children[0].checked) {
                var title = indRes[i].children[1].innerHTML;
                title = title.replace(',', '');
                var url = indRes[i].children[2].innerHTML;
                url = url.replace(',', '');
                var description = indRes[i].children[3].innerHTML;
                description = description.replace(',', '');
                var result = result + "<result>\n<title>" + title + "</title>\n"
                    + "<url>" + url + "</url>\n" + "<description>"
                    + description + "</description>\n</result>\n";
            }
        }
        result += "</results>";

        download(result, name + '.xml', 'text/xml')
    }

    else if (formatToDownload === "JSON") {
        var resultsObject = { "Result": [] }; 
        var results = document.getElementsByClassName("results")[0];
        var indRes = results.children;
        for (var i = 0; i < indRes.length; i++) {
            if (indRes[i].children[0].checked) {
                var title = indRes[i].children[1].innerHTML;
                var url = indRes[i].children[2].innerHTML;
                var description = indRes[i].children[3].innerHTML;
                var result = { "title": title, "url": url, "description": description };
                resultsObject["Result"].push(result);
            }
        }
        download(JSON.stringify(resultsObject), name + '.json', 'text/JSON')
    }

    else if (formatToDownload === "CSV") {

        var results = document.getElementsByClassName("results")[0];
        var indRes = results.children;
        var result = "";
        for (var i = 0; i < indRes.length; i++) {
            if (indRes[i].children[0].checked) {
                var title = indRes[i].children[1].innerHTML;
                title = title.replace(',', '');
                var url = indRes[i].children[2].innerHTML;
                url = url.replace(',', '');
                var description = indRes[i].children[3].innerHTML;
                description = description.replace(',', '');
                var result = result + title + "," + url + "," + description + "\n";
            }
        }
        result = result.trim();

        download(result, name + '.csv', 'text/csv')
    }
}


function download(text, name, type) {
    var a = document.getElementById("a");
    a.style.display = "block";
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
}
//Jquery function that when you click on 'Select all' button it select all the check box.
$('#check_all').click(function () {
    $('input[type="checkbox"]').prop('checked', true);
});

//Jquary function that when you click on 'Deselect all' button it deselect all the check box.
$('#uncheck_all').click(function () {
    $('input[type="checkbox"]').prop('checked', false);
});

function hideLink() {
    $("#a").hide();
}
