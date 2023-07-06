import { FormattedMessage } from 'react-intl';

export const publicNavConfig = [
  {
    title: <FormattedMessage id="home" />,
    path: '/',
  },
  {
    title: <FormattedMessage id="course" />,
    path: '/courses',
  },
];

export const adminNavConfig = [
  {
    title: <FormattedMessage id="home" />,
    icon: 'bx:home',
    path: '/admin',
  },
  {
    title: <FormattedMessage id="operations" />,
    path: '',
    icon: 'carbon:dashboard',
    children: [
      {
        title: <FormattedMessage id="course enrollment" />,
        path: '/admin/operations/course-enrollment',
      },
      {
        title: <FormattedMessage id="schedules (list)" />,
        path: '/admin/operations/schedules-list',
      },
      {
        title: <FormattedMessage id="schedules (cal)" />,
        path: '/admin/operations/schedules-cal',
      },
      {
        title: <FormattedMessage id="operations" />,
        path: '/admin/operations/operations',
      },
      {
        title: <FormattedMessage id="sales invoice" />,
        path: '/admin/operations/sales-invoice',
      },
    ],
  },
  {
    title: <FormattedMessage id="Teachers" />,
    path: '',
    icon: 'ph:sunglasses',
    children: [
      {
        title: <FormattedMessage id="Contacts" />,
        path: '/admin/teachers/contacts',
      },
      {
        title: <FormattedMessage id="Registration" />,
        path: '/admin/teachers/registration',
      },
    ],
  },
  {
    title: <FormattedMessage id="Students" />,
    path: '',
    icon: 'carbon:user',
    children: [
      {
        title: <FormattedMessage id="Contacts" />,
        path: '/admin/students/contacts',
      },
      {
        title: <FormattedMessage id="Registration" />,
        path: '/admin/students/registration',
      },
    ],
  },
  {
    title: <FormattedMessage id="management" />,
    path: '',
    icon: 'bx:terminal',
    children: [
      {
        title: <FormattedMessage id="leave-management" />,
        path: '/admin/management/leave-management',
      },
      {
        title: <FormattedMessage id="claim-management" />,
        path: '/admin/management/claim-management',
      },
    ],
  },
  {
    title: <FormattedMessage id="material-course" />,
    path: '',
    icon: 'bx:cart',
    children: [
      {
        title: <FormattedMessage id="create-course" />,
        path: '/admin/material-course/create-course',
      },
    ],
  },
  {
    title: <FormattedMessage id="system" />,
    path: '',
    icon: 'bx:server',
    children: [
      // {
      //   title: <FormattedMessage id="user-management" />,
      //   path: '/admin/system/user-management',
      // },
      {
        title: <FormattedMessage id="user-management" />,
        icon: 'material-symbols:manage-accounts-outline',
        path: '/admin/system/user/list',
      },
      {
        title: <FormattedMessage id="payroll-report" />,
        path: '/admin/system/payroll-report',
      },
      {
        title: <FormattedMessage id="holiday-table" />,
        path: '/admin/system/holiday-table',
      },
      {
        title: <FormattedMessage id="master-tables" />,
        path: '/admin/system/master-tables',
      },
      {
        title: <FormattedMessage id="content-settings" />,
        path: '/admin/system/content-settings',
      },
    ],
  },
  {
    title: <FormattedMessage id="my-account" />,
    path: '',
    icon: 'bx:category',
    children: [
      {
        title: <FormattedMessage id="schedule" />,
        path: '/admin/my-account/schedule',
      },
      {
        title: <FormattedMessage id="attend" />,
        path: '/admin/my-account/attend',
      },
      {
        title: <FormattedMessage id="leave" />,
        path: '/admin/my-account/leave',
      },
      {
        title: <FormattedMessage id="task" />,
        path: '/admin/my-account/task',
      },
      {
        // title: <FormattedMessage id="messenger" />,
        // path: '/admin/my-account/messenger',
        title: <FormattedMessage id="mail" />,
        icon: 'material-symbols:mail-outline',
        path: '/admin/mail',
      },
      {
        title: <FormattedMessage id="claim" />,
        path: '/admin/my-account/claim',
      },
    ],
  },
  // {
  //   title: <FormattedMessage id="mail" />,
  //   icon: 'material-symbols:mail-outline',
  //   path: '/admin/mail',
  // },
  {
    title: <FormattedMessage id="file-manager" />,
    icon: 'bx:file',
    path: '/admin/file-manager',
  },
];
