import { initialEssentialSession } from "@/_mock";
import { useState } from "react";
import { useParams } from "react-router";
import OptionPopup from "./components/option-popup";

const SessionView = () => {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [open, setOpen] = useState({
    option: false,
  });

  const filterData = initialEssentialSession.filter(
    (item) => item.unitId === id
  );

  const filteredCards = filterData.filter((card) => {
    const query = search.toLowerCase();
    return card.title.toLowerCase().includes(query);
  });
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {" "}
      <div className="mb-6">
        {" "}
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
      </div>{" "}
      {/* Cards Grid */}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            {" "}
            <h2
              className="text-xl font-bold text-gray-800 hover:underline hover:cursor-pointer"
              onClick={() => {
                setSessionId(card.id);
                setUnitId(card.unitId);
                setOpen((prev) => ({ ...prev, option: true }));
              }}
            >
              {card.title}
            </h2>{" "}
            <p className="text-gray-600">{card.subtitle}</p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {
        <OptionPopup
          open={open.option}
          sessionId={sessionId}
          unitId={unitId}
          onClose={() => setOpen((prev) => ({ ...prev, option: false }))}
        />
      }
    </div>
  );
};

export default SessionView;
