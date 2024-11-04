"use client";
import React from "react";
import { Button } from "./button";
import { useFormState } from "react-dom";
import {
  Create_Board_InitialState_Type,
  createBoard,
} from "@/actions/CreateBoards.server";
import FormInput from "./FormInput";

const Form = ({ orgId }: { orgId: string }) => {
  const initState: Create_Board_InitialState_Type = {
    message: null,
    errors: {},
    orgId,
  };
  const [state, dispatch] = useFormState(createBoard, initState);

  return (
    <form action={dispatch}>
      <FormInput />
      {state?.errors?.title ? (
        <div className="flex flex-col space-x-1 text-sm text-rose-500 capitalize">
          {state.errors.title?.map((error) => (
            <span key={error}>{error}</span>
          ))}
        </div>
      ) : null}
    </form>
  );
};

export default Form;
