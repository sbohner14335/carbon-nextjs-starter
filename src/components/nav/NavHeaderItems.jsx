'use client';

import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import Link from 'next/link';

export const NavHeaderItems = ({ routesInHeader, currentPath }) => (
  <>
    {routesInHeader.map(({ path, carbon }) =>
      !carbon.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <HeaderMenu
            aria-label={carbon.label}
            key={path}
            menuLinkName={carbon.label}
          >
            {carbon.subMenu.map((subRoute) => (
              <HeaderMenuItem
                as={Link}
                href={subRoute.path}
                key={subRoute.path}
                isActive={subRoute.path === currentPath}
              >
                {subRoute.carbon.label}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        ) : (
          <HeaderMenuItem
            as={Link}
            key={path}
            href={path}
            isActive={path === currentPath}
          >
            {carbon?.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
