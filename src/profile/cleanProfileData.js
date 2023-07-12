const logger = require('../logger')(__filename)
const pkg = require('../package')

module.exports = (profile) => {
  if(!profile?.profile?.name) {
    const messageError = `LinkedIn website changed and ${pkg.name} ${pkg.version} can't read basic data. Please report this issue at ${pkg.bugs.url}`
    logger.error(messageError, '')
    throw new Error(messageError)
  }

  profile.profile.summary = profile?.about?.text

  profile.positions?.forEach((position) => {
    if (position.companyNameWithRole && !position.companyName) {
      position.companyName = position.companyNameWithRole + ''; // clone
      position.companyNameWithRole = undefined; 
    }
    if(position.title){
        position.title = position.title.replace('Company Name\n', '').split('\n')[0]
    }
    if(position.description) {
      position.description = position.description.replace('See more', '');
      position.description = position.description.replace('see more', '');
	    position.description = position.description.replace('See less', '');
    }
    if (position?.companyName?.includes(' · ')){
      const splittedCompanyName = position.companyName.split(' · ');
      position.companyName = splittedCompanyName?.[0].trim();
      position.contractType = splittedCompanyName?.[1].trim();
    }
    if (position.skills){
      position.skills = position.skills.replace("Compétences : ", "");
      position.skills = position.skills.split(" · ");
      var json3 = position.skills.map(function(element) {
        return { title: element };
      });
      position.skills = JSON.parse(JSON.stringify(json3));
    }
    if (position?.location?.includes(' · ')){
      const splittedLocation = position.location.split(' · ');
      position.location = splittedLocation?.[0].trim();
      position.remotePolicy = splittedLocation?.[1].trim();
    }
    if (position.roles) {
      position.roles.forEach((role) => {
        if (role.title) {
          role.title = role.title.replace('Title\n', '').split('\n')[0];
        }
        if (role.description) {
          role.description = role.description.replace('See more', '');
          role.description = role.description.replace('see more', '');
        }
        if (role.date1) {
          const splittedRoleDate = role.date1.split('-');
          role.date1 = splittedRoleDate?.[0]?.trim();
          role.date2 = splittedRoleDate?.[1]?.substring(0, splittedRoleDate?.[1]?.indexOf('·')).trim();
        }
        if(position?.commonLocationRoles?.includes(' · ')){
          const splittedLocation = position.commonLocationRoles.split(' · ');
          role.location = splittedLocation?.[0].trim();
          role.remotePolicy = splittedLocation?.[1].trim();
        }
        if(position.commonLocationRoles && role.location){
          role.remotePolicy = role.location;
          role.location = position.commonLocationRoles;
        }
        if (role?.location?.includes(' · ')){
          const splittedLocation = role.location.split(' · ');
          role.location = splittedLocation?.[0].trim();
          role.remotePolicy = splittedLocation?.[1].trim();
        }
        if (role.skills){
          role.skills = role.skills.replace("Compétences : ", "");
          role.skills = role.skills.split(" · ");
          var json = role.skills.map(function(element) {
            return { title: element };
          });
          role.skills = JSON.parse(JSON.stringify(json));
        }
      });
      if(position.commonLocationRoles){
        delete position.commonLocationRoles;
      }
      position.roles = position?.roles?.filter((role) => Object.keys(role)?.length > 0);
      position.roles = position?.roles?.filter((role) => role.title !== undefined);
      if (position.roles.length > 0) {
        delete position.description;
        delete position.skills;
      }
      if (position.roles.length > 0 && profile.positions.isMore) {
        position.roles = position.roles.filter((_, index) => index !== 0);
      }
    }
    
    if (position?.date1?.includes('-')) {
      const splittedDate = position.date1.split('-')
      position.date1 = splittedDate?.[0].trim()
      position.date2 = splittedDate?.[1]?.substring(0, splittedDate?.[1]?.indexOf('·')).trim()
    }
   })

  profile.educations?.forEach((position) => {
    if (position?.date1?.includes('-')) {
      const splittedDate = position.date1.split('-')
      position.date1 = splittedDate?.[0].trim()
      position.date2 = splittedDate?.[1]?.trim()
    }
    if (position.skills){
      position.skills = position.skills.replace("Compétences : ", "");
      position.skills = position.skills.split(" · ");
      var json2 = position.skills.map(function(element) {
        return { title: element };
      });
      position.skills = JSON.parse(JSON.stringify(json2));
    }
  })

  if(profile.recommendations.receivedCount) {
    profile.recommendations.receivedCount = profile.recommendations.receivedCount.replace(/[^\d]/g, '')
  }

  if(profile.recommendations.givenCount) {
    profile.recommendations.givenCount = profile.recommendations.givenCount.replace(/[^\d]/g, '')
  }

  if(profile.recommendations.received) {
    profile.recommendations.received.forEach((recommendation) => {
      if(recommendation.summary){
        recommendation.summary = recommendation.summary.replace('See more', '')
        recommendation.summary = recommendation.summary.replace('See less', '')
      }
    })
  }

  if(profile.recommendations.given) {
    profile.recommendations.given.forEach((recommendation) => {
      if(recommendation.summary){
        recommendation.summary = recommendation.summary.replace('See more', '')
        recommendation.summary = recommendation.summary.replace('See less', '')
      }
    })
  }

  if(profile.courses){
    profile.courses = profile.courses.map(({ name, year }) => {
      const coursesObj = {}
      if(name) {
        coursesObj.name = name.replace('Course name\n', '')
      }
      if(year) {
        coursesObj.year = year.replace('Course number\n', '')
      }
      return coursesObj
    }
    );
  }

  if(profile.languages){
    profile.languages = profile.languages.map(({ name, proficiency }) => ({
      name: name ? name.replace('Language name\n', '')?.substring(0, name.indexOf('\n')) : undefined,
      proficiency: proficiency?.substring(0, proficiency.indexOf('\n')),
    }));
  }

  if(profile.projects){
    profile.projects = profile.projects.map(
      ({ name, date, description, link }) => ({
        name: name ? name.replace('Project name\n', '') : undefined,
        date,
        description: description ? description.replace('Project description\n', '') : undefined,
        link,
      }),
    );
  }
  
  return profile
}
