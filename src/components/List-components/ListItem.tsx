"use client";
import React, { ElementRef, useRef, useState } from "react";
import { List_with_Cards } from "@/types";
import ListHeader from "./ListHeader";
import CardForm from "../form/CardForm";
interface ListItemProps {
  list: List_with_Cards;
  index: number;
}
const ListItem = ({ index, list }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} list={list} />
        <CardForm
          ref={textAreaRef}
          listId={list.id}
          isEditing={isEditing}
          disableEditing={disableEditing}
          enableEditing={enableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
