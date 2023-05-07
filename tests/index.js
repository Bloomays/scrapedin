const fs = require("fs");
(async () => {
    const linkedins = 
    [
        'https://www.linkedin.com/in/jgranon/'
        /*'https://www.linkedin.com/in/lina-morel-9b1b7b1b8/',
        'https://www.linkedin.com/in/rosa-barbet-69a6bb220/',
        'https://www.linkedin.com/in/aurore-veneto-5a6034213/'*/
    ];
    for (let i = 0 ; i < linkedins.length ; i++){
        const scrapedin = require('../src/scrapedin');
        const fs = require('fs');
        const cookies = fs.readFileSync(__dirname+'/cookie.json');
        const options = {
            cookies: JSON.parse(cookies),
            isHeadless: false,
            hasToLog: true,
        };
        try {
            const profileScraper = await scrapedin(options);
            const profile = await profileScraper(linkedins[i]);
            console.log(profile);
        }
        catch (error) {
            if (error.image) {
                fs.writeFile(__dirname + "/out.png", error.image, 'base64', function(err) {
                    console.log(err);
                });
            }
            console.error(error.message);
        }
        
    }
})()