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

  // add another row when clicking 'add filter'
  $('#add-filter-row').click(function() {
    $( '.filter-row:last' ).clone().insertAfter('.filter-row:last');
  });

  // show either a number or percentage box depending on the metric selected
  // there's definitely a better way to do this but I can't work out how to if/else with arrays of multiple values
  $("#select-metric").change(function(){
    if ($("#select-metric").val() == "transactions") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($("#select-metric").val() == "online") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "phone") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "paper") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "facetoface") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "other") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "outcome") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($("#select-metric").val() == "intendedoutcome") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "calls") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($("#select-metric").val() == "getinfo") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "getinfo") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "chaseprogress") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "challengedecision") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "othercall") {
      $(".input-percentage").show();
      $(".input-number").hide();
    }
    if ($("#select-metric").val() == "numberservices") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
    if ($("#select-metric").val() == "numberagencies") {
      $(".input-number").show();
      $(".input-percentage").hide();
    }
  });

	
 
});