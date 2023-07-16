import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <Link href={`/post/${post.id}`}>
      <div
        key={post.id}
        className="flex gap-3 border-b border-zinc-600 p-4 hover:bg-zinc-800  active:bg-zinc-800 "
      >
        <Link href={`/@${author.username}`}>
          <Image
            width={48}
            height={48}
            src={author.profilePicture}
            className="  rounded-full"
            alt={`@${author.username} 's profile picture`}
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
            <Link href={`/@${author.username}`}>
              {" "}
              <span>{`@${author.username}`}</span>
            </Link>
            <Link href={`/post/${post.id}`}>
              <span className="font-extralight">{`· ${dayjs(
                post.createdAt
              ).fromNow()}`}</span>
            </Link>
          </div>
          <span className="text-2xl">{post.content}</span>
        </div>
      </div>
    </Link>
  );
};
