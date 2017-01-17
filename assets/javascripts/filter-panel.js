// latest filter design

$(document).ready(function() {

	// show a different org list depending on what you select
	$("#select-org-type").change(function(){
    if ($("#select-org-type").val() == "agencies") {
      $(".filter-org-type").show();
      $(".filter-org-type-2").hide();
      $(".filter-org-default").hide();
    }
    if ($("#select-org-type").val() == "services") {
      $(".filter-org-type-2").show();
      $(".filter-org-type").hide();
      $(".filter-org-default").hide();
    }
    if ($("#select-org-type").val() == "departments") {
    	$(".filter-org-default").show();
			$(".filter-org-type").hide();
			$(".filter-org-type-2").hide();
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

    // Count number of divs with ID starting with ^= "filterrow" and show in console
    console.log($('div[id^="filterrow"]').length);

    // If there's more than one, show the clear filter row controls
    if ($('div[id^="filterrow"]').length > 1) {
      $('.clear-filter-row').show();
    } else {
      $('.clear-filter-row').hide();
    }

    // Removing filter rows and hiding the controls if there's only one
    $('.clear-filter-row').click(function() {

      $(this).parent().parent().parent().remove();

      console.log($('div[id^="filterrow"]').length);
      // If there's more than one, show the clear filter row controls
      if ($('div[id^="filterrow"]').length > 1) {
        $('.clear-filter-row').show();
      } else {
        $('.clear-filter-row').hide();
      }

    });

    // show either a number or percentage box depending on the metric selected
    // there's definitely a better way to do this but I can't work out how to if/else with arrays of multiple values
    $(".select-metric").change(function(){
      if ($(this).val() == "transactions") {
        $(".input-number").show();
        $(".input-percentage").hide();
      }
      if ($(this).val() == "online") {
        $(".input-percentage").show(); // it's something about not selecting all spans with this class, just children of the particular select-metric
        $(".input-number").hide();
      }
      if ($(this).val() == "phone") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "paper") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "facetoface") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "other") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "outcome") {
        $(".input-number").show();
        $(".input-percentage").hide();
      }
      if ($(this).val() == "intendedoutcome") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "calls") {
        $(".input-number").show();
        $(".input-percentage").hide();
      }
      if ($(this).val() == "getinfo") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "getinfo") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "chaseprogress") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "challengedecision") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "othercall") {
        $(".input-percentage").show();
        $(".input-number").hide();
      }
      if ($(this).val() == "numberservices") {
        $(".input-number").show();
        $(".input-percentage").hide();
      }
      if ($(this).val() == "numberagencies") {
        $(".input-number").show();
        $(".input-percentage").hide();
      }
    });  

  });

  // show either a number or percentage box depending on the metric selected
  // there's definitely a better way to do this but I can't work out how to if/else with arrays of multiple values
  $(".select-metric").change(function(){
    if ($(this).val() == "transactions") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($(this).val() == "online") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "phone") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "paper") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "facetoface") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "other") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "outcome") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($(this).val() == "intendedoutcome") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "calls") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($(this).val() == "getinfo") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "getinfo") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "chaseprogress") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "challengedecision") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "othercall") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($(this).val() == "numberservices") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($(this).val() == "numberagencies") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
  });

	
 
});