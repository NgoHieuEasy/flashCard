import React, { useCallback, useEffect, useRef } from "react";

import { initialEssentialStoryEn } from "@/_mock";
import { useRouter } from "@/routes/hooks/use-router";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Check,
  RefreshCwIcon,
  XIcon,
} from "lucide-react";

import { useState } from "react";
import { useParams } from "react-router-dom";

const WritingCardView: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [itemIdx, setItemIdx] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<"wrong" | "correct" | null>(null);

  const itemIdxRef = useRef(itemIdx);
  const answerRef = useRef(answer);
  const submittingRef = useRef(false);
  const showTimeoutRef = useRef<number | null>(null);

  const filterData = initialEssentialStoryEn.filter(
    (item) => item.sessionId === id
  );

  useEffect(() => {
    itemIdxRef.current = itemIdx;
  }, [itemIdx]);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  const showAnswerOnce = useCallback((duration = 1000) => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    setShowAnswer(true);
    showTimeoutRef.current = window.setTimeout(() => {
      setShowAnswer(false);
      showTimeoutRef.current = null;
    }, duration);
  }, []);

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        window.clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
    };
  }, []);

  // reset về đầu
  const handleRefresh = useCallback(() => {
    setItemIdx(0);
    setAnswer("");
    setStatus(null);
  }, []);

  // prev (lùi 1 item)
  const handlePrev = useCallback(() => {
    setItemIdx((prev) => {
      const next = Math.max(prev - 1, 0);
      return next;
    });
    setAnswer("");
    setStatus(null);
  }, []);

  // next (tiến 1 item)
  const handleNext = useCallback(() => {
    setItemIdx((prev) => {
      // nếu đã cuối thì không tăng nữa
      const next = Math.min(prev + 1, filterData.length - 1);
      return next;
    });
    setAnswer("");
    setStatus(null);
  }, []);

  // submit kiểm tra đáp án
  const handleSubmit = useCallback(() => {
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      // lấy giá trị hiện tại từ refs
      const idx = itemIdxRef.current;
      const correct = filterData[idx].en.trim().toLowerCase();
      const user = answerRef.current.trim().toLowerCase();

      if (user === correct) {
        setStatus("correct");

        setTimeout(() => {
          setItemIdx((prev) => Math.min(prev + 1, filterData.length - 1));
          setAnswer("");
          setStatus(null);
        }, 220);
      } else {
        setStatus("wrong");
        showAnswerOnce(1000);
      }
    } finally {
      setTimeout(() => {
        submittingRef.current = false;
      }, 200);
    }
  }, [showAnswerOnce]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        handleRefresh();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      // MetaRight / Meta: show answer
      if (e.code === "MetaRight" || e.key === "Meta") {
        e.preventDefault();
        showAnswerOnce(1000);
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleSubmit, handleRefresh, handlePrev, handleNext, showAnswerOnce]);

  const total = typeof filterData !== "undefined" ? filterData.length : 0;
  if (total === 0) {
    return <div className="p-4">No data (filterData is empty)</div>;
  }

  // render
  return (
    <div className="h-[700px]">
      {/* Header */}
      <div className="flex items-center gap-3 p-2 transition">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="w-5 h-5 text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full"
        />
        <span className="text-lg font-medium text-gray-800">Writing Skill</span>
      </div>

      {/* Hướng dẫn */}
      <div className="flex justify-center gap-2 mb-3 flex-wrap">
        <span className="font-bold text-lg ">
          <span className="text-yellow-500">Command: </span>Gợi ý từ
        </span>
        <span className="font-bold text-lg ">
          <span className="text-yellow-500">Tab: </span>Refresh
        </span>
        <span className="font-bold text-lg ">
          <span className="text-yellow-500">Enter: </span>Check đáp án
        </span>
        <span className="font-bold text-lg ">
          <span className="text-yellow-500">ArrowLeft: </span>Quay về từ trước
        </span>
        <span className="font-bold text-lg ">
          <span className="text-yellow-500">ArrowRight: </span>Tiến đến từ sau
        </span>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-lg text-black font-bold mb-2">
          {itemIdx + 1}/{total}
        </span>

        <div
          onClick={() => showAnswerOnce(1000)}
          className="flex items-center justify-center bg-gray-300 rounded-md w-72 h-72 cursor-pointer select-none mb-4"
        >
          <span className="text-3xl font-bold text-center px-4">
            {showAnswer ? filterData[itemIdx].en : filterData[itemIdx].vn}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setStatus(null);
              setAnswer(e.target.value);
            }}
            onKeyDown={(e) => {
              // tránh form submit local nếu có
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            placeholder="Type the word..."
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Hiện icon */}
          {status === "wrong" && <XIcon className="w-6 h-6 text-red-500" />}
          {status === "correct" && <Check className="w-6 h-6 text-green-500" />}
        </div>

        {/* Controls */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handlePrev}
            disabled={itemIdx <= 0}
            className={`w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full ${
              itemIdx <= 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            title="Prev"
          >
            <ArrowLeftIcon />
          </button>

          <button
            onClick={handleRefresh}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full"
            title="Refresh"
          >
            <RefreshCwIcon />
          </button>

          <button
            onClick={handleNext}
            disabled={itemIdx >= total - 1}
            className={`w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black hover:cursor-pointer transition hover:bg-gray-300 rounded-full ${
              itemIdx >= total - 1 ? "opacity-50 pointer-events-none" : ""
            }`}
            title="Next"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingCardView;
