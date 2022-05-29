
// Get the last ball commentary of the match(20-20) from given url
// Note: You cannot get 1st ball commentary because
// page with the below url do not get fully loaded.It can be achieved with automation only
const request = require("request");
const cheerio = require('cheerio');
const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary';

request(url, cb);

function cb(error, response, html){
    if(error){
        console.log("error" + error);
    }else{
        // console.log(response.statusCode)
        htmlHelper(html);
    }
}

function htmlHelper(html){
    let $ = cheerio.load(html);
    let commentaryArr = $('.ds-text-tight-m.ds-font-regular .ci-html-content');
    let firstCommentary = $(commentaryArr[0]).text();
    console.log(firstCommentary);
    console.log($(commentaryArr[0]).html());

}