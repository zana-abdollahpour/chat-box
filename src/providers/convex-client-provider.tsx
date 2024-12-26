"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";

import LoadingLogo from "@/components/shared/loading-logo";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>

        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="mx-auto mt-12 w-fit text-center md:mt-24 lg:mt-32 xl:mt-48">
            <SignIn />
          </div>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
