import { initialEssentialUnit } from "@/_mock";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { useState } from "react";

const UnitView = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const filteredCards = initialEssentialUnit.filter((card) => {
    const query = search.toLowerCase();
    return (
      card.title.toLowerCase().includes(query) ||
      card.subtitle.toLowerCase().includes(query)
    );
  });
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {" "}
      {/* Search Box */}{" "}
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
              onClick={() => router.push(paths.session(card.id))}
            >
              {card.title}
            </h2>{" "}
            <p className="text-gray-600">{card.subtitle}</p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default UnitView;
