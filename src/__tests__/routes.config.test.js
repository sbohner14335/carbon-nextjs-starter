/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe } from 'vitest';
import { routes, routesInHeader, routesInSideNav } from '../routes/config';

describe('routes configuration', () => {
  test('routes array contains expected structure', () => {
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);

    const indexRoute = routes.find((route) => route.index === true);
    expect(indexRoute).toBeDefined();
    expect(indexRoute.path).toBe('/');

    const dashboardRoute = routes.find((route) => route.path === '/dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute.carbon).toBeDefined();
    expect(dashboardRoute.carbon.label).toBe('Dashboard');
    expect(dashboardRoute.carbon.inHeader).toBe(true);
  });

  test('routesInHeader contains only header items without submenu flag', () => {
    expect(Array.isArray(routesInHeader)).toBe(true);

    routesInHeader.forEach((route) => {
      expect(route.carbon).toBeDefined();
      expect(route.carbon.inHeader).toBe(true);
      expect(route.carbon.inSubMenu).toBeFalsy();
    });

    const headerRoutesCount = routes.filter(
      (route) =>
        route.carbon && route.carbon.inHeader && !route.carbon.inSubMenu,
    ).length;
    expect(routesInHeader.length).toBe(headerRoutesCount);
  });

  test('routesInSideNav contains only side nav items', () => {
    expect(Array.isArray(routesInSideNav)).toBe(true);

    routesInSideNav.forEach((route) => {
      expect(route.carbon).toBeDefined();
      expect(route.carbon.inSideNav).toBe(true);
      expect(route.carbon.inSubMenu).toBeFalsy();
    });

    const sideNavRoutesCount = routes.filter(
      (route) =>
        route.carbon && route.carbon.inSideNav && !route.carbon.inSubMenu,
    ).length;
    expect(routesInSideNav.length).toBe(sideNavRoutesCount);
  });

  test('routes with subMenu have their children marked as inSubMenu', () => {
    const routesWithSubMenu = routes.filter(
      (route) =>
        route.carbon && route.carbon.subMenu && route.carbon.subMenu.length > 0,
    );

    routesWithSubMenu.forEach((route) => {
      route.carbon.subMenu.forEach((subRoute) => {
        expect(subRoute.carbon).toBeDefined();
        expect(subRoute.carbon.inSubMenu).toBe(true);
      });
    });
  });
});
