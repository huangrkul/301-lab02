'use strict';

const allHorns = [];

function Horn(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
  allHorns.push(this);
}
Horn.prototype.render = function(){
  // select all the html in the dog template
  const myTemplate = $('#photo-template').html();

  // make a new section to hold my template
  const $newSection = $('<section></section>');

  // put the html from the dog template into the new section
  $newSection.html(myTemplate);

  // find the h2 and fill the text with the title
  $newSection.find('h2').text(this.title);

  // find the p tag and fill with description
  $newSection.find('p').text(this.description);

  // find the image_url and fill with the image url
  $newSection.find('img').attr('src', this.image_url);

  // stick my template onto the DOM
  $('main').append($newSection);
};

function fetchdata(){
  $.get('data/page-1.json', data => {
    data.forEach(horn => {
      new Horn(horn.title, horn.image_url, horn.description, horn.keyword, horn.horns).render();
      if( data.length === allHorns.length){
        $('select').on('change', clickHandler);
      }
    });
  });
  
}


$(function() {
  fetchdata();

});

