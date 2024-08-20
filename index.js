const got = require("got");
const HTMLParser = require("node-html-parser");
const prompt = require("prompt-sync")();
const { Webhook, MessageBuilder } = require('discord-webhook-node');

//https://www.amazon.com/ASUS-C424MA-AS48F-Chromebook-NanoEdge-Processor/dp/B0BSP51S36/ref=sr_1_1_sspa?crid=39W5M7N5H9GW8&dib=eyJ2IjoiMSJ9.M3, https://www.amazon.com/Skytech-Gaming-Nebula-PC-Desktop/dp/B0C9PNZJCF/?
// const productLink = "https://www.amazon.com/ASUS-C424MA-AS48F-Chromebook-NanoEdge-Processor/dp/B0BSP51S36/ref=sr_1_1_sspa?crid=39W5M7N5H9GW8&dib=eyJ2IjoiMSJ9.M3Oz8YWMw4uvmfaIiAaJD-zaCLgwMg45vPdBvqRrlHaqx1i_sI6BSx-M8AEE3GFxFpYB9aKq83LG0REO2DegUuDvzwDZb3SzjZuLhlsVad-EVZf3JyxLO8mcRCkHHlB3gSXYgKqYjU1GuqxD5FVpUZRxCjn2j58dT75Qn69s5wMaUaHIFeOASjeeq8Xdu1AiIDqxogSRtF2Tl90UTdnu05Ngvo3-2_gPqhst4rRGIEQ.ZQWLf-fY9ouM2BK5NA3koLzWGnd_FrmCZLGLtII7o_I&dib_tag=se&keywords=chromebook&qid=1723919179&sprefix=chrome%2Caps%2C482&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1";

const hook = new Webhook("https://discord.com/api/webhooks/1275581914388103229/mpP0C4aQCdsFTro_umQGEpFXjAwu60FoN04yQSaRKRmDHMCwXSiPXXy0TGMv2fAYx2dT");
const embed = new MessageBuilder()
.setTitle("Amazon Monitor")
.setColor("90ee90")
.setTimestamp()


async function Monitor(productLink){
    var myHeaders = {
        "connection" : "keep-alive",
        "sec-ch-ua": `"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"`,
        "sec-ch-ua-mobile": "?0",
        "upgrade-insecure-requests": 1,
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "rtt": 100,
        "ect": "4g",
        "downlink": 10
    }

    const response = await got(productLink,{
        header: myHeaders
    });
    
    if(response && response.statusCode == 200){
        let root = HTMLParser.parse(response.body);
        let availabilityDiv = root.querySelector("#availability");
        if(availabilityDiv){
            let productImgUrl = root.querySelector("#landingImage").getAttribute("src");
            let productName = productLink.substring(productLink.indexOf("com/") + 4, productLink.indexOf("/dp"));
            let stockText = availabilityDiv.childNodes[1].innerText.toLowerCase();
            if(stockText == "out of stock"){
                console.log(productName + " OUT OF STOCK");
            }else{
                embed.setThumbnail(productImgUrl);
                embed.addField(productName, productLink, true);
                embed.addField("Availability", "IN STOCK", false);
                hook.send(embed);
                console.log(productName + " IN STOCK");
            }
        }
    }
await new Promise(r => setTimeout(r, 300));
    Monitor(productLink);
    return false;
    
}

async function Run(){
    var productLinks = prompt("Enter link to monitor (seperate by comma): ");
   
    var productLinksArr = productLinks.split(',');

    for(var i = 0; i < productLinksArr.length; i++){
        productLinksArr[i] = productLinksArr[i].trim();
    }

var monitors = []

productLinksArr.forEach(link => {
    var p = new Promise((resolve, reject) => {
        resolve(Monitor(link));
    }).catch(err => console.log(err));

    monitors.push(p);
});
    console.log("Now monitoring " + productLinksArr.length + " items");
    await Promise.allSettled(monitors);
}

Run();