$('.typeahead').each(function applyTypeahead() {
  var $el = $(this);
  var $parent = $el.parent();
  $parent.addClass('hidden-hint');
  var attributes = $el.prop('attributes');
  var $input = $('<input/>');
  var selectedValue = $el.val();
  var typeaheadList = $el.find('option').map(function mapOptions() {
    if (this.value === '') {
      // remove any empty values from typeahead
      /*eslint consistent-return: 0*/
      return;
      /*eslint consistent-return: 1*/
    }
    return { text: $(this).text(), id: this.value };
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, function applyAttributes() {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $('<input>').attr({
    type: 'hidden',
    id: 'selectedId',
    name: 'selectedId'
  }).appendTo($parent);

  $input.typeahead({
    hint: false
  }, {
    display: 'text',
    source: new Bloodhound({
      datumTokenizer: function (datum) { return Bloodhound.tokenizers.whitespace(datum.text); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList
    })
  }).on('typeahead:select', function(obj, datum, name) {
       $("input#selectedId").val(datum.id);
  }).on('typeahead:autocomplete', function(ev, datum, suggestion) {
       $("input#selectedId").val(datum.id);
  })
});
