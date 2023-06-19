import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export const createNotionEntry = async (
  image_url: string,
  type: string,
  file_type: string,
  size: number,
  key: string
) => {
  if (!databaseId) {
    throw new Error("Database id is missing");
  }

  const file_data = {
    type: "external",
    name: "image",
    external: {
      url: image_url,
    },
  };

  const entryData: any = {
    Type: {
      select: {
        name: type,
      },
    },
    Size: { number: size },
    Status: {
      status: {
        name: "Not started",
        color: "red",
      },
    },
    Link: { url: image_url },
    "Time Created": { date: { start: new Date().toISOString() } },
    "File Type": { select: { name: file_type } },
    Image: {
      files: [file_data],
    },
    Key: { title: [{ text: { content: key } }] },
  };

  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    //@ts-ignore
    properties: entryData,
  });

  console.log(response);
  console.log("Success! Entry added.");
};
