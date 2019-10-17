'use strict';

const allHorns1 = [];
const allHorns2 = [];
let isPage1 = true;


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
  // console.log(uniqueKeywords);
  let hornPage;
  console.log(uniqueKeywords);
  $('select').prop('selectedIndex',0);
  $('option').not(':first-child').remove();
  if(page === 1) {
    hornPage = allHorns1;
  }else{
    hornPage = allHorns2;
  }

  hornPage.forEach(image => {
    if(!uniqueKeywords.includes(image.keyword)){
      uniqueKeywords.push(image.keyword);
    }
  });
  console.log(uniqueKeywords);
  uniqueKeywords.forEach(keyObj => {
    let optionTag = `<option value=${keyObj}>${keyObj}</option>`;
    $('select').append(optionTag);
  });
  $('select').on('change', clickHandler);
}

function fetchData(event){
  event.preventDefault();
  const pageSwap = event.target.id;
  let dataURL;
  let pageRend;
  let allHorns;
  $('main').empty();
  if(pageSwap === 'page1') {
    dataURL = 'data/page-1.json';
    pageRend = 1;
    allHorns = allHorns1;
    isPage1 = true;
  } else {
    dataURL = 'data/page-2.json';
    pageRend = 2;
    allHorns = allHorns2;
    isPage1 = false;
  }
  $.get(dataURL, data => {
    data.forEach(horn => {
      let hornObj = new Horn(horn, pageRend).render();
      $('main').append(hornObj);
      optionRender(pageRend);
    });
  });
}
function sortArr(event){
  $('main').empty();
  event.preventDefault();
  let allHorns;
  if(isPage1){
    allHorns = allHorns1;
  }else{
    allHorns = allHorns2;
  }
  let sort = event.target.id;
  if(sort === 'sortTitle'){
    allHorns.sort((a,b) =>{
      let title1 = a.title;
      let title2 = b.title;
      if(title1 < title2) {return -1;}
      if (title1 > title2) {return 1;}
      return 0;
    });
  }
  if (sort === 'sortHorn') {
    allHorns.sort((a,b) =>{
      let horn1 = a.horns;
      let horn2 = b.horns;
      if (horn1 < horn2) {return -1;}
      if (horn1 > horn2) {return 1;}
      return 0;
    });
  }
  allHorns.forEach(obj =>{
    let hornObj = obj.render();
    $('main').append(hornObj);
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
  $('#page1').on('click', fetchData).trigger('click');
  $('#page2').on('click', fetchData);
  $('#sortTitle').on('click', sortArr);
  $('#sortHorn').on('click', sortArr);
});

