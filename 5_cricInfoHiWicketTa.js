
// Get the highest wicket taker and wickets of the winning team from a given url
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
    let teamElementArr = $('.ds-flex.ds-flex-col.ds-mt-3.ds-mt-0.ds-mb-1 .ci-team-score');       
    // let team1 = $(teamElementArr[0]).text();
    // let team2 = $(teamElementArr[1]).text();
    // console.log(teamElementArr.length)
    let winTeam = '';
    for(let i = 0; i< teamElementArr.length; i++){
        if($(teamElementArr[i]).hasClass('ds-opacity-50')){     // do not use dot here(class finder)
            continue;
        }else{
            // console.log($(teamElementArr[i]).text());
            let winTeamElement = $(teamElementArr[i]).find('.ds-font-bold');        // find function gives further search of element
            winTeam = winTeamElement.text();
            // console.log(winTeam);
        }
    }

    let inningsArr = $('.ds-bg-fill-content-prime.ds-rounded-lg');
    let htmlStr = '';
    for(let i = 0; i< inningsArr.length; i++){    
        // htmlStr += $(inningsArr[i]).html(); 
        let teamNameElement = $(inningsArr[i]).find('.ds-text-tight-s.ds-font-bold.ds-uppercase');
        // console.log(teamNameElement.length)
        // console.log(teamNameElement.text())
        let teamName = $(teamNameElement).text();
        teamName = teamName.split('INNINGS')[0];
        teamName = teamName.trim();
        // console.log(teamName);
        let hwtName;
        let highestWickets = 0;
        if(teamName == winTeam){
            // console.log(teamName);
            let bowlingTableEle = $(inningsArr[i]).find('.ds-w-full.ds-table');
            let allBowlers = $(bowlingTableEle[1]).find('.ds-text-tight-s');
            for(let i = 0; i< allBowlers.length; i++){
                let playerColEle = $(allBowlers[i]).find('td');
                let playerName = $(playerColEle[0]).text();
                let wickets = $(playerColEle[4]).text();
                // console.log(playerName + " "+ wickets);
                if(wickets > highestWickets){
                    hwtName = playerName;
                    highestWickets = wickets;
                }
            }
            console.log("Winner Team is: " + winTeam + ", Hihgest wicket Taken is: " + highestWickets +  " by " + hwtName);
            console.log(`Winner team is: ${winTeam}, Highest wicket taken is ${highestWickets} by ${hwtName}`);

        }
    }
    // console.log(htmlStr);
}