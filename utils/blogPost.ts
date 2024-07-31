import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getBlogPosts = cache(async (): Promise<PageObjectResponse[]> => {
  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Status",
        status: {
          equals: "Done",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    //console.log("Fetched blog posts:", response.results);
    return response.results as PageObjectResponse[];
  } catch (error) {
    //console.error("Error fetching blog posts:", error);
    return [];
  }
});

export const getAuthorName = (authorProperty: any): string => {
  if (authorProperty && authorProperty.people && authorProperty.people.length > 0) {
    return authorProperty.people[0].name || 'Unknown Author';
  }
  return 'Unknown Author';
};
