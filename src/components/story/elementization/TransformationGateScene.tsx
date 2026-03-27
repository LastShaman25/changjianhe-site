"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function TransformationGateScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      align="left"
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative h-full">
            <div data-layer="1" className="absolute inset-y-[14%] left-[12%] w-px bg-white/14" />
            <div data-layer="1" className="absolute inset-y-[14%] right-[12%] w-px bg-white/14" />
            <div data-layer="2" className="absolute left-[22%] top-[18%] h-[64%] w-10 rounded-full border border-white/18 bg-white/6" />
            <div data-layer="3" className="absolute right-[22%] top-[18%] h-[64%] w-10 rounded-full border border-white/18 bg-white/6" />
            <div data-layer="4" className="absolute left-[50%] top-[14%] h-[72%] w-24 -translate-x-1/2 rounded-[2rem] border border-white/22 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]" />
            <div data-layer="3" className="absolute left-[18%] top-[50%] h-px w-[24%] bg-gradient-to-r from-transparent via-white/45 to-white/15" />
            <div data-layer="3" className="absolute right-[18%] top-[50%] h-px w-[24%] bg-gradient-to-l from-transparent via-white/45 to-white/15" />
            <div data-layer="5" className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_70%)]" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
