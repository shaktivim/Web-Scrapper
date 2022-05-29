// Get all the batting players birthday of both innings in a given match (url for particular match is given)
const request = require("request");
const cheerio = require('cheerio');
let url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard';

request(url, cb);

function cb(error, response, html){
    if(error){
        console.log("error" + error);
    }else{
        // console.log(response.statusCode)
        extractHtml(html);
    }
}

function extractHtml(html){
    let $ = cheerio.load(html);
    let inningsArr = $('.ds-bg-fill-content-prime.ds-rounded-lg');
    for(let i = 0; i< inningsArr.length; i++){  
        // team name
        let teamNameElement = $(inningsArr[i]).find('.ds-text-tight-s.ds-font-bold.ds-uppercase');
        let teamName = $(teamNameElement).text();
        teamName = teamName.split('INNINGS')[0];
        teamName = teamName.trim();
        // console.log(teamName);
        // batting table
        let batsmanTable = $(inningsArr[i]).find('.ds-w-full.ds-table.ci-scorecard-table');
        let allPlayersEle = $(batsmanTable).find('tbody tr');
        for(let i = 0; i< allPlayersEle.length; i++){
            let playerColEle = $(allPlayersEle[i]).find('td');
            if(playerColEle.length > 4){                            //if its player row, then table data (td) are more than 4 in number
                // let playerName = $(playerColEle[0]).text();
                // console.log(teamName + " " + playerName);
                let player_href = $(playerColEle[0]).find('a').attr('href');
                let playerName  = $(playerColEle[0]).text();
                // console.log(player_href)
                let fullLink = 'https://www.espncricinfo.com' + player_href;
                getBirthdays(fullLink, playerName, teamName);
            }
        }
    }
}

function getBirthdays(url, playerName, teamName){
    request(url, cb);

    function cb(error, response, html){
        if(error){
            console.log("error" + error);
        }else{
            extractBirthday(html);
        }
    }

    function extractBirthday(html){
        let $ = cheerio.load(html);
        let playerDetails = $('.ds-mb-8 h5');
        // console.log($(playerDetails[1]).text())
        playerBday = $(playerDetails[1]).text();
        console.log(`${playerName} play for ${teamName} was born on ${playerBday}`);
    }
}