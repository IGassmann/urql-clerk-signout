'use client';

import { useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';
import { authExchange } from '@urql/exchange-auth';
import { Provider, cacheExchange, createClient, fetchExchange, mapExchange } from 'urql';

export default function URQLProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, signOut } = useAuth();

  const urqlClient = useMemo(() => {
    return createClient({
      url: '/api',
      exchanges: [
        cacheExchange,
        mapExchange({
          onError(error) {
            const isAuthError = error.response.status === 401;
            if (isAuthError) {
              signOut(); // This internally performs a redirect to the sign-in page with Next.js' router.push('/sign-in') function.
              // window.location.href = '/sign-in';  also doesn't work
              // router.push('/sign-in');            neither does this
            }
          },
        }),
        authExchange(async (utils) => {
          let sessionToken = await getToken();
          return {
            addAuthToOperation: (operation) => {
              if (!sessionToken) return operation;
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${sessionToken}`,
              });
            },
            didAuthError: (error) => error.response.status === 401,
            refreshAuth: async () => {
              sessionToken = await getToken({ skipCache: true });
            },
          };
        }),
        fetchExchange,
      ],
    });
  }, [getToken, isSignedIn]);

  return <Provider value={urqlClient}>{children}</Provider>;
}
