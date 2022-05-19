function userClicked(userInfo){
 var uurl = "https://docs.google.com/spreadsheets/d/13E5KLSLc9dK6cKHcmJtu6fRBJu1OsBZ3Mo7zl4Ec8UA/edit#gid=1262223424" // this is the url for another google spreadsheet where the table is
  var ss= SpreadsheetApp.openByUrl(uurl);
  var ws = ss.getSheetByName("DATA 1");
  ws.appendRow([userInfo.court,userInfo.fullname,userInfo.prefDate,new Date(),userInfo.email,userInfo.leave,userInfo.hours]); // inputs all the data in the table
  
  
  // Email HTML 
  var subject = 'Thanks for your submission'; 
  var body = "We'll get back to you shortly";
  var htmlTemplete = HtmlService.createTemplateFromFile("email");
  htmlTemplete.courtName = userInfo.court; // Selected Court
  htmlTemplete.fname = userInfo.fullname; // Selected Full Name
  var htmlBody = htmlTemplete.evaluate().getContent();
  GmailApp.sendEmail(userInfo.email,subject,body,{ htmlBody: htmlBody }); // TAKES THE BODY TO THE EMAIL HTML.
}


function getCalendarBusyDays(){ // MAKES SURE THAT THE DATES ARE DISABLE ACCORDING TO YOUR GOOGLE CALANDER
  var startDate = new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
  
  var calendar = CalendarApp.getCalendarsByName("hasanyariq@gmail.com")[0]; //ENTER HERE YOUR CALENDAR NAME (GMAIL)
  var events = calendar.getEvents(startDate, endDate);
  
  var days = events.map(function(e){ return e.getStartTime().setHours(0,0,0,0); });
  var uniqueDays = [];
    days.forEach(function(d){
      if(uniqueDays.indexOf(d) === - 1){ uniqueDays.push(d);
      }
    });
    
  return uniqueDays;
}

// GRABES THE TABLE FROM THE SHEET WITH THE EMPLOYER CONTACT INFO
function getTableData(){
  var urll = "https://docs.google.com/spreadsheets/d/1l8yljTBZobZFiF8Ef7ps_wBJrC9j2YSxTl-EfV5VXk4/edit#gid=825465552"
  var ss= SpreadsheetApp.openByUrl(urll);
  var ws = ss.getSheetByName("table");
  var data = ws.getRange(2,1,ws.getLastRow()-1,3).getValues();
 
  return data;
}