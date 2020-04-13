// downloas js file

function downloadResults(ext) {
  var s;
  var formatToDownload = $("#ddlFormat option:selected").text();
  var arrayOfTitles = $(".result .title a");
  var arrayOfURLS = $(".result .url");
  var arrayOfDescriptions = $(".result .description p");
  var arrayOfCheckboxes = $(".result input");
  var length = arrayOfTitles.length;

  if (formatToDownload === "XML") {
    var s = ext
    var downloadDoc = "<?xml version='1.0' encoding='UTF-8'?><results>";
    //in a loop access it by index.innerHTML
    for (var i = 0; i < length; i++) {
      var checked = arrayOfCheckboxes[i].checked;
      if (checked) {
        downloadDoc += "<result><title>"
        var title = arrayOfTitles[i].innerHTML;
        var url = arrayOfURLS[i].innerHTML;
        var desc = arrayOfDescriptions[i].innerHTML;
        downloadDoc += title + "</title><url>" + url + "</url><description>" + desc + "</description></result>";
      }
    }
    downloadDoc += "</results>";
    download(downloadDoc, s + '.xml', 'text/xml')
  }

  else if (formatToDownload === "JSON") {
    var s = ext
    var downloadDoc = '{"Result" : [';
    for (var i = 0; i < length; i++) {
      var checked = arrayOfCheckboxes[i].checked;
      if (checked) {
        var title = arrayOfTitles[i].innerHTML;
        var url = arrayOfURLS[i].innerHTML;
        var desc = arrayOfDescriptions[i].innerHTML;
        downloadDoc += '{"title":"' + title + '", "url":"' + url + '", "description":"' + desc + '"},';
      }
    }
    downloadDoc = downloadDoc.slice(0, -1); // removes the last comma
    downloadDoc += "]}";
    download(downloadDoc, s + '.json', 'text/JSON')
  }

  else if (formatToDownload === "CSV") {
    var downloadDoc = '';
    var s = ext;
    for (var i = 0; i < length; i++) {
      var checked = arrayOfCheckboxes[i].checked;
      if (checked) {
        var title = arrayOfTitles[i].innerHTML;
        var url = arrayOfURLS[i].innerHTML;
        var desc = arrayOfDescriptions[i].innerHTML;
        downloadDoc += '"' + title + '","' + url + '","' + desc + '"\r\n';
      }
    }
    download(downloadDoc, s + '.csv', 'text/csv')
  }
}

function download(text, name, type) {

  var a = document.getElementById("a");

  a.style.display = "block";

  var file = new Blob([text], {
    type: type
  });

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

  function hideLink(){
    $("#a").hide();
  }

   $(document).ready(function () {
            $(".result").hide();
        });
        const reader = new FileReader();
        var extension = "";
        //this function checks what type of file it is and sees if its the correct format 
        function read(input) {
            var url = input.value;
            var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
            extension = ext;
            if (ext !== "csv" && ext !== "json" && ext !== "xml") {
                document.querySelector('.results').innerHTML = "<strong>Invalid file format</strong>"
                return;
            } else {
                console.log(ext);
            }
            const csv = input.files[0];
            reader.readAsText(csv);

        }
        reader.onload = function (e) {
            //after the file is uploaded thats when the downlaod button shows up
            $("#btnDownload").show();
            $("#ddlFormat").show();

            if (extension === "csv") {
                var lines = e.target.result.split('\n');
                var result = lines.map(line => {
                    return line.split(',');
                });
                var finalString = "";
                for (var i = 0; i < result.length; i++) {
                    var resultrow = "<div class='result'><input type='checkbox' class='chkbox' checked><div class='title'><a href='" + result[i][1] + "' target='_blank'>" + result[i][0] + "</a></div><div class='url'>" + result[i][1] + "</div><div class='description'><p>" + result[i][2] +
                        "</p></div></div>";
                    finalString += resultrow;
                }
                document.querySelector('.results').innerHTML = finalString;

            } else if (extension === "json") {
                var result = JSON.parse(e.target.result);
                var finalString = "";
                for (var i = 0; i < result.Result.length; i++) {
                    var resultrow = "<div class='result'><input type='checkbox' class='chkbox' checked><div class='title'><a href='" + result.Result[i].url + "' target='_blank'>" + result.Result[i].title + "</a></div><div class='url'>" + result.Result[i].url + "</div><div class='description'><p>" +
                        result.Result[i].description + "</p></div></div>";
                    finalString += resultrow;
                }
                document.querySelector('.results').innerHTML = finalString;

            } else if (extension === "xml") {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(e.target.result, "text/xml");
                var v = xmlDoc.getElementsByTagName("result");
                var finalString = "";
                for (var i = 0; i < v.length; i++) {
                    var resultrow = "<div class='result'><input type='checkbox' class='chkbox' checked><div class='title'><a href='" + v[i].childNodes[3].innerHTML + "' target='_blank'>" + v[i].childNodes[1].innerHTML + "</a></div><div class='url'>" + v[i].childNodes[3].innerHTML +
                        "</div><div class='description'><p>" + v[i].childNodes[5].innerHTML + "</p></div></div>";
                    finalString += resultrow;
                }
                document.querySelector('.results').innerHTML = finalString;
            }
        }
