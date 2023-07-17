import Head from "next/head";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import type { GetStaticProps, NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 border-b border-zinc-600 p-4 text-xl font-bold hover:bg-zinc-800"
    >
      <LucideArrowLeft />
      Post
    </Link>
  );
};

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <Navigation />
        <PostView {...data} />
        <p className="text-bold p-4 text-center text-lg">
          A place for future comments ...
        </p>
      </PageLayout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no slug");

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default SinglePostPage;
