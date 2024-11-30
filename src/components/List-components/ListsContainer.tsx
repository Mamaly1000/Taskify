"use client";
import { List_with_Cards } from "@/types";
import { List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ListForm from "../form/ListForm";
import ListItem from "./ListItem";

interface ListsContainerProps {
  boardId: string;
  lists: List_with_Cards[];
}

const ListsContainer = ({ boardId, lists }: ListsContainerProps) => {
  const [OrderedLists, setOrderedLists] = useState(lists);

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);
  return (
    <ol className="flex gap-x-5 h-full">
      {OrderedLists.map((list, index) => (
        <ListItem key={list.id} list={list} index={index} />
      ))}
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default ListsContainer;
