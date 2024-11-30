import { Card, List } from "@prisma/client";

export type OrganizationResource = {
  name: string;
  id: string;
  imageUrl: string;
  slug: string;
};
export type List_with_Cards = List & { cards: Card[] };
export type Card_with_List = Card & { list: List };
