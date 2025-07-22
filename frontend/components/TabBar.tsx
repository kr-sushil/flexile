import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  // DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavMainType } from "@/lib/navLinks";

function TabBar({ nav }: { nav: NavMainType[] }) {
  nav.sort((a, b) => a.tabPriority - b.tabPriority);
  const mainNav = nav.slice(0, 3);
  // const moreNav = nav.slice(3);

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-[80] flex">
      {mainNav.map((nav) =>
        nav.route ? (
          <Link href={nav.route} key={nav.label} className="">
            <NavTab tab={nav} />
          </Link>
        ) : (
          <ListDrawer nav={nav} key={nav.label} />
        ),
      )}
    </div>
  );
}

const NavTab = ({ tab }: { tab: NavMainType }) => {
  const { label, icon: Icon, badge } = tab;
  return (
    <div className="flex flex-col items-center px-2 py-4">
      <div className="relative">
        {badge && badge > 0 ? (
          <Badge role="status" className="absolute -top-0.5 -right-0.5 border border-white bg-blue-500 p-1" />
        ) : null}
        <Icon width={20} height={20} />
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
};

const ListDrawer = ({ nav }: { nav: NavMainType }) => {
  const handleTriggerClick = (event: { stopPropagation: () => void }) => {
    // eslint-disable-next-line no-console
    console.log("tessfd");
    event.stopPropagation(); // Stops the event from propagating to parent elements
  };
  const [open, setOpen] = useState(false);
  return (
    // <Sheet>
    //   <SheetTrigger>Open</SheetTrigger>
    //   <SheetContent>
    //     <SheetHeader>
    //       <SheetTitle>Are you absolutely sure?</SheetTitle>
    //       <SheetDescription>
    //         This action cannot be undone. This will permanently delete your account and remove your data from our
    //         servers.
    //       </SheetDescription>
    //     </SheetHeader>
    //   </SheetContent>
    // </Sheet>
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Equity</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">Test</div>
          </div>
        </div>
      </DrawerContent>
      <DrawerTrigger onClick={handleTriggerClick}>
        <NavTab tab={nav} />
      </DrawerTrigger>
    </Drawer>
  );
};
export default TabBar;
