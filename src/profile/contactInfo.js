const logger = require('../logger')(__filename)
const scrapSection = require('../scrapSection')
const { takeScreenshotAndThrow } = require("../customerError");

const SEE_MORE_SELECTOR = '#top-card-text-details-contact-info'
const CLOSE_MODAL_SELECTOR = '.artdeco-modal__dismiss';

const template = {
  selector: '.pv-contact-info__contact-type',
  fields: {
    type: 'h3',
    values: {
      selector: '.pv-contact-info__ci-container',
      isMultipleFields: true
    },
    links: {
      selector: 'a',
      attribute: 'href',
      isMultipleFields: true
    }
  }
} 
const getContactInfo = async(page) => {
  await page.waitForSelector(SEE_MORE_SELECTOR, { timeout: 30000 })
    .catch(() => {
      logger.warn('contact-info', 'selector not found')
      return {}
    })

  const element = await page.$(SEE_MORE_SELECTOR)
  if(element){
    await element.click()
    const contactInfoIndicatorSelector = '.pv-contact-info'
    await page.waitForSelector(contactInfoIndicatorSelector, { timeout: 70000 })
        .catch(async (error) => {
          logger.warn('contact info was not found', error.message)
          await takeScreenshotAndThrow(page, "NO_CONTACT_INFO");
        })
    
    const contactInfo = await scrapSection(page, template)
    const closeButton = await page.$(CLOSE_MODAL_SELECTOR)
    if(closeButton)
      await closeButton.click()

    return contactInfo
  }
  
}

module.exports = getContactInfo
