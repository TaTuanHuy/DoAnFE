import React, { Suspense } from "react";

import SliderItem from "@/components/listItem/slideitem";

import subSlider1 from "@/../../public/img/home-subslider1.jpg";
import slide2 from "@/../../public/img/slider10.png";
import kid from "@/../../public/img/sub-slider-kid.jpg";
import subSliderMan from "@/../../public/img/sub-slider-man.jpg";
import Image from "next/image";
import Link from "next/link";
import slideBottom from "../../../public/img/slider-bottom.jpg";
import style from "./landing.module.css";
import Loading from "./loading";

export default function Counter() {
  return (
    <div className=" font-merriweather">
      {/* slider */}
      <div className="flex justify-center items-center relative animate-fade-down animate-once animate-duration-1500">
        <Image src={slide2} alt="..." className={`${style.slide} `} />
      </div>

      {/* content */}
      <div>
        <div className="flex flex-row justify-evenly  py-6 text-[#6d3f0a] animate-fade animate-duration-[2000ms] animate-ease-in-out">
          <div className="font-pacifico ">
            <h2 className="text-3xl font-bold smt:text-xl smt:font-medium">
              Beanpole
            </h2>
          </div>
          <div className="font-pacifico ">
            <h2 className="text-3xl font-bold smt:text-xl smt:font-medium">
              Beanpole
            </h2>
          </div>
          <div className="font-pacifico ">
            <h2 className="text-3xl font-bold smt:text-xl smt:font-medium">
              Beanpole
            </h2>
          </div>
          <div className="font-pacifico smt:hidden">
            <h2 className="text-3xl font-bold smt:text-xl smt:font-medium">
              Beanpole
            </h2>
          </div>
          <div className="font-pacifico smt:hidden lgt:hidden">
            <h2 className="text-3xl font-bold smt:text-xl smt:font-medium">
              Beanpole
            </h2>
          </div>
        </div>
        {/*clothes  */}
        <div className="grid grid-cols-2 grid-rows-1 px-10 gap-5 mx-24 smt:flex smt:flex-col smt:mx-0 smt:p-5 mdt:mx-0 lgt:mx-0">
          <div className="col-span-1 h-full relative animate-fade-left animate-duration-[2000ms] animate-ease-in-out">
            <Link href={"/man"}>
              <Image
                src={subSliderMan}
                alt="boy"
                className={`h-full rounded-2xl relative ${style.img} box-sd`}
              />
            </Link>
          </div>

          <div className=" col-span-1  h-full animate-fade-right animate-duration-[2000ms] animate-ease-in-out">
            {/* for her */}
            <div className="col-span-1 h-1/2 relative">
              <Link href={"/woman"}>
                <Image
                  src={subSlider1}
                  alt="girl"
                  className={`h-full rounded-2xl w-full  `}
                />
              </Link>
            </div>
            {/* for kids */}
            <div className="col-span-1 h-1/2 relative ">
              <Link href={"/kids"}>
                <Image
                  src={kid}
                  alt="girl"
                  className={`h-full rounded-2xl w-full `}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* product */}
      <Suspense fallback={<Loading />}>
        <div className="mx-40 smt:mx-0 mdt:mx-3 lgt:mx-3 xlt:mx-3">
          <SliderItem newItem>Sản Phẩm Mới</SliderItem>
          <SliderItem bestItem>Sản Phẩm Bán Chạy</SliderItem>
        </div>
      </Suspense>

      <div className="flex justify-center items-center relative mt-14">
        <Image src={slideBottom} alt="..." className={`${style.slide} `} />
      </div>
    </div>
  );
}
