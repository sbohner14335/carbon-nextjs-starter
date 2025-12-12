/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use client';

import { GlobalTheme, Theme } from '@carbon/react';
import { useThemeContext } from '../context/ThemeContext';

export const ThemeLayout = ({ children }) => {
  const { themeMenu } = useThemeContext();

  return (
    <GlobalTheme theme={themeMenu}>
      <Theme theme={themeMenu}>{children}</Theme>
    </GlobalTheme>
  );
};
