import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Users } from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();
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
      },
    ],
    [pathname],
  );

  return paths;
};
