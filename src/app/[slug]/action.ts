'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

interface CommentData {
  name: string;
  comment: string;
  blogId: string;
  slug: string;
}

export async function addComment(data: CommentData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          comment: data.comment,
          blog: data.blogId,
          approved: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to submit comment");
    }
    console.log("Data Slug: ", data.slug)
    // Revalidate the blog page
    // revalidatePath(`/${data.slug}`);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function handleAction(slug: string) {
  revalidatePath (slug)
}