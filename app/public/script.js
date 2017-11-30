$(document).ready(function() {

  displaySpaces = function(information, i) {
    $("#info").append('<div id=space-' + information.info[i].id + '>' + information.info[i].title + information.info[i].description + information.info[i].price + information.info[i].location + '</div>')
    $("#space-" + information.info[i].id).append('<img src=' + information.info[i].image_url + '>');
    if(information.info[i].available) {
      $("#space-" + information.info[i].id).append('<button class="book-button" id=book-button-' + information.info[i].id + ' type="button"> Book </button>')
    } else {
      $("#space-" + information.info[i].id).append(' Unavailable')
    }
  };

  getSpaces = function(filterPrice, filterLocation) {
    if((filterPrice === undefined && filterLocation === undefined) || (filterPrice === "" && filterLocation === "")){
      $("#info").empty();
      $.get('/api/spaces', function(information) {
        for(var i=0; i< information.info.length; i++) {
          displaySpaces(information, i);
        }
      })
    } else if(filterPrice === "" || filterPrice === undefined){
      $("#info").empty();
      $.get('/api/spaces', function(information) {
        for(var i=0; i< information.info.length; i++) {
          if(information.info[i].location === filterLocation) {
            displaySpaces(information, i);
          }
        }
      })
    } else if(filterLocation === "" || filterLocation === undefined ) {
      $("#info").empty();
      $.get('/api/spaces', function(information) {
        for(var i=0; i< information.info.length; i++) {
          if(information.info[i].price <= filterPrice){
            displaySpaces(information, i);
          }
        }
      })
    } else {
      $("#info").empty();
      $.get('/api/spaces', function(information) {
        for(var i=0; i< information.info.length; i++) {
          if(information.info[i].price <= filterPrice && information.info[i].location === filterLocation) {
            displaySpaces(information, i);
          }
        }
      })
    }
  };

  getSpaces();

  $(document).on('click', ".book-button", function () {
    $(this).hide();
    var id = ($(this).attr('id')).split("-").pop();
    $.post('/spaces/'+id+'/update_availability', function() {
      $("#space-"+id).append('Unavailable');
    });
  })

  $(".filter-button").click(function() {
    var maxPrice = $("#max-price").val();
    var location = $("#location").val();
    getSpaces(maxPrice, location);
  })
})
