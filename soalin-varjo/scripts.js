var PROPERTIES = {
  "strength" : "Voima",
  "endurance" : "Sitkeys",
  "agility" : "Ketteryys",
  "handiness" : "Näppäryys",
  "intelligence" : "Älykkyys",
  "charisma" : "Karisma",
  "senses" : "Aistit",
  "magicality" : "Maagisuus"
};

var SKILLS = [ {
  label : 'Ampuma-ase',
  properties : [ 'handiness', 'senses' ]
}, {
  label : 'Antimagia',
  properties : [ 'magicality', 'intelligence' ]
}, {
  label : 'Arkkitehtuuri',
  properties : [ 'intelligence', 'senses' ]
}, {
  label : 'Arvon arviointi',
  properties : [ 'senses', 'intelligence' ]
}, {
  label : 'Eläintieto',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Ensiapu',
  properties : [ 'handiness', 'intelligence' ]
}, {
  label : 'Esiintyminen',
  properties : [ 'charisma', 'charisma' ]
}, {
  label : 'Haju',
  properties : [ 'senses', 'intelligence' ]
}, {
  label : 'Havainto',
  properties : [ 'senses', 'intelligence' ]
}, {
  label : 'Heitto',
  properties : [ 'strength', 'agility' ]
}, {
  label : 'Hyppy',
  properties : [ 'strength', 'agility' ]
}, {
  label : 'Ihmistieto',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Kasvitieto',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Kiipeily',
  properties : [ 'strength', 'agility' ]
}, {
  label : 'Koodin purku',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Kuuntelu',
  properties : [ 'senses', 'intelligence' ]
}, {
  label : 'Kätkeminen',
  properties : [ 'handiness', 'senses' ]
}, {
  label : 'Laatiminen',
  properties : [ 'handiness', 'intelligence' ]
}, {
  label : 'Loitsu',
  properties : [ 'magicality', 'intelligence' ]
}, {
  label : 'Lukutaito',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Lyömäase',
  properties : [ 'strength', 'handiness' ]
}, {
  label : 'Maantieto',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Magian tunnistus',
  properties : [ 'magicality', 'senses' ]
}, {
  label : 'Mineraalitieto',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Musisointi',
  properties : [ 'charisma', 'handiness' ]
}, {
  label : 'Oivaltaminen',
  properties : [ 'intelligence', 'intelligence' ]
}, {
  label : 'Piileskely',
  properties : [ 'senses', 'agility' ]
}, {
  label : 'Piileskely',
  properties : [ 'charisma', 'intelligence' ]
}, {
  label : 'Purkaminen',
  properties : [ 'handiness', 'intelligence' ]
}, {
  label : 'Päivämarssi',
  properties : [ 'endurance', 'endurance' ]
}, {
  label : 'Salaoven avaaminen',
  properties : [ 'handiness', 'intelligence' ]
}, {
  label : 'Ratsastus',
  properties : [ 'agility', 'agility' ]
}, {
  label : 'Suojautuminen',
  properties : [ 'agility', 'senses' ]
}, {
  label : 'Tahdonvoima',
  properties : [ 'intelligence', 'endurance' ]
}, {
  label : 'Tulen teko',
  properties : [ 'handiness', 'handiness' ]
}, {
  label : 'Uinti',
  properties : [ 'agility', 'endurance' ]
}, {
  label : 'Varastaminen',
  properties : [ 'handiness', 'handiness' ]
}, {
  label : 'Vastustuskyky',
  properties : [ 'endurance', 'endurance' ]
}, {
  label : 'Veneily',
  properties : [ 'agility', 'intelligence' ]
}, {
  label : 'Voimankäyttö',
  properties : [ 'strength', 'strength' ]
}, {
  label : 'Väistö',
  properties : [ 'agility', 'agility' ]
}, {
  label : 'Yleistieto',
  properties : [ 'intelligence', 'intelligence' ]
} ];

function getFieldExpField(field) {
  return $(field).attr('data-exp-field');
}

function getRollExpFields(element) {
  return $.map($(element).illusionRoll('fields'), function(field, index) {
    return getFieldExpField(field);
  });
}

function getExpFieldProperty(expField) {
  return $(expField).closest('.property').find('.property-val');
}

function updateCustomSkillRoll() {
  var fields = $.map($('.custom-skill-properties select'), function(select, index) {
    return "input[name='property-" + $(select).val() + "']";
  });

  var title = $.map($('.custom-skill-properties select'), function(select, index) {
    return PROPERTIES[$(select).val()];
  }).join(' + ');

  $('.custom-skill a.i-roll').attr({
    'title' : title,
    'data-fields' : fields
  });
}

$(document).ready(function() {
  var skills = SKILLS.sort(function(s1, s2) {
    return s1.label < s2.label;
  });

  for (var i = 0, l = skills.length; i < l; i++) {
    var skill = skills[i];
    var p = skill.properties;

    $('.skills h4').after($('<div>')
      .addClass('skill')
      .append($('<label>').text(skill.label + ' (' + PROPERTIES[p[0]] + ' + ' + PROPERTIES[p[1]] + ")"))
      .append($('<input>')
        .addClass("i-field i-field-sum")
        .attr({"type" : "number", 'data-fields' : "input[name='property-" + p[0] + "'],input[name='property-" + p[1] + "']" })
        .illusionSumField()
      )
      .append($('<a>').addClass('i-roll')
        .attr({ 
          'data-roll' : 'd100+{0}+{1}',
          'data-fields' : "input[name='property-" + p[0] + "'],input[name='property-" + p[1] + "']",
          'href' : 'javascript:void(null)',
          'title' : skill.label
        })
        .text('Heitä')
        .illusionRoll()
      ));
  }

  var primarySelect = $('<select>');
  var secondarySelect = $('<select>');

  var customSkill = $('<div>')
    .addClass('custom-skill')
    .append($('<label>').text('Valitse taito'))
    .append($('<div>')
      .addClass('custom-skill-properties')
      .append(primarySelect).append(secondarySelect))
      .append($('<a>')
        .addClass('i-roll').attr({
          'data-roll' : "d100+{0}+{1}",
          'href' : "javascript:void(null)"
        })
        .text('Heitä')
        .illusionRoll()
      );

  for ( var property in PROPERTIES) {
    primarySelect.append($('<option>').attr({ 'value' : property }).text(PROPERTIES[property]));
    secondarySelect.append($('<option>').attr({ 'value' : property }).text(PROPERTIES[property]));
  }

  $('.skills').append(customSkill);

  updateCustomSkillRoll();

  $('.custom-skill-properties select').change(function(event) {
    updateCustomSkillRoll();
  });

  $('.skills .i-roll').on('roll', function(event, data) {
    if (confirm('Heitetty ' + data.result + ' (' + data.roll + '), päivitetänkö kokemukset?')) {
      var props = 0;
      $.each($(event.target).illusionRoll('fieldValues'), function(index, value) {
        props += value;
      });

      var dice = data.result - props;
      $.each(getRollExpFields(this), function(index, field) {
        var newVal = parseInt($(field).val() || '0') + dice;
        var levels = Math.floor(newVal / 100);
        $(field).illusionField('val', newVal - (levels * 100));
        var property = getExpFieldProperty(field);
        property.illusionField('val', levels + parseInt(property.illusionField('val')));
      });
    }
  });
});