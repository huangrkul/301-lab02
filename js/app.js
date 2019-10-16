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
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $('main').append($newSection);
};

function optionRender() {

}

function fetchdata(){
  $.get('data/page-1.json', data => {
    data.forEach(horn => {
      new Horn(horn.title, horn.image_url, horn.description, horn.keyword, horn.horns).render();
      if( data.length === allHorns.length){
        $('select').on('change', clickHandler);
        optionRender();
      }
    });
  });
}

function clickHandler(event){
  event.preventDefault();
  let keyValue = event.target.value;
  // ref https://stackoverflow.com/questions/178407/select-all-child-elements-except-the-first
  $('section:not(:first-child)').remove();
  allHorns.forEach(isolate => {
    if(isolate.keyword === keyValue) {
      isolate.render();
    }
  });
}
$(function() {
  fetchdata();

});

