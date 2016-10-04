$(document).ready(function() {

    $('#change-date').click(function() {
        $('.date-range-selector').toggle();
    });

    $('.date-range-selector a').click(function() {
        $('.date-range-selector').hide();
    });
});