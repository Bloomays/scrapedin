const logger = require("./logger")(__filename);

class ScreenshotError extends Error {
    constructor(message, image) {
      super(message); // (1)
      this.name = "ScreenshotError"; // (2)
      this.image = image;
    }
  }

  const takeScreenshotAndThrow = async(page, errorName, image) => {
    try {
        if (page && !image) {
            image = await page.screenshot({encoding: 'base64'});
        }
    }
    catch (error) {
      logger.warn(`Unable to take screenshot ${error.message}`, error);
      throw new Error(errorName);
    }
    
    throw new ScreenshotError(errorName, image);
  }

  module.exports ={
    ScreenshotError,
    takeScreenshotAndThrow
  }