"use client";

import { ClerkProvider, SignInButton, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";

import LoadingLogo from "@/components/shared/loading-logo";
import { Button } from "@/components/ui/button";

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
          <Button asChild>
            <SignInButton />
          </Button>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
