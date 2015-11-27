var EXP_TYPE = 'LVL_DIV';
var EXP_MUL = 10;

var PROPERTIES = {
  "strength" : "Voima",
  "endurance" : "Sitkeys",
  "agility" : "Ketteryys",
  "handiness" : "Näppäryys",
  "awareness" : "Tilannetaju", 
  "intelligence" : "Älykkyys",
  "wisdom" : "Viisaus",
  "charisma" : "Karisma",
  "senses" : "Aistit" ,
  "magicality" : "Maagisuus" 
};

var SKILLS = [
  { label: 'Jäljitys', properties : ['awareness','senses'] },
  { label: 'Ampuma-ase', properties : ['handiness','senses'] },
  { label: 'Antimagia', properties : ['intelligence','magicality'] },
  { label: 'Arkkitehtuuri', properties : ['intelligence','wisdom'] },
  { label: 'Arvon arviointi', properties : ['wisdom','senses'] },
  { label: 'Eläintieto', properties : ['intelligence','wisdom'] },
  { label: 'Ensiapu', properties : ['handiness','intelligence'] },
  { label: 'Esiintyminen', properties : ['awareness','charisma'] },
  { label: 'Hajuaisti', properties : ['intelligence','senses'] },
  { label: 'Havainto', properties : ['intelligence','senses'] },
  { label: 'Heitto', properties : ['strength','agility'] },
  { label: 'Hyppy', properties : ['strength','agility'] },
  { label: 'Ihmistuntemus', properties : ['awareness','charisma'] },
  { label: 'Kasvitieto', properties : ['intelligence','wisdom'] },
  { label: 'Kiipeily', properties : ['endurance','agility'] },
  { label: 'Koodin purku', properties : ['intelligence','wisdom'] },
  { label: 'Kuuntelu', properties : ['awareness','senses'] },
  { label: 'Kätkeminen', properties : ['handiness','senses'] },
  { label: 'Laatiminen', properties : ['handiness','intelligence'] },
  { label: 'Loitsu', properties : ['intelligence','magicality'] },
  { label: 'Lukutaito', properties : ['intelligence','wisdom'] },
  { label: 'Lyömäase', properties : ['strength','handiness'] },
  { label: 'Maantieto', properties : ['intelligence','wisdom'] },
  { label: 'Magian tunnistus', properties : ['senses','magicality'] },
  { label: 'Mineraalitieto', properties : ['intelligence','wisdom'] },
  { label: 'Musisointi', properties : ['awareness','charisma'] },
  { label: 'Oivaltaminen', properties : ['intelligence','wisdom'] },
  { label: 'Piileskely', properties : ['awareness','senses'] },
  { label: 'Purkaminen', properties : ['handiness','intelligence'] },
  { label: 'Päivämarssi', properties : ['endurance','endurance'] },
  { label: 'Salaoven avaaminen', properties : ['handiness','intelligence'] },
  { label: 'Ratsastus', properties : ['agility','agility'] },
  { label: 'Suojautuminen', properties : ['agility','senses'] },
  { label: 'Tahdonvoima', properties : ['endurance','awareness'] },
  { label: 'Tulen teko', properties : ['handiness','handiness'] },
  { label: 'Uinti', properties : ['strength','endurance'] },
  { label: 'Varastaminen', properties : ['handiness','awareness'] },
  { label: 'Vastustuskyky', properties : ['endurance','endurance'] },
  { label: 'Veneily', properties : ['strength','agility'] },
  { label: 'Voimankäyttö', properties : ['strength','strength'] },
  { label: 'Väistö', properties : ['agility','awareness'] },
  { label: 'Yleistieto', properties : ['intelligence','wisdom'] },
  { label: 'Kaupanteko', properties : ['intelligence','charisma'] },
  { label: 'Suostuttelu', properties : ['endurance','charisma'] },
  { label: 'Huijaaminen', properties : ['awareness','charisma'] },
  { label: 'Puheen pitäminen', properties : ['awareness','charisma'] }
];

function showMessage(type, message) {
  var e = $('<div>')
    .addClass('message')
    .addClass(type)
    .append($('<span>').text(message))
    .appendTo($('#messages'));
  
  setTimeout($.proxy(function () {
    $(this).addClass('hidden');
  }, e), 120000);
}

function getFieldExpField(field) {
  return $(field).attr('data-exp-field');
}

function getFieldForExpField(expField) {
  return $(expField).attr('data-field');
}

function getRollExpFields(element) {
  return $.map($(element).illusionRoll('fields'), function(field, index) {
    return getFieldExpField(field);
  });
}

function getExpFieldProperty(expField) {
  return $(expField).closest('.property').find('.property-val');
}

