'use strict';

const allHorns = [];
const allKeywords = [];

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

//ref: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
function optionRender() {
  const uniqueSet = new Set(allKeywords);
  const tempArr = [...uniqueSet];
  tempArr.forEach(keyObj => {
    const key = $('<option></option>');
    key.text(keyObj);
    key.attr('value', keyObj);
    $('select').append(key);
  });
  $('select').on('change', clickHandler);
}

function fetchdata(){
  $.get('data/page-1.json', data => {
    data.forEach(horn => {
      new Horn(horn.title, horn.image_url, horn.description, horn.keyword, horn.horns).render();
      allKeywords.push(horn.keyword);
      if( data.length === allHorns.length){
        optionRender();
      }
    });
  });
}

function clickHandler(event){
  event.preventDefault();
  let keyValue = event.target.value;
  // ref https://stackoverflow.com/questions/178407/select-all-child-elements-except-the-first
  $('section:not(:first-child)').fadeOut();
  allHorns.forEach(isolate => {
    if(isolate.keyword === keyValue) {
      isolate.render();
    }
  });
}
$(function() {
  fetchdata();

});

