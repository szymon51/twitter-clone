import Head from "next/head";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import type { GetStaticProps, NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";

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
        <PostView {...data} />
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
