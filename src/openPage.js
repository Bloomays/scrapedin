const logger = require("./logger")(__filename);

const agents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
  // "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
  // "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:34.0) Gecko/20100101 Firefox/34.0",
  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
  // "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0",
  // "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
  // "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0",
  // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
]

module.exports = ({ browser, cookies, url, puppeteerAuthenticate }) => new Promise( async (resolve, reject) => {
  try {
  const page = await browser.newPage()
  page.on('error', err => {reject(err)})

  if (cookies) {
    await page.setCookie(...cookies)
  }
  await page.setUserAgent(agents[Math.floor(Math.random() * agents.length)])
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' })
  await page.setViewport({
    width: 1920,
    height: 1080
  })

  if (puppeteerAuthenticate) {
    await page.authenticate(puppeteerAuthenticate)
  }
  logger.info(`starting goto url: ${url}`);

  await page.goto(url, {waitUntil: 'domcontentloaded',})

  resolve(page)
  }
  catch(error) {
    reject(error);
  }
})
