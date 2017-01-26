$(document).ready(function(){
  
  var quote,author;
  
 function getquote(){
   $.ajax({
     url: 'http://api.forismatic.com/api/1.0/',
     jsonp: 'jsonp',
     dataType: 'jsonp',
     data: {
       method: 'getQuote',
       lang: 'en',
       format: 'jsonp'
     },
     success: function(response) {
       quote = response.quoteText;
       author = response.quoteAuthor;
       $('#text').text(quote);
       if(author){
         $('#author').text('- '+ author);
       }else{
         $('author').text('- Unknown');
       }
     }
   });
 }
  
  getquote();
  
  $('#new-quote').on('click',function(e){
    $(".quote-text, .quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(quote);
    e.preventDefault();
     getquote();
        });
    });
  
  $('.btn-twitter').on('click',function(e){
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
  });
});