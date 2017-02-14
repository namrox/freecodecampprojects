$(document).ready(function(){
  
  //Creating a search function that will search term and getting data from Wikipedia!
  function search(){
  //Getting search term
  var searchTerm = $("#searchText").val();
//If user doesnt write anything then alert! If they do write then search it <3!
    if(searchTerm.length === 0){
     
      alert("Please write your search term!");
      
    }else{ 
      
   //Creating main api url!
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
   //Checking url
    //console.log(url);
    $.ajax({
      url: url,
      type: "GET",
      async: false,
      dataType: "json",
      //If it works do this!
      success: function(wikiData){     
        //Append data to html!
        $("#result").html('');
        for(var i=0;i<wikiData[1].length;i++){  
            $("#result").prepend('<li><a href='+wikiData[3][i]+' + " target="_blank"><h2>' + wikiData[1][i]+ '</h2></a>' + '<p>' + wikiData[2][i] + '</p></li>' );        
        }
   $("#searchTerm").val('');
      },
      //If it doesnt do this!
      error: function(errorMessage){
        alert("Some error happened. Pls check console!")
      }
    });
    }   
  };
  
  //Autocomplete function!
  $("#searchText").autocomplete({
        source: function(request, response) {
            console.log(request.term);
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function(wikiData) {
                    response(wikiData[1]);
                }
            });
        }
    });
  
  //Clck the button to invoke search function!
  $("#search").click(function(){
     //Getting search term
  var searchTerm = $("#searchText").val();
   search();
    $(".search-section").css({"padding-top":"50px"});
  });
   
  //Search also when press 'enter' button!
   $(document).keypress(function (e) {
        if (e.which == 13) {
            search();
           $(".search-section").css({"padding-top":"50px"});
        }
    });
  
});