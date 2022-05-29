
//Get the man of the match from espnCric Info website
const request = require("request");
const cheerio = require("cheerio");

request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard', cb);

function cb(error, response, html){
    if(error){
        console.error('error: ' + error);
    }else if(response){
        console.log("responseCode: " +  response.statusCode);
        if(response.statusCode == 200){
            handleHtml(html);
        }else{
            console.log("Some other error occured")
        }
    }
}

function handleHtml(html){
    let selTool = cheerio.load(html);
    let playerAwardArr = selTool('.ci-match-player-award-carousel span a span');
    // console.log(selTool);
    let manOfTheMatch = selTool(playerAwardArr[1]).text();
    console.log("Man of the match is: " + manOfTheMatch);
    // console.log(playerAwardArr);
}
