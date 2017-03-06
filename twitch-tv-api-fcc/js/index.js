 
//Channel names for searching status!
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","xdc"];

//This call for getting rest of the channels info!  
  function getChannelInfo(){

 //Creates channel url's for channel array names!
    channels.forEach(function(channel) {
      function makeURL(type,channelName){
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + channelName + '?callback=?';
      }
 //This getJSON for getting online, offline and non-accounts data!
      $.getJSON(makeURL("streams",channel), function(streamData){     
         var game,status;
      if (streamData.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (streamData.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = streamData.stream.game;
        status = "online";       
      } 
        
//This getJSON for getting info about channel. IDK why cant get those data from older getJSON. If you find a solution just tell me :D!
    $.getJSON(makeURL("channels", channel), function(channelData) {
     
        var logo = channelData.logo != null ? channelData.logo : "https://cnet2.cbsistatic.com/img/g9Wy9E-b2A-3-jrXEHLhkVbkOAA=/fit-in/570x0/2015/05/31/3d97705c-8ea1-4030-ac30-193b4b22d9a7/twitch-kappa.jpg",
          name = channelData.display_name != null ? channelData.display_name : channel,
          description = status === "online" ? ': ' + channelData.status : "";
      
      //Check if account disabled and change variables!
       if(channelData.url == undefined){
       status = "acc-closed";
       game = "Account doesnt exist or closed!"
              }
      
         var html = '<div class="row channel-info ' + 
          status + '"><div class="col-xl-2 col-sm-2 col-md-2" id="icon"><img src="' + 
          logo + '" class="logo img-responsive img-rounded" width="300" height="300"></div><div class="col-xl-5 col-sm-5 col-md-5 info" id="name"><a href="' + 
          channelData.url + '" target="_blank">' + 
          name + '</a></div><div class="col-xl-2 col-sm-2 col-md-5 info" id="streaming">'+ 
          game + '<span class="description">' + 
          description + '</span></div></div>';
        status === "online" ? $(".channel-section").prepend(html) : $(".channel-section").append(html);
      });
      });
    });
  }

//When page load execute our functions!
$(document).ready(function(){

//Calling channelinfo function!
  getChannelInfo();
//It's ajax because twtich.tv announced client-ID. So Here getting only FCC channel info! 
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers:{
      'Client-ID': '30ugkz6s7yjox3nth3g1dbzsl3bbpq'
    },    
    success: function(fccData){
       if (fccData.stream === null) {
      //FCC Offline
      $("#campStatus").html("OFFLINE");
      $("#campStatus").css({"color": "#770f16"});
    } else {
      //FCC Online
      $("#campStatus").html("ONLINE");
      $("#campStatus").css({"color": "#2b964d"});
    }
    }
  });
  
//Button parts for checking momentary streamer action!
   $(".btn").click(function() {
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline,.acc-closed").removeClass("hidden");
    } else if (status === "online") {
     $(".online").removeClass("hidden");
     $(".offline,.acc-closed").addClass("hidden");
    } else {
    $(".offline").removeClass("hidden");
    $(".online,.acc-closed").addClass("hidden");
    }
  })
});