const fs = require("fs");
const util = require('util');
(async () => {
    const linkedins = 
    [
        'https://www.linkedin.com/in/bertrand-chardon-5876aab/',
        'https://www.linkedin.com/in/lo%C3%AFc-calvy/'
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
            isHeadless: true,
            hasToLog: true,
        };
        try {
            const profileScraper = await scrapedin(options);
            const profile = await profileScraper(linkedins[i]);
            console.log(util.inspect(profile, false, null, true));
            fs.writeFileSync(__dirname+'/' + profile.profile.name + '.json', JSON.stringify(profile, null, 4));
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