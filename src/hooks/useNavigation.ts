import { useMemo } from "react";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { MessageSquare, Users } from "lucide-react";

import { api } from "#/convex/_generated/api";

export const useNavigation = () => {
  const pathname = usePathname();
  const requestsCount = useQuery(api.requests.count);
  const conversations = useQuery(api.conversations.get);

  const unseenMessagesCount = useMemo(
    () => conversations?.reduce((acc, cur) => acc + cur.unseenCount, 0),
    [conversations],
  );

  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        active: pathname.startsWith("/conversations"),
        icon: MessageSquare,
        unseenMessagesCount,
      },
      {
        name: "Friends",
        href: "/friends",
        active: pathname.startsWith("/friends"),
        icon: Users,
        requestsCount,
      },
    ],
    [pathname, requestsCount, unseenMessagesCount],
  );

  return paths;
};
