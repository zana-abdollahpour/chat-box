import MobileNav from "@/components/shared/sidebar/navigation/mobile-nav";
import DesktopNav from "@/components/shared/sidebar/navigation/desktop-nav";

export default function SidebarWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 md:flex-row">
      <MobileNav />
      <DesktopNav />
      <main className="flex h-[calc(100%_-_80px)] w-full gap-4 md:h-full">
        {children}
      </main>
    </div>
  );
}
