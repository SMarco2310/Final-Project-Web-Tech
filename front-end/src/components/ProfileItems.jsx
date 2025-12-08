export default function ProfileItems({ item }) {
    const statusColors = {
        Lost: "bg-red-600/40 text-red-100",
        Found: "bg-green-500/40 text-green-100",
        Claimed: "bg-amber-500/40 text-amber-100",
    };

    return (

        <div className="w-full h-auto py-4 flex md: border-b  border-slate-700/50">
            <div className="w-1/2 flex flex-col mx-10 mt-5 " >
                <div className="flex gap-2 align-middle">
                    <span
                        className={`pt-1 pb-1 px-4 py-1 rounded-full text-sm font-bold backdrop-blur-md mb-3 w-fit ${statusColors[item.status] || "bg-gray-500/20 text-gray-300"
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
            <div className="w-1/3 my-5 mx-20">
                <img src={item.image} alt={item.name} className="w-[300px] h-[200px] object-cover rounded-lg" />
            </div>
        </div>
    );
}