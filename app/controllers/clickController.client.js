(function(){
    var addButton = document.querySelectorAll(".btn-add");
    var deleteButton = document.querySelector(".btn-delete");
    var clickNbr = document.querySelector("#click-nbr");
    var apiUrl = "https://myfccvotingapp.herokuapp.com" + "/api/:id/clicks";
   
   function updateClickCount (data) {
    
      var json = JSON.parse(data);
      console.log(json);
      
      var clicksObject = json.clicks.nbrClicks;
      
      var choice = json.choice;
      console.log(choice);
      
      hideTheButtons(choice);
      
      colorMyChoice(choice);
      
      var sum = clicksObject.angular + clicksObject.react + clicksObject.redux + clicksObject.ember;
      
      $(".numberCont").each(function(){
          var id = $(this).attr("id");
          var share = clicksObject[id];
          var percent = (share / sum)* 1000;
          percent = Math.round(percent) / 10;
          $("#" + id + ".numberCont").text(percent + "%");
          
          var height = (percent*3) + "px";
          $("#"+id+".bar").css({"height": height});
      });
      
   }
   
   function hideTheButtons(choice){
       if(choice=="none"){
           $(".label-container").addClass("hidden");
           $(".percentage-container").addClass("hidden");
           $(".graph-container").addClass("hidden");
       }
       
       else{
           $(".btn-container").addClass("hidden");
           
           $(".label-container").removeClass("hidden");
           $(".percentage-container").removeClass("hidden");
           $(".graph-container").removeClass("hidden");
       }
   }
   
   function colorMyChoice(choice){
       if(choice != "none"){
           $("#"+choice+".graphLabel").addClass("chosen");
           $("#"+choice+".bar").addClass("chosen");
       }
   }
   
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", apiUrl, updateClickCount));
   
   $(".btn-add").click(function(){
       var identify = $(this).attr("id");
       
       ajaxFunctions.ajaxRequest("POST", apiUrl + "?id=" + identify, function(){
           ajaxFunctions.ajaxRequest("GET", apiUrl, updateClickCount);
       });
   });
   
//   deleteButton.addEventListener("click", function(){
//       ajaxFunctions.ajaxRequest("DELETE", apiUrl, function(){
//           ajaxFunctions.ajaxRequest("GET", apiUrl, updateClickCount);
//       });
//   }, false);
})();