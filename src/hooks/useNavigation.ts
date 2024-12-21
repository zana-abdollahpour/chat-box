import { useMemo } from "react";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { MessageSquare, Users } from "lucide-react";

import { api } from "#/convex/_generated/api";

export const useNavigation = () => {
  const pathname = usePathname();

  const requestsCount = useQuery(api.requests.count);

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        active: pathname.startsWith("/conversations"),
        icon: MessageSquare,
      },
      {
        name: "Friends",
        href: "/friends",
        active: pathname.startsWith("/friends"),
        icon: Users,
        requestsCount,
      },
    ],
    [pathname, requestsCount],
  );

  return paths;
};
