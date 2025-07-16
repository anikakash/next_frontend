"use server";
import { BlogResponse, Blog } from "./types";
import qs from "qs";
import { gql, GraphQLClient } from "graphql-request";

const graphQlEndPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`;
const client = new GraphQLClient(graphQlEndPoint);

export const getBlogDetails = async (slug: string): Promise<Blog | null> => {
  
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

  try {
    const graphqlData = await client.request<BlogResponse>(query, { slug });
    // console.log('G Data: ', graphqlData.blogs[0])
    return graphqlData.blogs[0] as Blog
  } catch (e) {
    // console.log(e);
    return null;
  }
};
