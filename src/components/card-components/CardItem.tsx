"use client";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";
interface props {
  card: Card;
  index: number;
}
const CardItem = ({ card, index }: props) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          role="button"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
