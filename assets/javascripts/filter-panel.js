// latest filter design

$(document).ready(function() {

  var filter = window.location.pathname.split( '/' )[2];

  if (filter == "agencies") {
    $(".filter-org-default").hide();
    $(".filter-org-type").show();
    $("optgroup#departments").show();
    $("optgroup#agencies").hide();
  } else if (filter == "services") {
    $(".filter-org-default").hide();
    $(".filter-org-type").show();
    $("optgroup#departments").show();
    $("optgroup#agencies").show();
  } else {
    $(".filter-org-default").show();
    $(".filter-org-type").hide();
    $("optgroup#departments").hide();
    $("optgroup#agencies").hide();
  };

	// show a different org list depending on what you select
	$("#select-org-type").change(function(){
    var selected_option = $("#select-org-type").val();

    if (selected_option == "agencies") {
      $(".filter-org-default").hide();
      $(".filter-org-type").show();
      $("optgroup#departments").show();
      $("optgroup#agencies").hide();
      window.location.href = "agencies"
    } else if (selected_option == "services") {
      $(".filter-org-default").hide();
      $(".filter-org-type").show();
      $("optgroup#departments").show();
      $("optgroup#agencies").show();
      window.location.href = "services"
    } else {
    	$(".filter-org-default").show();
      $(".filter-org-type").hide();
      $("optgroup#departments").hide();
      $("optgroup#agencies").hide();
      window.location.href = "government"
    }
 	});

  $("#select-organisation").change(function(){
    var organisation = $("#select-organisation").val();
    if (filter == "agencies" && organisation != 'government') {    
       window.location.href = filter + "?organisation=" + organisation;
    } else if (filter == 'services' && organisation != 'government') {
      var id = $('#select-organisation option:selected').parent().attr('id');
      var url = filter + "?organisation=" + organisation;

      if (id == 'departments') {
        url += '&type=department'
      } else {
        url += '&type=agency'
      }
      window.location.href = url
    } else {
       window.location.href = filter
    }
  });

  // add another filter row when clicking 'add filter'
  $('#add-filter-row').click(function() {

    // get the last div which ID starts with ^= "filterrow"
    var $div = $('div[id^="filterrow"]:last');
    
    // Read the Number from that div's ID (i.e: 3 from "filterrow3")
    // And increment that number by 1
    var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
    
    // Clone it and assign the new ID (i.e: from num 4 to ID "filterrow4")
    var $filterrow = $div.clone().prop('id', 'filterrow'+num );
    
    // Finally insert $filterrow wherever you want
    $div.after( $filterrow.show() );

    // Show number input by default when adding a new filter row
    $filterrow.find(".input-number").show()
    $filterrow.find(".input-percentage").hide();

    // Show number of divs with ID starting with ^= "filterrow" in console
    console.log($('div[id^="filterrow"]').length);
    // If there's more than one, show the clear filter row controls
    if ($('div[id^="filterrow"]').length > 1) {
      $('.clear-filter-row').show();
    } else {
      $('.clear-filter-row').hide();
    }

    // Removing filter rows and hiding the controls if there's only one
    $('.clear-filter-row').click(function() {

      $(this).closest('div[id^="filterrow"]').remove();

      console.log($('div[id^="filterrow"]').length);
      // If there's more than one, show the clear filter row controls
      if ($('div[id^="filterrow"]').length > 1) {
        $('.clear-filter-row').show();
      } else {
        $('.clear-filter-row').hide();
      }

    });

    // repeat of the code below so that the newly added rows change input width too
    $(".select-metric").change(function(){

      console.log($(this).closest(".filter-row").find(".input-number"));

      if ($(this).val() == "transactions") {
        $(this).closest(".filter-row").find(".input-number").show();
        $(this).closest(".filter-row").find(".input-percentage").hide();
      }
      if ($(this).val() == "online") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "phone") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "paper") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "facetoface") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "other") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "outcome") {
        $(this).closest(".filter-row").find(".input-number").show();
        $(this).closest(".filter-row").find(".input-percentage").hide();
      }
      if ($(this).val() == "intendedoutcome") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "calls") {
        $(this).closest(".filter-row").find(".input-number").show();
        $(this).closest(".filter-row").find(".input-percentage").hide();
      }
      if ($(this).val() == "getinfo") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "getinfo") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "chaseprogress") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "challengedecision") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "othercall") {
        $(this).closest(".filter-row").find(".input-percentage").show();
        $(this).closest(".filter-row").find(".input-number").hide();
      }
      if ($(this).val() == "numberservices") {
        $(this).closest(".filter-row").find(".input-number").show();
        $(this).closest(".filter-row").find(".input-percentage").hide();
      }
      if ($(this).val() == "numberagencies") {
        $(this).closest(".filter-row").find(".input-number").show();
        $(this).closest(".filter-row").find(".input-percentage").hide();
      }
    });

  });

  // show either a number or percentage box depending on the metric selected
  // there's definitely a better way to do this but I can't get it to if/else with arrays of multiple values
  $(".select-metric").change(function(){
    if ($(this).val() == "transactions") {
      $(this).closest(".filter-row").find(".input-number").show();
      $(this).closest(".filter-row").find(".input-percentage").hide();
    }
    if ($(this).val() == "online") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "phone") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "paper") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "facetoface") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "other") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "outcome") {
      $(this).closest(".filter-row").find(".input-number").show();
      $(this).closest(".filter-row").find(".input-percentage").hide();
    }
    if ($(this).val() == "intendedoutcome") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "calls") {
      $(this).closest(".filter-row").find(".input-number").show();
      $(this).closest(".filter-row").find(".input-percentage").hide();
    }
    if ($(this).val() == "getinfo") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "getinfo") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "chaseprogress") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "challengedecision") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "othercall") {
      $(this).closest(".filter-row").find(".input-percentage").show();
      $(this).closest(".filter-row").find(".input-number").hide();
    }
    if ($(this).val() == "numberservices") {
      $(this).closest(".filter-row").find(".input-number").show();
      $(this).closest(".filter-row").find(".input-percentage").hide();
    }
    if ($(this).val() == "numberagencies") {
      $(this).closest(".filter-row").find(".input-number").show();
      $(this).closest(".filter-row").find(".input-percentage").hide();
    }
  });

	
 
});