function calculateExp(level, roll) {
  switch (EXP_TYPE) {
    case 'LVL_DIV':
      return Math.min(Math.round((roll / Math.max(level||0, 1)) * EXP_MUL), 100);
    break;
    default:
      return Math.round(roll);
    break;
  }  
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
  
  $.each(PROPERTIES, function (property, name) {
    var property = $('<div>')
      .addClass('property property-' + property)
      .append($('<div>').addClass('property-icon'))
      .append($('<div>').addClass('property-name').text(name))
      .append($('<input>').attr({ 'type': 'number', 'name': 'property-' + property, 'data-exp-field' : "input[name='property-"  + property + "-exp']"}).val(Math.round(Math.random() * 10)).addClass('i-field property-val'))
      .append(
         $('<div>')
           .addClass('property-exp-container')
           .append($('<input>').attr({'type': 'number', name : "property-"  + property + "-exp", 'data-field' : "input[name='property-"  + property + "']"}).val('0').addClass("i-field property-exp"))
           .append($('<div>').addClass("i-progressbar").attr({'data-field': "input[name='property-"  + property + "-exp']" }))
           .append($('<span>').text('%'))
      )
      .appendTo($('.properties'));
  });

  var physicalProperties = $.map(["strength", "endurance", "agility", "handiness", "awareness"], function (property) {
    return "input[name='property-" + property + "']";
  }).join(',');

  var mentalProperties = $.map(["intelligence", "wisdom", "charisma", "senses", "magicality"], function (property) {
    return "input[name='property-" + property + "']";
  }).join(',');
  
  $('<label>').addClass("mental-health-label").text('Henkinen Kesto').appendTo($('.healths'));  
  $('<div>')
    .addClass("mental-health")
    .append($('<input>').attr({"type": "number", 'name': 'mental-health-current'}).addClass('i-field mental-health-current'))
    .append($('<input>').attr({"type": "number", 'name': 'mental-health-total', 'data-fields': mentalProperties }).addClass('i-field-sum mental-health-total'))
    .appendTo($('.healths'));
  
  $('<label>').addClass("physical-health-label").text('Fyysinen Kestoo').appendTo($('.healths'));  
  $('<div>')
    .addClass("physical-health")
    .append($('<input>').attr({"type": "number", 'name': 'physical-health-current'}).addClass('i-field physical-health-current'))
    .append($('<input>').attr({"type": "number", 'name': 'physical-health-total', 'data-fields': physicalProperties }).addClass('i-field-sum physical-health-total'))
    .appendTo($('.healths'));
  
  var skills = SKILLS.sort(function(s1, s2) {
    return s2.label.localeCompare(s1.label);
  });

  for (var i = 0, l = skills.length; i < l; i++) {
    var skill = skills[i];
    var p = skill.properties;

    $('.skills h4').after($('<div>')
      .addClass('skill')
      .append($('<label>').text(skill.label + ' (' + PROPERTIES[p[0]] + ' + ' + PROPERTIES[p[1]] + ")"))
      .append($('<input>')
        .addClass("i-field-sum")
        .attr({"type" : "number", 'data-fields' : "input[name='property-" + p[0] + "'],input[name='property-" + p[1] + "']" })
      )
      .append($('<a>').addClass('i-roll')
        .attr({ 
          'data-roll' : 'd100+{0}+{1}',
          'data-fields' : "input[name='property-" + p[0] + "'],input[name='property-" + p[1] + "']",
          'href' : 'javascript:void(null)',
          'title' : skill.label
        })
        .text('Heitä')
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
  
  $('.skills .i-roll').on('roll', function (event, data) {
    var message = "Heitit " + data.result + " (" + data.roll + ")";
    var fields = $(event.target).illusionRoll('fields')
    var props = 0;

    $.each($(event.target).illusionRoll('fieldValues'), function (index, value) {
      props += value;
    });

    var dice = data.result - props;
    
    $.each(fields, function (index, field) {
      var level = $(field).val();
      var exp = calculateExp(level, dice);
      var expField = getFieldExpField($(field));
      var currentExp = parseInt($(expField).val()||'0');
      $(expField).val(currentExp + exp).trigger('change');
      message += ', ' + PROPERTIES[$(field).attr('name').substring(9)] + ' + ' + exp + ' kp';
    });

    showMessage("roll", message);
  });
  
  $(document).on("change", ".property-exp", function (event) {
    var expField = $(event.target);
    
    var currentExp = parseInt(expField.val()||'0');
    if (currentExp > 100) {
      var levels = Math.floor(currentExp / 100);
      var newExp = currentExp - (levels * 100);
      var field = getFieldForExpField(expField);
      var level = parseInt($(field).val());
      expField.val(newExp).trigger('change');
      $(field).val(level + levels).trigger('change');
      
      showMessage("level", PROPERTIES[$(field).attr('name').substring(9)] + " nousi tasolle " + (level + levels) + '!');
    }
  });

  $(document.body).illusionCharacterSheet('initFields');
});