function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  function fixToTop() {
      var x = document.getElementById("searchbar");
      if (x.className === "example") {
      x.className += " scrolled";
      }
  }
  