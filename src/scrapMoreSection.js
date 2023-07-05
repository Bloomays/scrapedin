const scrapSection = require("./scrapSection");
const scrollToPageBottom = require("./profile/scrollToPageBottom");

module.exports = async (page, section, url) => {
  const elements = await page.$x(section.viewMore);
  if (elements.length > 0){
    await Promise.all([elements[0].click()]);
    await page.waitForSelector('.pvs-list');
    more = await scrapSection(page, section.more);
    more.isMore=true;
    await page.goto(url);
    await scrollToPageBottom(page);
  } else {
    more = await scrapSection(page, section.default);
    more.isMore=false;
  };
  return more;
};
