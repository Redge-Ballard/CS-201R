var main = function() {
    $('.article').click(function() {
        $('.description').hide();
        $('.article').removeClass('current');
        
        $(this).addClass('current');
        $(this).children('.description').show(); 
    });
    
    $(document).keypress(function(event) {
        if(event.which === 61)
        {
            $('.current').children('.description').toggle();
        }
        else if (event.which === 45)
        {
            var currentArticle = $('.current');
            var nextArticle = currentArticle.next();
            currentArticle.removeClass('current');
            nextArticle.addClass('current');
        }
    });
}

$( "#cityfield" ).keyup(function() {
    var url = "getcity?q="+$("#cityfield").val();
  $.getJSON(url,function(data) {
    var everything;
    everything = "<ul>";
    $.each(data, function(i,item) {
      everything += "<li> "+data[i].city;
    });
    everything += "</ul>";
    $("#txtHint").html(everything);
  })
  .done(function() { console.log('getJSON request succeeded!'); })
  .fail(function(jqXHR, textStatus, errorThrown) { 
    console.log('getJSON request failed! ' + textStatus); 
    console.log("incoming "+jqXHR.responseText);
  })
  .always(function() { console.log('getJSON request ended!');
  })
  .complete(function() { console.log("complete"); });
});

$("#button").click(function(e){
  var value = $("#cityfield").val();
  console.log(value);
  e.preventDefault();
  $("#dispcity").text(value);
  var myurl= "https://api.wunderground.com/api/9111fb97d503d22f/geolookup/conditions/q/UT/";
  myurl += value;
  myurl += ".json";
  console.log(myurl);
  $.ajax({
    url : myurl,
    dataType : "jsonp",
    success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_string = parsed_json['current_observation']['temperature_string'];
      var current_weather = parsed_json['current_observation']['weather'];
      var feels_like = parsed_json['current_observation']['feelslike_string'];
      everything = "<ul>";
      everything += "<li>Location: "+location;
      everything += "<li>Temperature: "+temp_string;
      everything += "<li>Feels like: "+feels_like;
      everything += "<li>Weather: "+current_weather;
      everything += "</ul>";
      console.log(current_weather);
      $("#weather").html(everything);
    }
  });
});

$(document).ready(main);