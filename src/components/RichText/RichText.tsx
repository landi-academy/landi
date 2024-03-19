import { urlFor } from "@/libs/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const RichText = {
  type: {
    image: ({ value }: any) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={urlFor(value).url()}
            alt="Post image"
            width={700}
            height={700}
            className="object-contain py-6"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-5 py-5 space-y-2">
        {React.Children.map(children, (child, index) => (
          <li className="flex items-start list-disc marker:text-[#ff66c4]" key={index}>
            {child}
          </li>
        ))}
      </ul>
    ),
  },
  number: ({ children }: any) => (
    <ol className="mt-lg list-decimal">{children}</ol>
  ),
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-[50px] mt-10 mb-2 font-bold text-[#ff66c4]">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-[40px] mt-10 mb-2 font-bold text-[#ff66c4]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-[30px] mt-10 mb-2 font-bold text-[#ff66c4]">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl md:text-[26px] mt-10 mb-2 font-bold text-[#ff66c4]">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[#ff66c4] border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel} className="underline">
          {children}
        </Link>
      );
    },
  },
};