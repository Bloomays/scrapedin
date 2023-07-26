const scrapSection = require("./scrapSection");

module.exports = async (page, section, url) => {
  await page.goto(`${url}/details/experience/`, {waitUntil: 'domcontentloaded',});
  await page.waitForSelector('.pvs-list');
  more = await scrapSection(page, section.more);
  more.isMore=true;
  return more;
};
