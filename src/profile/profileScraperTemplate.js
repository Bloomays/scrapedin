const template = {
  profile: {
    selector: '.pv-top-card',
    fields: {
      name: `.text-heading-xlarge`,
      headline: `.text-body-medium`,
      location: '.text-body-small.inline.t-black--light.break-words',
      connections: `li.text-body-small`,
      imageurl: {
        selector: `img.pv-top-card-profile-picture__image`,
        attribute: 'src'
      }
    }
  },
  about: {
    selector: "//section[contains(., 'Infos')]//div[contains(@class, 'display-flex') and contains(@class, 'ph5') and contains(@class, 'pv3')]",
    fields: {
      text: 'span[class=visually-hidden]'
    }
  },
  positions: {
    default:{
      selector: "//*[@id='experience']/following-sibling::div/ul/li",
      fields: {
        title: 'div.display-flex.flex-column.full-width > div > div > div > div > div > div > span',
        link: {
          selector: 'a',
          attribute: 'href'
        },
        url: {
          selector: 'a',
          attribute: 'href'
        },
        companyName: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)',
        companyNameWithRole: 'div.display-flex.flex-column.full-width.align-self-center > div > a > div > div > div > div > span',
        location: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(4) > span:nth-child(1)',
        commonLocationRoles : 'li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',
        description: 'ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(1) > div > ul > li > div > div > div > div > span',
        date1: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(3) > span:nth-child(1)',
        date2: '.pv-entity__bullet-item-v2',
        skills:'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > div > span:nth-child(1)',
        roles: {
          selector: 'li',
          hasChildrenFields: true,
          fields: {
            title: 'div > div.display-flex.flex-column.full-width.align-self-center > div > a > div > div > div > div > span:nth-child(1)',
            description: 'li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)',
            date1: 'li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(2) > span:nth-child(1)',
            date2: '.pv-entity__bullet-item-v2',
            skills: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > div > span:nth-child(1)',
            location: 'li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(3) > span:nth-child(1)'
          }
        }
      }
    },
    more:{
      selector: "//li[contains(@id, 'EXPERIENCE-VIEW-DETAILS')]/div/div[contains(@class, 'pvs-entity')and contains(@class, 'pvs-entity--padded')]", 
      fields: {
        title: 'div.display-flex.flex-column.full-width > div > div > div > div > div > div > span',
        link: {
          selector: 'a',
          attribute: 'href'
        },
        url: {
          selector: 'a',
          attribute: 'href'
        },
        companyName: 'li.pvs-list__paged-list-item.artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)',
        companyNameWithRole: 'div.display-flex.flex-column.full-width.align-self-center > div > a > div > div > div > div > span',
        location: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(4) > span:nth-child(1)',
        commonLocationRoles : 'li > div > div:nth-child(1) > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',//'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',
        description: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > span:nth-child(1)',
        date1: 'div > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(3) > span:nth-child(1)',
        date2: '.pv-entity__bullet-item-v2',
        skills:'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)',
        roles: {
          selector: 'li',
          hasChildrenFields: true,
          fields: {
            title: 'div > div > div.display-flex.flex-column.full-width.align-self-center > div > a > div',
            description: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > span:nth-child(1)',
            date1: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(2) > span:nth-child(1)',
            date2: '.pv-entity__bullet-item-v2',
            skills:'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)',
            location: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(3) > span:nth-child(1)',
          }
        }
      }
    },
    viewMore: '//a[contains(@href, "/details/experience?profile")]',
  },
  educations: {
    default:{
      selector: "//*[@id='education']/following-sibling::div/ul/li",
      fields: {
        title:
        'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > div > div > div > div > span:nth-child(1)',
        degree:
        'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span:nth-child(2) > span:nth-child(1)',
        url: {
          selector: 'a',
          attribute: 'href'
        },
        skills : 'div.pvs-list__outer-container > ul > li:nth-child(1) > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > div > span:nth-child(1)',
        //fieldOfStudy: 'div.pvs-list__outer-container > ul > li:nth-child(2) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)',
        date1: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',
        date2: '.pv-entity__dates time:nth-child(2)',
        description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)'
      }
    },
    more: {
      selector: "//li[contains(@id, 'EDUCATION-VIEW-DETAILS')]/div/div[contains(@class, 'pvs-entity')and contains(@class, 'pvs-entity--padded')]",
      fields: {
        title:
        'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > div > div > div > span:nth-child(1)',
        degree:
        'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal:nth-child(2):not(.t-black--light) > span:nth-child(1)',
        url: {
          selector: 'a',
          attribute: 'href'
        },
        skills : 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > ul > li > div > div > div > span:nth-child(1)',
        //fieldOfStudy: 'div.pvs-list__outer-container > ul > li:nth-child(2) > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)',
        date1: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span.t-14.t-normal.t-black--light > span:nth-child(1)',
        date2: '.pv-entity__dates time:nth-child(2)',
        description: 'li > div > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(1) > div > ul > li > div > div > div > span:nth-child(1)',
      }
    },
    viewMore: '//a[contains(@href, "/details/education?profile")]',
    
  },
  skills: {
    selector: '//a[contains(@href, "details/skills?profile")]',
    fields: {
      title: '#main > section > div.artdeco-tabs.artdeco-tabs--size-t-48.ember-view > div.artdeco-tabpanel.active.ember-view > div > div > div.scaffold-finite-scroll__content > ul > li > div > div > div > div > a > div > span  > span:nth-child(1)',
    }
  },
  recommendationsCount: {
    selector: '.recommendations-inlining',
    fields: {
      received: '.artdeco-tab:nth-child(1)',
      given: '.artdeco-tab:nth-child(2)'
    }
  },
  recommendationsReceived: {
    selector: "//*[@id='recommendations']/following-sibling::div/div/following-sibling::div/div/ul/li",
    fields: {
      user: {
        selector: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > div > span.mr1.hoverable-link-text.t-bold > span:nth-child(1)',
        attribute: 'href'
      },
      text: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span:nth-child(1)',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: 'a h3'
      },
      userDescription: {
        selector: 'div > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a > span:nth-child(2) > span:nth-child(1)'
      }
    }
  },
  recommendationsGiven: {
    selector: '.artdeco-tabpanel li.pv-recommendation-entity',
    fields: {
      user: {
        selector: '.pv-recommendation-entity__member',
        attribute: 'href'
      },
      text: 'blockquote.pv-recommendation-entity__text',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: 'a h3'
      },
      userDescription: {
        selector: '.pv-recommendation-entity__headline'
      }
    }
  },
  accomplishments: {
    selector: '.pv-accomplishments-section > div',
    fields: {
      count: 'h3 span:last-child',
      title: '.pv-accomplishments-block__title',
      items: {
        selector: 'li',
        isMultipleFields: true
      }
    }
  },
  peopleAlsoViewed: {
    selector: 'li.pv-browsemap-section__member-container',
    fields: {
      user: {
        selector: 'a',
        attribute: 'href'
      },
      text: 'p',
      profileImage: {
        selector: 'a img',
        attribute: 'src'
      },
      name: {
        selector: '.name'
      }
    }
  },
  volunteerExperience: {
    selector: 'section.volunteering-section li',
    fields: {
      title: 'h3',
      experience: 'span[class=pv-entity__secondary-title]',
      location: '.pv-entity__location span:nth-child(2)',
      description: '.pv-volunteer-causes',
      date1: '.pv-entity__date-range span:nth-child(2)',
      date2: '.pv-entity__bullet-item'
    }
  },
  courses: {
    selector: "//*[@id='courses']/following-sibling::div/ul/li",
    fields: {
      name: '.pv-accomplishment-entity__title',
      year: '.pv-accomplishment-entity__course-number'
    }
  },
  languages: {
    selector: "//*[@id='languages']/following-sibling::div/ul/li",
    fields: {
      name: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > div',
      proficiency:
        'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width > span'
    }
  },
  projects: {
    selector: "//*[@id='projects']/following-sibling::div/ul/li",
    fields: {
      name: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > span > span:nth-child(1)',
      date: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span > span:nth-child(1)',
      description: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(3) > div > ul > li > div > div > div',
      link: {
        selector: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li:nth-child(2) > div > a',
        attribute: 'href'
      }
    }
  }
};

module.exports = template;
