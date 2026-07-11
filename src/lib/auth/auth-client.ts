import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
export type SessionQueryData = Awaited<
  ReturnType<typeof authClient.getSession>
>;

export const sessionQueryKey = ["session"] as const;
export const sessionStaleTime = 5 * 60_000;

export const getSessionQueryOptions = () => {
  return queryOptions({
    queryKey: sessionQueryKey,
    queryFn: () => authClient.getSession(),
    staleTime: sessionStaleTime,
  });
};

export const refreshSession = (queryClient: QueryClient) => {
  queryClient.refetchQueries(getSessionQueryOptions());
};

export const hasFreshUnauthenticatedSession = (queryClient: QueryClient) => {
  const queryState =
    queryClient.getQueryState<SessionQueryData>(sessionQueryKey);

  return (
    queryState?.status === "success" &&
    !queryState.isInvalidated &&
    !queryState.data?.isStale &&
    queryState.data?.data === null
  );
};

export const useSignOut = (onSuccess?: () => void) =>
  useMutation({
    mutationFn: async () => await authClient.signOut(),
    onSuccess: async (data, variables, onMutateResult, context) => {
      console.log("successfully loggedOut");
      try {
        await refreshSession(context.client);
      } catch {
        context.client.removeQueries({ queryKey: sessionQueryKey });
      }
      if (onSuccess) {
        onSuccess();
      }
    },
  });
export const useSession = () => useQuery(getSessionQueryOptions());
