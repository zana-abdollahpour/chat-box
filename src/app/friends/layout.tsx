import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBox - Friends",
};

export default function FriendsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
