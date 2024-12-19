import ItemList from "@/components/shared/item-list";

export default function ConversationsLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <ItemList title="Conversations">Conversations Page</ItemList>
      {children}
    </>
  );
}
