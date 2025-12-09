export default function ProfileItems({ item }) {
    const statusColors = {
        Lost: "bg-red-600/40 text-red-100",
        Found: "bg-green-500/40 text-green-100",
        Claimed: "bg-amber-500/40 text-amber-100",
    };

    return (

        <div className="w-full h-auto py-4 flex justify-between md: border-b  border-slate-700/50">
            <div className="w-3/5 flex flex-col mx-10 mt-5 " >
                <div className="flex gap-2 align-middle items-center mb-2">
                    <span
                        className={`pt-1 pb-1 px-4 rounded-full text-sm font-bold backdrop-blur-md mb-3 w-fit ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
                            }`}
                    >
                        {item.status}
                    </span>
                    <span className="text-slate-400">Reported on {item.date}</span>
                </div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-slate-400 text-base mb-6 line-clamp-2 flex-1 leading-relaxed">{item.description}</p>
                <p className="mb-5 bg-gray-500/20 text-gray-300 w-fit px-4 py-4 rounded-full"><a href={`/Item/${item.id}`}>View Details</a></p>
            </div>
            <div className="w-2/5 h-3/6 my-5 mx-10 items-center">
                <img src={item.image} alt={item.name} className=" aspect-video w-80 h-40 object-cover rounded-2xl mt-2" />
            </div>
        </div>
    );
}