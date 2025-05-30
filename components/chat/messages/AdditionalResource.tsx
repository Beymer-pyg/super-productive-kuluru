"use client";

import { LoadingState } from "@/components/ui/loadingState";
import { AdditionalResource as AdditionalResourceType } from "@/types/extended";
import { AdditionalResourceTypes } from "@prisma/client";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  file: AdditionalResourceType;
}

export const AdditionalResource = ({
  file: { id, name, type, url },
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={url}
      target="_blank"
      className={`w-44 h-44 sm:w-80 sm:h-80 rounded-sm overflow-hidden bg-secondary duration-1000 relative ${
        type === AdditionalResourceTypes.IMAGE && isLoading
          ? "animate-pulse"
          : "group"
      }`}
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 p-4">
        <ExternalLink color="white" size={80} />
      </div>
      <div className="w-full h-full flex group-hover:scale-110 transition-transform duration-300">
        {type === AdditionalResourceTypes.IMAGE ? (
          <Image
            onLoad={(e) => {
              setIsLoading(false);
            }}
            className="w-full h-full object-cover"
            src={url}
            alt=""
            width={1600}
            height={1600}
          />
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full gap-1">
            <FileText className="w-8 h-8 sm:w-12 sm:h-12" />
            <p className="break-all text-center text-xs sm:text-sm lg:text-base">
              {name}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};
