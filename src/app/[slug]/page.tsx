import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { BlogResponse, Category, Comment } from "@/graphQL/types";
import CommentForm from "./CommentForm";
import qs from "qs";
import { getBlogDetails, getCachedBlog } from "@/graphQL";
import RevalidateButton from "./RevalidateButton";


export const revalidate = 3600;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?blogs?fields[0]=slug&pagination[pageSize]=999&pagination[page]=1`,
//     { next: { revalidate: 0 } }
//   );
//   const blogs = await res.json();

//   return blogs?.data.map((blog: any) => ({
//     slug: blog.slug,
//   }));
// }

async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // const myBlog = await getBlogDetails(slug);
  // const myBlog = await getCachedBlog(slug);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?fields[0]=title&fields[1]=description&fields[2]=createdAt&fields[3]=documentId&filters[slug][$eq]=${slug}&populate[author][fields][0]=documentId&populate[author][fields][1]=name&populate[categories][fields][0]=documentId&populate[categories][fields][1]=name&populate[image][fields][0]=url&populate[image][fields][1]=height&populate[image][fields][2]=width&populate[image][fields][3]=alternativeText&populate[comments][fields][0]=documentId&populate[comments][fields][1]=name&populate[comments][fields][2]=comment&populate[comments][fields][3]=createdAt&populate[comments][fields][4]=approved`,
    { next: { revalidate: 120, tags: [slug] }, cache: "force-cache" }
  );
  // const timeRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/currentTime`, 
  //   { next: { revalidate: 300, tags: [slug] }, cache: "force-cache" })
  // const time = await timeRes.json();
  // console.log("TIME: ", time);
  const val = await res.json();
  const myBlog = val.data[0];
  console.log("MyBlog: ", myBlog);

  if (!myBlog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Blog post not found
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2" />
          Back to blog
        </Link>
      </div>

      {/* Image */}
      {myBlog.image && myBlog.image.length > 0 && (
        <div className="w-full h-auto rounded-lg overflow-hidden shadow-md">
          <Image
            src={`${myBlog.image[0].url}`}
            alt={myBlog.image[0].alternativeText || myBlog.title}
            width={myBlog.image[0].width}
            height={myBlog.image[0].height}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Blog content */}
      <div className="space-y-6">
        {/* Categories */}
        {myBlog.categories?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {myBlog.categories.map((category: any) => (
              <span
                key={category.documentId}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                <Tag size={14} />
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          {myBlog.title}
        </h1>
       {/* <pre>{JSON.stringify(time)}</pre> */}
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{myBlog.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(myBlog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              {`${Math.ceil(JSON.stringify(myBlog.description).length / 2000)}`}{" "}
              min read
            </span>
          </div>
        </div>
        <RevalidateButton/>
        {/* Blog content */}
        <div className="prose max-w-none prose-headings:font-semibold prose-img:rounded-md mt-8">
          <BlocksRenderer content={myBlog.description as any} />
        </div>

        {/* Comments section */}
        {/* Add a comment section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Add a Comment</h2>
          <CommentForm blogId={myBlog.documentId} slug={slug} />
        </div>
        {myBlog.comments && myBlog.comments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Comments</h2>
            <div className="space-y-6">
              {myBlog.comments.length > 0 &&
                myBlog.comments.map(
                  (comment: any) =>
                    (
                      <div
                        key={comment.documentId}
                        className="bg-gray-50 border p-6 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                            {comment?.name?.charAt(0).toUpperCase()}
                          </div>
                          <h3 className="font-medium">{comment.name}</h3>
                          <span className="text-sm text-gray-500">
                            • {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <div className="prose prose-sm">
                          {/* <BlocksRenderer content={comment.comment as any}/> */}
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        )}

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="mr-2" />
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogDetailsPage;
