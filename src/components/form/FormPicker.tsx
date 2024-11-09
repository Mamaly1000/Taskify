"use client";
import { backUpSplashImages } from "@/constants/splashImages";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./FormErrors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
type SplashImageType = Record<string, any>;
const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<SplashImageType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<null | string>(null);

  useEffect(() => {
    const fetchedImages = async () => {
      try {
        throw new Error("failed to fetch");
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          setImages(result.response as SplashImageType[]);
        } else {
          setImages(backUpSplashImages);
        }
      } catch (error) {
        console.log("failed to get images from unsplash", error);
        setImages(backUpSplashImages);
      } finally {
        setLoading(false);
      }
    };
    fetchedImages();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[100px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <article
            key={image.id}
            className={cn(
              "cursor-pointer overflow-hidden relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-progress"
            )}
            onClick={() => {
              if (!pending && !isLoading) {
                if (image.id !== selectedImageId) {
                  setSelectedImageId(image.id);
                } else {
                  setSelectedImageId(null);
                }
              }
            }}
          >
            <input
              className="hidden"
              type="radio"
              checked={selectedImageId === image.id}
              id={id}
              name={id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="splash image"
              fill
              className="rounded-sm object-cover"
            />

            <div
              className={cn(
                "absolute top-0 left-0 right-0 bottom-0 min-w-full max-w-full z-[5] bg-black/60 flex items-center justify-center rounded-sm opacity-0 transition-all",
                selectedImageId === image.id && "opacity-100"
              )}
            >
              <Check className="h-4 w-4 text-white" />
            </div>

            <Link
              href={image.links.html}
              target="_blank"
              className=" bg-black/70 text-white text-[10px] capitalize text-start z-10   min-w-full max-w-full min-h-[40%] max-h-[40%] absolute bottom-0 right-0 left-0 flex items-end justify-start ps-1 py-1 whitespace-nowrap rounded-sm translate-y-[100%] group-hover:translate-y-0 transition-all"
            >
              {image.user.name.length > 10
                ? image.user.name.slice(0, 10) + "..."
                : image.user.name}
            </Link>
          </article>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

export default FormPicker;
