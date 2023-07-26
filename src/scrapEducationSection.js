const scrapSection = require("./scrapSection");
const scrollToPageBottom = require("./profile/scrollToPageBottom");

module.exports = async (page, section, url) => {
  await page.goto(`${url}/details/education/`, {waitUntil: 'domcontentloaded',});
  await page.waitForSelector('.pvs-list');
  more = await scrapSection(page, section.more);
  more.isMore=true;
  return more;
};
