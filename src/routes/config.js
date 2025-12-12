/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MagicWand, LogoGithub } from '@carbon/icons-react';

export const routes = [
  {
    index: true,
    path: '/',
  },
  {
    path: '/dashboard',
    carbon: {
      label: 'Dashboard',
      inHeader: true,
    },
  },
  {
    path: '/link-1',
    carbon: {
      label: 'Link 1',
      inHeader: true,
    },
  },
  {
    path: '/link-2',
    carbon: {
      label: 'Link 2',
      inHeader: true,
    },
  },
  {
    path: '/link-3',
    carbon: {
      label: 'Link 3',
      inHeader: true,
    },
  },
  {
    path: '/link-4',
    carbon: {
      label: 'Link 4',
      inHeader: true,
    },
  },
  {
    path: '/link-4/sub-link-1',
    carbon: {
      label: 'Sub-link 1',
    },
  },
  {
    path: '/link-4/sub-link-2',
    carbon: {
      label: 'Sub-link 2',
    },
  },
  {
    path: '/link-4/sub-link-3',
    carbon: {
      label: 'Sub-link 3',
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started',
      inSideNav: true,
      label: 'Getting Started',
      icon: MagicWand,
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#get-started`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/how',
      label: 'How does this work',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#how-does-this-work`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/up-to-date',
      label: 'Keeping this up to date',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#keeping-this-up-to-date`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/report',
      label: 'Report problems',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#report-problems`,
    },
  },
  {
    carbon: {
      virtualPath: '/github',
      inSideNav: true,
      label: 'GitHub',
      icon: LogoGithub,
      href: `https://github.com/carbon-design-system/carbon-react-router-starter`,
    },
  },
];

// Organize routes into a hierarchy for use by the Carbon header and sidenav.
const routesProcessed = routes.map((route) => {
  if (!route.carbon) {
    return route;
  }

  const path = route.path || route.carbon.virtualPath;

  const subMenu = routes.filter((subRoute) => {
    const subPath = subRoute.path || subRoute.carbon.virtualPath;
    const childPath = new RegExp(`^${path}/[^/]+$`);

    return !route.index && subPath && childPath.test(subPath);
  });

  if (subMenu && subMenu.length > 0) {
    route.carbon.subMenu = subMenu;

    subMenu.forEach((menu) => {
      const subPath = menu.path || menu.carbon.virtualPath;
      menu.carbon = menu.carbon || { label: subPath };
      menu.carbon.inSubMenu = true;
    });
  }

  return route;
});

export const routesInHeader = routesProcessed.filter(
  (route) => route.carbon && route.carbon.inHeader && !route.carbon.inSubMenu,
);

export const routesInSideNav = routesProcessed.filter(
  (route) => route.carbon && route.carbon.inSideNav && !route.carbon.inSubMenu,
);
