"use client";
import React from "react";
import { List_with_Cards } from "@/types";
import ListHeader from "./ListHeader";
interface ListItemProps {
  list: List_with_Cards;
  index: number;
}
const ListItem = ({ index, list }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader list={list} />
      </div>
    </li>
  );
};

export default ListItem;
