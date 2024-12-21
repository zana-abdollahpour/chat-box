import ConversationFallback from "@/components/shared/conversation/conversation-fallback";
import ItemList from "@/components/shared/item-list";
import AddFriendDialog from "./_components/add-friend-dialog";

export default function FriendsPage() {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        Friends Page
      </ItemList>
      <ConversationFallback />
    </>
  );
}
