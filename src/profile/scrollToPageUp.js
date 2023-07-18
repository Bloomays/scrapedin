const logger = require('../logger')(__filename)

module.exports = async (page) => {
  logger.info(`scrolling to page top`)
  return await page.evaluate(() => { window.scroll(0,0); });
}
