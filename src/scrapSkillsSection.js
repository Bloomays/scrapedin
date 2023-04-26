module.exports = async (page, section) => {
  const elements = await page.$x(section.selector);
  if (elements.length > 0){
    await Promise.all([elements[0].click()]);
    await page.waitForSelector('.pvs-list');
  
      skills = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '[href*="/search/results/all/?keywords="] .hoverable-link-text > span:first-child'
          ),
        (element) => {
          return {
            title: element.textContent.replace(/\n/g, "").trim(),
          };
        }
      )
    ); 
  } else {
    skills = [];
  };
  return skills;
};
