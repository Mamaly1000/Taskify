"use client";
import { cn } from "@/lib/utils";
import { Card } from "@prisma/client";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";

interface props {
  className?: string;
  cards: Card[];
  listId: string;
}

const CardsList = ({ className, cards, listId }: props) => {
  return (
    <Droppable droppableId={listId} type="card">
      {(provided) => (
        <ol
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", className)}
        >
          {cards.map((card, index) => (
            <CardItem index={index} card={card} key={card.id} />
          ))}
          {provided.placeholder}
        </ol>
      )}
    </Droppable>
  );
};

export default CardsList;
