const fs = require("fs");
const util = require('util');
const scrapedin = require('../src/scrapedin');

let cookies;

beforeAll(() => {
    try {
        cookies = fs.readFileSync(__dirname+'/cookie.json');
    }
    catch(error) {
        console.warn('unable to load cookie.json', error);
    }
    
})

const urls = [
    ['https://www.linkedin.com/in/lina-morel-9b1b7b1b8/', 'lina', 0],
    ['https://www.linkedin.com/in/rosa-barbet-69a6bb220/', 'rosa', 0],
    ['https://www.linkedin.com/in/aurore-veneto-5a6034213/', 'aurore', 0]
];

test.each(urls)("should get profiles properly", async(url, name, nbReco) => {
    let profile = {};
    try {
        if (!cookies) {
            console.warn('missing cookie.json, must exit');
            return;
        }
        const options = {
            cookies: JSON.parse(cookies),
            isHeadless: true,
            hasToLog: true,
            hasToGetContactInfo: true
        };
        const profileScraper = await scrapedin(options);
        profile = await profileScraper(url);
        // console.log(util.inspect(profile, false, null, true));
        fs.writeFileSync(__dirname+'/profiles/' + name + '.json', JSON.stringify(profile, null, 4));
        if (profile?.recommendations?.given) {
            profile.recommendations.given = profile.recommendations.given.map((reco) => {
                if (reco.profileImage && reco.profileImage.indexOf('https://') === 0) {
                    reco.profileImage = 'https://good.com'
                }
                return reco;
            });
        }
    }
    catch (error) {
        if (error.image) {
            fs.writeFile(__dirname + '/profiles/error.' + name + '.png', error.image, 'base64', function(err) {
                console.log(err);
            });
        }
        console.error(error.message);
    }
    finally {
        expect(profile).toMatchSnapshot({
            profile: {
                imageurl: expect.any(String)
            }
        }, name);
    }
}, 10000000)