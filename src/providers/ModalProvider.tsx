"use client";
import CardModal from "@/components/modals/card-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
