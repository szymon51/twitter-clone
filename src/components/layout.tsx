import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { LucideLogIn, LucideLogOut } from "lucide-react";
import type { FC, PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  const { isSignedIn } = useUser();
  return (
    <main className="flex h-screen justify-center">
      <ActionsBar isSignedIn={!!isSignedIn} />
      <div className="h-full w-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};

interface ActionsBarProps {
  isSignedIn: boolean;
}

const ActionsBar: FC<ActionsBarProps> = ({ isSignedIn }) => {
  return (
    <div className="p-4">
      {isSignedIn ? (
        <SignOutButton>
          <Button className="rounded-lg p-4 hover:bg-zinc-800">
            <LucideLogOut />
          </Button>
        </SignOutButton>
      ) : (
        <SignInButton mode="modal">
          <Button className="rounded-lg p-4 hover:bg-zinc-800">
            <LucideLogIn />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
