import Image from "next/image";
import noTaskFoundImage from "@/assets/no-task-found.png";

export default function NoTaskFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10">
      <div className="w-[350px] lg:w-[500px] xl:w-[700px]">
        <Image
          src={noTaskFoundImage}
          alt="No Task Found Image"
          className="w-full h-auto"
          priority
        />
      </div>
      <p className="text-xl text-[#1F1F1F] font-medium mt-4">
        No Task is Available yet, Please Add your New Task
      </p>
    </div>
  );
}
