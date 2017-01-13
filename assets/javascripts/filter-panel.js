// latest filter design

$(document).ready(function() {

  // activate filter button when changing a select option
  $(".filter-panel-horizontal select").change(function(){
    $("input.button").removeAttr('disabled');
  });

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

  // show a shorter input box when a percentage metric is selected
  $("#select-metric").change(function(){
    if ($("#select-metric").val() == "online", "phone", "paper", "facetoface", "other") {
      $(this).closest("fieldset").find(".width-data-input").css("width", "5%").after("<span>% </span>");
    } 
    // if selecting one of the other options, make everything go back to normal :/
  });

  // // add another form field when selecting a range
  // $("#select-range").change(function(){
  //   if ($("#select-range").val() == "isintherange") {
  //      $(".upper-range").toggle();
  //   } else {
  //      $(".upper-range").hide();
  //   }
  // });

	// add another row when clicking 'add filter'
	$('#add-filter-row').click(function() {
    $( '.filter-row:last' ).clone().insertAfter('.filter-row:last');
  });
 
});