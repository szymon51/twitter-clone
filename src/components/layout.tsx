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
      <FollowSuggestions />
    </main>
  );
};

const FollowSuggestions = () => {
  return (
    <div className="m-3  hidden h-72 w-48 flex-shrink-0 flex-col justify-between rounded-2xl bg-zinc-800 p-4 lg:flex">
      <h1 className="text-lg font-bold">Who to follow</h1>
      <SuggestionUserCard
        imageSrc="/profile1.jpg"
        name="John Doe"
        nickName="@johndoe"
      />
      <SuggestionUserCard
        imageSrc="/profile2.jpg"
        name="Jane Patty"
        nickName="@janepatty"
      />
      <SuggestionUserCard
        imageSrc="/profile3.jpg"
        name="Blaire Wittkins"
        nickName="@blairwittkins"
      />
      <SuggestionUserCard
        imageSrc="/profile4.jpg"
        name="James Erl"
        nickName="@jameserl"
      />
    </div>
  );
};

interface SuggestionUserCardProps {
  imageSrc: string;
  name: string;
  nickName: string;
}

const SuggestionUserCard = ({
  imageSrc,
  name,
  nickName,
}: SuggestionUserCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={imageSrc}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
        alt="profile"
      />
      <div>
        <p>{name}</p>
        <p className="text-zinc-400">{nickName}</p>
      </div>
    </div>
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
