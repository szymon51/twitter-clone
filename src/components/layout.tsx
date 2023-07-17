import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { LucideLogIn, LucideLogOut } from "lucide-react";
import type { FC, PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  const { isSignedIn, user } = useUser();
  return (
    <main className="flex h-screen justify-center md:gap-4 ">
      <ActionsBar isSignedIn={!!isSignedIn} username={user?.username} />
      <div className="h-full w-full  overflow-y-scroll border-x border-zinc-600 md:max-w-3xl">
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
  username: string | null | undefined;
}

const ActionsBar: FC<ActionsBarProps> = ({ isSignedIn, username }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col  items-start gap-3  p-3">
      <div className="rounded-xl  p-3 ">
        <LucideTwitter />
      </div>
      <Link
        href="/"
        className="flex h-12 gap-2 rounded-full  p-3 hover:bg-zinc-700"
      >
        <LucideHome />
        <p className="hidden whitespace-nowrap pl-2 pr-3 md:block">Home</p>
      </Link>
      <Link
        href={`/${username ?? ""}`}
        className="flex h-12 gap-2 rounded-full  p-3 hover:bg-zinc-700"
      >
        <LucideUser />
        <p className="hidden whitespace-nowrap pl-2 pr-3 md:block">Profile</p>
      </Link>
      {isSignedIn ? (
        <SignOutButton>
          <Button className="rounded-lg p-4 hover:bg-zinc-800">
            <LucideLogOut />
          </Button>
        </SignOutButton>
      ) : null}
      <Button
        className="flex h-12  gap-2 rounded-full bg-blue-500 p-3 hover:bg-blue-400 active:bg-blue-400 md:px-16"
        onClick={() => {
          router.push("/");
        }}
      >
        <LucideFeather className="sm:block md:hidden" />
        <p className="hidden whitespace-nowrap pl-2 pr-3 md:block">Tweet</p>
      </Button>
    </div>
  );
};
