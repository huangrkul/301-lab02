'use strict';

const allHorns1 = [];
const allHorns2 = [];

function Horn(horn, page) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.horns = horn.horns;
  this.keyword = horn.keyword;
  if(page === 1) {
    allHorns1.push(this);
  } else {
    allHorns2.push(this);
  }
}

Horn.prototype.render = function(){
  let source = $('#horn-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};

function optionRender(page) {
  const uniqueKeywords = [];
  let hornPage;
  if(page === 1) {hornPage = allHorns1} else {hornPage = allHorns2}
  hornPage.forEach(image => {
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
      let hornObj = new Horn(horn, 1).render();
      $('main').append(hornObj);
      if( data.length === allHorns1.length){
        optionRender();
      }
    });
  });
}

function clickHandler(event){
  event.preventDefault();
  let keyValue = event.target.value;
  if(keyValue !== 'default'){
    $('section').hide();
    $(`section.${keyValue}`).fadeIn(500);
  }
}

$(function() {
  fetchdata();
});

