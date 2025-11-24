export default function ItemCard({ item }) {
  return (
    <div className="bg-[#0E1A2B] min-w-68 max-w-68 max-h-lg p-1 pl-0 pr-0 pt-0 rounded-2xl relative shadow-2xl">
      <span
        className={`text-xs w-14 text-center font-semibold m-2  p-1 rounded-full absolute right-1 ${item.status === "Lost" ? "bg-red-800/50 text-red-200" : item.status === "Found" ? "bg-green-800/50 text-green-200" : "bg-amber-800/50 text-amber-200"}`}
      >
        {item.status}
      </span>
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-50 object-fit mb-4 rounded-tr-2xl rounded-tl-2xl"
      />
      <div className="m-2 h-28 pt-2">
        <h2 className="text-xl font-bold mb-2 text-white">{item.name}</h2>
        <p className="text-gray-400 mb-6 text-xs">{item.description}</p>

        <p className="text-gray-400 flex text-xs pt-3 items-center">
          <img
            src="location_icon.png"
            alt="Library Logo"
            className="w-4 h-4 mr-1 ml-1"
          />
          {item.location} |
          <img
            src="calendar_icon.png"
            alt="User Logo"
            className="w-4 h-4 mr-1 ml-1"
          />{" "}
          {item.date}{" "}
        </p>
      </div>
    </div>
  );
}
