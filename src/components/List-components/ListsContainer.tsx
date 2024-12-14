"use client";
import { List_with_Cards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "../form/ListForm";
import ListItem from "./ListItem";
import {
  Droppable,
  DragDropContext,
  OnDragEndResponder,
} from "@hello-pangea/dnd"; 

interface ListsContainerProps {
  boardId: string;
  lists: List_with_Cards[];
}

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListsContainer = ({ boardId, lists }: ListsContainerProps) => {
  const [OrderedLists, setOrderedLists] = useState(lists);
  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  const onDragEnd: OnDragEndResponder<string> = (result) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    // if dropped a list or card in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // if user moves a list
    if (type === "list") {
      const items = reOrder(OrderedLists, source.index, destination.index).map(
        (card, index) => ({ ...card, order: index })
      );
      setOrderedLists(items);
      // TODO => add server actions for list reordering
    }
    // if user moves a card
    if (type === "card") {
      const newOrderedLists = [...OrderedLists];
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedLists.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destinationList) {
        return;
      }
      // check if cards exist in source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // check if cards exist in destinaton list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }
      // check if user moves a card in the same list
      if (source.droppableId === destination.droppableId) {
        const reOrderedCards = reOrder(
          sourceList.cards,
          source.index,
          destination.index
        );
        const newReOrderedCards = reOrderedCards.map((card, index) => ({
          ...card,
          order: index,
        }));
        sourceList.cards = newReOrderedCards;
        setOrderedLists(newOrderedLists);
        // TODO => add server actions for cards reordering
      } else {
        // if user moves a card to another list
        // remove card from the source list
        const [draggedCard] = sourceList.cards.splice(source.index, 1);
        // edit draggedCard new listId
        draggedCard.listId = destination.droppableId;
        // add dragged card to the destination list
        destinationList.cards.splice(destination.index, 0, draggedCard);
        // reOrdering the source list cards
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        // reOrdering destination list cards
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedLists(newOrderedLists);
        // TODO => add server actions
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-5 h-full"
          >
            {OrderedLists.map((list, index) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListsContainer;
