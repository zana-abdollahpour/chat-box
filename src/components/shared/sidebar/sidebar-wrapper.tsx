export default function SidebarWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 lg:flex-row">
      <main className="lg: flex h-[calc(100%_-_80px)] w-full gap-4 lg:h-full">
        {children}
      </main>
    </div>
  );
}
