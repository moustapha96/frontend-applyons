export const translationConfig = {
  namespaces: {
    common: ['common'],
    auth: ['auth'],
    pages: {
      home: ['home'],
      about: ['about'],
      features: ['features'],
      contact: ['contact'],
      faq: ['faq'],
      terms: ['terms'],
      privacy: ['privacy']
    },
    components: {
      header: ['header'],
      footer: ['footer'],
      navigation: ['navigation'],
      buttons: ['buttons'],
      forms: ['forms'],
      modals: ['modals'],
      tables: ['tables'],
      notifications: ['notifications']
    },
    errors: {
      document: ['errors.document'],
      request: ['errors.request'],
      validation: ['errors.validation'],
      network: ['errors.network']
    },
    institutes: {
      details: ['institut.details'],
      list: ['institut.list'],
      verification: ['institut.verification']
    },
    applicants: {
      profile: ['applicant.profile'],
      applications: ['applicant.applications'],
      documents: ['applicant.documents']
    }
  },
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en', 'es', 'de', 'it', 'ch'],
  defaultNS: 'common',
  resources: {
    fr: {
      common: require('../../locales/fr.json'),
      auth: require('../../locales/fr.json').auth,
      home: require('../../locales/fr.json').applyons.hero,
      about: require('../../locales/fr.json').applyons.about,
      features: require('../../locales/fr.json').applyons.features,
      contact: require('../../locales/fr.json').contact,
      faq: require('../../locales/fr.json').faq,
      terms: require('../../locales/fr.json').terms,
      privacy: require('../../locales/fr.json').privacy,
      header: require('../../locales/fr.json').header,
      footer: require('../../locales/fr.json').footer,
      navigation: require('../../locales/fr.json').nav,
      buttons: require('../../locales/fr.json').buttons,
      forms: require('../../locales/fr.json').forms,
      modals: require('../../locales/fr.json').modals,
      tables: require('../../locales/fr.json').tables,
      notifications: require('../../locales/fr.json').notifications,
      errors: require('../../locales/fr.json').errors,
      'institut.details': require('../../locales/fr.json').institut.details,
      'institut.list': require('../../locales/fr.json').institut.list,
      'institut.verification': require('../../locales/fr.json').institut.verification,
      'applicant.profile': require('../../locales/fr.json').applicant.profile,
      'applicant.applications': require('../../locales/fr.json').applicant.applications,
      'applicant.documents': require('../../locales/fr.json').applicant.documents
    }
  }
};
