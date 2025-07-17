"use server";
import { BlogResponse, Blog } from "./types";
import qs from "qs";
import { gql, GraphQLClient } from "graphql-request";
import { unstable_cache } from 'next/cache'


const graphQlEndPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`;
const client = new GraphQLClient(graphQlEndPoint);

 const query = gql`
    query GetBlogBySlug($slug: String!) {
      blogs(filters: { slug: { eqi: $slug } }) {
        title
        description
        createdAt
        documentId
        categories {
          documentId
          name
        }
        image {
          url
          height
          width
          alternativeText
        }
        author {
          documentId
          name
        }
        comments(sort: ["createdAt:desc"]) {
          documentId
          name
          comment
          createdAt
          approved
        }
      }
    }
  `;

export const getBlogDetails = async (slug: string): Promise<Blog | null> => {
  
  try {
    const graphqlData = await client.request<BlogResponse>(query, { slug });
    // console.log('G Data: ', graphqlData.blogs[0])
    return graphqlData.blogs[0] as Blog
  } catch (e) {
    // console.log(e);
    return null;
  }
};

export const getCachedBlog = unstable_cache(
    async(slug)=>{
      const response = await client.request<BlogResponse>(query, { slug });
      return response.blogs[0] as Blog
    },
    undefined, 
    {
      revalidate: 300,
    }
  )