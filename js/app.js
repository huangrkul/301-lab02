'use strict';

const allHorns = [];

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.horns = horn.horns;
  this.keyword = horn.keyword;
  allHorns.push(this);
}

Horn.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.attr('class', this.keyword);
  $('main').append($newSection);
};

function optionRender() {
  const uniqueKeywords = [];
  allHorns.forEach(image => {
    if(!uniqueKeywords.includes(image.keyword)){
      uniqueKeywords.push(image.keyword);
    }
  })
  uniqueKeywords.forEach(keyObj => {
    let optionTag = `<option value=${keyObj}>${keyObj}</option>`;
    $('select').append(optionTag);
  });

  $('select').on('change', clickHandler);
}

function fetchdata(){
  $.get('data/page-1.json', data => {
    data.forEach(horn => {
      new Horn(horn).render();
      if( data.length === allHorns.length){
        optionRender();
      }
    });
  });
}

function clickHandler(event){
  event.preventDefault();
  let keyValue = event.target.value;
  //ref https://stackoverflow.com/questions/178407/select-all-child-elements-except-the-first
  if(keyValue !== 'default'){
    $('section').hide();
    $(`section.${keyValue}`).fadeIn(500);
  }
}

$(function() {
  fetchdata();
});

