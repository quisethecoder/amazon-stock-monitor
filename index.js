const got = require("got");


console.log("Hello World!");

const productLink = "https://www.amazon.com/ASUS-C424MA-AS48F-Chromebook-NanoEdge-Processor/dp/B0BSP51S36/ref=sr_1_1_sspa?crid=39W5M7N5H9GW8&dib=eyJ2IjoiMSJ9.M3Oz8YWMw4uvmfaIiAaJD-zaCLgwMg45vPdBvqRrlHaqx1i_sI6BSx-M8AEE3GFxFpYB9aKq83LG0REO2DegUuDvzwDZb3SzjZuLhlsVad-EVZf3JyxLO8mcRCkHHlB3gSXYgKqYjU1GuqxD5FVpUZRxCjn2j58dT75Qn69s5wMaUaHIFeOASjeeq8Xdu1AiIDqxogSRtF2Tl90UTdnu05Ngvo3-2_gPqhst4rRGIEQ.ZQWLf-fY9ouM2BK5NA3koLzWGnd_FrmCZLGLtII7o_I&dib_tag=se&keywords=chromebook&qid=1723919179&sprefix=chrome%2Caps%2C482&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1";

async function Monitor(){
    var myHeaders = {
        //Have to add connection here 
        "sec-ch-ua": `"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"`,
        "sec-ch-ua-mobile": "?0",
        "upgrade-insecure-requests": 1,
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",

    }

    const response = await got(productLink,{
        header: myHeaders
    });
    console.log(response.statusCode);
}

Monitor();