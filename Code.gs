var url = "https://docs.google.com/spreadsheets/d/13E5KLSLc9dK6cKHcmJtu6fRBJu1OsBZ3Mo7zl4Ec8UA/edit#gid=1262223424";
var Route= {};
Route.path=function(route,callback){
  Route[route]= callback;
}

function doGet(e) {
  // this makes sure to router to different tables
 Route.path("form",loadform);
 Route.path("table",loadTable)




 if(Route[e.parameters.v]){
  return Route[e.parameters.v]();
 } else {
    return render("home");
 }
}
// this loads the form from the "Aproved User" sheet and grabs the inputs
function loadform(){
    var ss= SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Districts");  
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>'; }).join("");
  return render("page",{list:htmlListArray });
}

// back to the home page.
function backTo(){
    document.getElementById('home').innerHTML = "<i>Loading...</i>"
}

// loading table
function loadTable(){
  
  return render("table");
}



function loadAbout(){
  return render("about", {title: "Use This Title",other: "other text"});
}


