const openPage = require("../openPage");
const scrapSection = require("../scrapSection");
const scrapSectionHardskills = require('../scrapSkillsSection')
const scrollToPageBottom = require("./scrollToPageBottom");
const seeMoreButtons = require("./seeMoreButtons");
const contactInfo = require("./contactInfo");
const template = require("./profileScraperTemplate");
const cleanProfileData = require("./cleanProfileData");

const logger = require("../logger")(__filename);

const profilePageIndicatorSelector = ".pv-top-card";
const notLoggedSelector = '.join-form';
const authWallSelector = 'a[href*="signup"]';

const testLoginElementsInpage = async (page, browser) => {
  const options = {
    timeout: 3000,
  }
  try {
    // ensure we are not blocked by login page
    await Promise.race([
      page.waitForSelector(notLoggedSelector, options),
      page.waitForSelector(authWallSelector, options)
    ]);
    throw new Error("FOUND_LOGIN_SELECTOR");
  } catch (err) {
    browser.close();
    if (err.message.includes("FOUND_LOGIN_SELECTOR")) {
      throw new Error("NOT_LOGGED");
    }
    if (err.message.includes(notLoggedSelector) || err.message.includes(authWallSelector)) {
      throw new Error("CANT_ACCESS_PROFIL");
    } else {
      throw err;
    }
  }
}

module.exports = async (
  browser,
  cookies,
  url,
  waitTimeToScrapMs = 500,
  hasToGetContactInfo = false,
  puppeteerAuthenticate = undefined
) => {
  logger.info(`starting scraping url: ${url}`);
  const page = await openPage({ browser, cookies, url, puppeteerAuthenticate });
  const options = {
    timeout: 3000,
  }

  try {
    //look for profile main card
    logger.info(`starting profilePageIndicatorSelector: ${profilePageIndicatorSelector}`);
    await page.waitForSelector(profilePageIndicatorSelector, options);
  } catch (err) {
    if (err.message.includes(profilePageIndicatorSelector)) {
      await testLoginElementsInpage(page, browser);
    } else {
      browser.close();
      throw err;
    }
  }

  try {
    logger.info("scrolling page to the bottom");
    await scrollToPageBottom(page);
    if (waitTimeToScrapMs) {
      logger.info(`applying 1st delay`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, waitTimeToScrapMs / 2);
      });
    }

    await seeMoreButtons.clickAll(page);

    if (waitTimeToScrapMs) {
      logger.info(`applying 2nd (and last) delay`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, waitTimeToScrapMs / 2);
      });
    }

    const [profile] = await scrapSection(page, template.profile);
    const [about] = await scrapSection(page, template.about);
    const positions = await scrapSection(page, template.positions);
    const educations = await scrapSection(page, template.educations);
    const [recommendationsCount] = await scrapSection(
      page,
      template.recommendationsCount
    );
    const recommendationsReceived = await scrapSection(
      page,
      template.recommendationsReceived
    );
    const recommendationsGiven = await scrapSection(
      page,
      template.recommendationsGiven
    );
    const accomplishments = await scrapSection(page, template.accomplishments);
    const courses = await scrapSection(page, template.courses);
    const languages = await scrapSection(page, template.languages);
    const projects = await scrapSection(page, template.projects);
    const volunteerExperience = await scrapSection(
      page,
      template.volunteerExperience
    );
    const peopleAlsoViewed = await scrapSection(
      page,
      template.peopleAlsoViewed
    );
    const contact = hasToGetContactInfo ? await contactInfo(page) : [];

    const skills = await scrapSectionHardskills(page, template.skills);

    await page.close();
    logger.info(`finished scraping url: ${url}`);

    const rawProfile = {
      profile,
      about,
      positions,
      educations,
      skills,
      recommendations: {
        givenCount: recommendationsCount ? recommendationsCount.given : "0",
        receivedCount: recommendationsCount
          ? recommendationsCount.received
          : "0",
        given: recommendationsReceived,
        received: recommendationsGiven,
      },
      accomplishments,
      courses,
      languages,
      projects,
      peopleAlsoViewed,
      volunteerExperience,
      contact,
    };

    const cleanedProfile = cleanProfileData(rawProfile);
    browser.close();
    return cleanedProfile;
  } catch (unhandledError) {
    browser.close();
    throw unhandledError;
  }
};
