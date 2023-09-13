const scrapSection = require("./scrapSection");
const scrollToPageBottom = require("./profile/scrollToPageBottom");

module.exports = async (page, section, url) => {
  await page.goto(`${url}/details/education/`, {waitUntil: 'domcontentloaded',});
  await Promise.race([page.waitForSelector('.pvs-list'), page.waitForSelector('.artdeco-empty-state__message')]);
  more = await scrapSection(page, section.more);
  more.isMore=true;
  return more;
};
