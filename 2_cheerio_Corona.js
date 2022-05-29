//Get the number of total cases, deaths and recovered from the worldoMeter info website
//cheerio helps to load all the html data recieved from the url request and perform different function on it
const request = require("request");
const cheerio = require("cheerio");
// const Chalk = require('chalk');
// // import {Chalk} from 'chalk';

request('https://www.worldometers.info/coronavirus/', cb);

function cb(error, response, html){
    if(error){
        console.error('error', error)   //Print the error if one occurred                   
    }else{
        handleHtml(html);
    }
}

function handleHtml(html){
    let selTool = cheerio.load(html);  
    // let h1s = selTool("h1");     //selTool gets all h1 tags present in the html loaded by cheerio
    // console.log(h1s.length);
    let contentArr = selTool('#maincounter-wrap');     // locating the required data through css selectors and load tool of cheerio
    // if there are multiple items from the same css selector, then received content is in form of array
    for(let i = 0; i < contentArr.length; i++){
        let data = selTool(contentArr[i]).text();       // getting only text part(body) of the html element
        console.log("data", data);
    }
    //other way
    let total = selTool(contentArr[0]).text();
    let deaths = selTool(contentArr[1]).text();
    let recovered = selTool(contentArr[2]).text();

    console.log("Total cases " + total);
    console.log("Deaths " + deaths);
    console.log("Recovery " + recovered);

}
console.log("after");