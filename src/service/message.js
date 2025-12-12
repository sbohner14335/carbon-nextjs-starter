/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Fetches a sample message from a placeholder API.
 */
export const fetchMessage = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }

  const blogpost = await response.json();
  return blogpost.title;
};
