import { initialEssentialStoryEn } from "@/_mock";
import { useRouter } from "@/routes/hooks/use-router";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FlashCardView = () => {
  const router = useRouter();

  const [itemIdx, setItemIdx] = useState(0);
  const [showVN, setShowVN] = useState(false);

  const { id } = useParams<{ id: string }>();

  const filterData = initialEssentialStoryEn.filter(
    (item) => item.sessionId === id
  );

  const handleClick = () => {
    setShowVN(true);
    setTimeout(() => {
      setShowVN(false);
    }, 1000);
  };
  return (
    <div className="h-[700px]">
      <div className="flex items-center  gap-3 p-2   transition">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="w-5 h-5 text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full"
        />
        <span className="text-lg font-medium text-gray-800">Flash Card</span>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        <div className="">
          <div
            onClick={handleClick}
            className="flex items-center justify-center bg-gray-300 rounded-sm w-72 h-72 cursor-pointer select-none"
          >
            <span className="text-3xl font-bold">
              {" "}
              {showVN ? filterData[itemIdx].vn : filterData[itemIdx].en}{" "}
            </span>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          {/* Nút trái */}
          <button
            onClick={() => {
              if (itemIdx <= 0) return;
              setItemIdx((prev) => prev - 1);
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full"
          >
            <ArrowLeftIcon />
          </button>

          {/* Nút phải */}
          <button
            onClick={() => {
              if (itemIdx >= filterData.length - 1) return;
              setItemIdx((prev) => prev + 1);
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardView;
