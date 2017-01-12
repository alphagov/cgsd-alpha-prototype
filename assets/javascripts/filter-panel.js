// latest filter design

$(document).ready(function() {

  // activate filter button when changing a select option
  $(".filter-panel-horizontal select").change(function(){
    $("input.button").removeAttr('disabled');
  });

	// add another form field when selecting a range
	$("#select-range").change(function(){
    if ($("#select-range").val() == "isintherange") {
       $(".upper-range").toggle();
    } else {
       $(".upper-range").hide();
    }
	});

	// when selecting an agency or service, show a org type selector
	$("#select-org-type").change(function(){
    if ($("#select-org-type").val() == "agencies", "services") {
       $(".filter-org-type").show();
       $(".filter-org-default").hide();
    }
    if ($("#select-org-type").val() == "departments") {
    	$(".filter-org-default").show();
			$(".filter-org-type").hide();
			$(".filter-org-department").hide();
			$(".filter-org-agency").hide();
    }
	});

	// show an org name selector when selecting the org type
	$("#select-org-name").change(function(){
    if ($("#select-org-name").val() == "indepartment") {
       $(".filter-org-department").show();
       $(".filter-org-agency").hide();
    }
    if ($("#select-org-name").val() == "inagency") {
       $(".filter-org-agency").show();
       $(".filter-org-department").hide();
    }
    if ($("#select-org-name").val() == "any") {
       $(".filter-org-agency").hide();
       $(".filter-org-department").hide();
    }
	});

	// add another row when clicking 'add filter'
	$('#add-filter-row').click(function() {
    $( '.filter-row:last' ).clone().insertAfter('.filter-row:last');
  });

  // only show 'remove' link when more than one filter is showing???

 
});