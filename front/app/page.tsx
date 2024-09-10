"use client";
import Navbar from "../components/navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function Hero() {
  const words = [{text: "Turning", className: "text-white  "}, {text: "tasks", className: "text-white"}, {text: "into ", className: "text-white"}, {text: "achievements", className: "text-blue-500"}];
  return (
    <div className="h-screen relative">
      <Navbar />
      <div className="flex-col py-28 justify-center items-center gap-0 my-auto h-min-f">
        <TypewriterEffect className="select-none" words={words} />
        <p className="pt-4 m-auto text-xl text-center select-none">Your task management app to organize and streamline your daily workflow</p>
      </div>
    </div>
  );
}
