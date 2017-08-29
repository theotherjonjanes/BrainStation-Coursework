
const request = require("request")
const cheerio = require("cheerio")

console.log("SHOW ME WHAT YOU GOT!")

let pageCount = 1;

function getUrl(url) {request(url, (error, response, body)=>{
  if (!error) {
    const $ = cheerio.load(body)
    let threadTitle = $('a.title')
    console.log(`Page ${pageCount}`)
    threadTitle.each(function(i, next) {
      console.log ($(this).text())
    }) // threadTitle function
    ++pageCount
    let nextPage = $('.next-button a').attr('href')
    if (pageCount < 4){
      getUrl(nextPage)
    } else if (pageCount === 4) {
      console.log('I LIKE WHAT YOU GOT - GOOD JOB!')}
  } else {
    console.log(`In bird culture this error (${error}) is considered a dick move`)
  } // if/else wrapper
})} // getUrl function

getUrl('https://www.reddit.com/r/rickandmorty/')