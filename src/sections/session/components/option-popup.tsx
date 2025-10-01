import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";

interface Props {
  open: boolean;
  sessionId: string;
  onClose: () => void;
}

const OptionPopup = ({ open, sessionId, onClose }: Props) => {
  const router = useRouter();
  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {" "}
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-8 relative animate-fade-in">
            {" "}
            {/* Nút đóng */}{" "}
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              {" "}
              ✕{" "}
            </button>{" "}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {" "}
              Chọn chế độ{" "}
            </h2>{" "}
            <div className="space-y-4">
              {" "}
              <div className="bg-gray-50 rounded-xl shadow-md p-6 cursor-pointer hover:bg-blue-50 hover:shadow-lg transition">
                {" "}
                <h2
                  className="text-lg font-semibold text-gray-800"
                  onClick={() => router.push(paths.flashCard(sessionId))}
                >
                  FlashCard
                </h2>{" "}
              </div>{" "}
              <div className="bg-gray-50 rounded-xl shadow-md p-6 cursor-pointer hover:bg-green-50 hover:shadow-lg transition">
                {" "}
                <h2
                  className="text-lg font-semibold text-gray-800"
                  onClick={() => router.push(paths.writingCard(sessionId))}
                >
                  Writing
                </h2>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default OptionPopup;
