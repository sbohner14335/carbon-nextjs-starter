/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getNetworking } from './networking';
import { fetchMessage } from '../service/message';

const createMessageHandler = (networking) =>
  http.get('/api/message', async () => {
    networking.addRequests('/api/message');

    try {
      const message = await fetchMessage();
      return HttpResponse.json({ message });
    } catch (error) {
      console.error('Failed to mock message route', error);
      return HttpResponse.json(
        { message: 'Failed to fetch message' },
        {
          status: 500,
        },
      );
    } finally {
      networking.removeRequest('/api/message');
    }
  });

const _setupServer = (...args) => {
  const mocks = [];
  const networking = getNetworking();

  mocks.push(createMessageHandler(networking));

  const server = setupServer(...mocks, ...args);
  server.networking = networking;
  return server;
};

export const server = _setupServer();
