"use server";
import { BlogResponse } from "@/app/[slug]/blogType";
import qs from "qs";
import { gql, GraphQLClient } from "graphql-request";

const graphQlEndPoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`;
const client = new GraphQLClient(graphQlEndPoint);

export const getBlogDetails = async (slug: string) => {
  const query = qs.stringify({
    filters: {
      slug: {
        $eqi: slug,
      },
    },
    fields: ["title", "description", "createdAt", "documentId"],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name", "width", "height"],
      },
      categories: {
        fields: ["name"],
      },
      author: {
        fields: ["name"],
      },
      comments: {
        fields: ["name", "comment", "createdAt", "approved"],
        sort: ["createdAt:desc"],
      },
    },
  });
  const query2 = gql`
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
    const graphqlData = await client.request(query2, { slug });
    console.log('G Data: ', graphqlData.blogs[0])
    return graphqlData.blogs[0]
  } catch (e) {
    console.log(e);
    return null;
  }
};
