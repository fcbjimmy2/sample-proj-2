// ----------------------------------------------------------------------

// This is path file from minimal template, unnecessary variables are removed, please add back if needed.  

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/admin';

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/system/user/'),
    new: path(ROOTS_DASHBOARD, '/system/user/new'),
    list: path(ROOTS_DASHBOARD, '/system/user/list'),
    edit: (id) => path(ROOTS_DASHBOARD, `/system/user/${id}/edit`),
  },
};

