export default function TabsSwitchFilter({ activeTab, setActiveTab }) {
    const tabs = ["All Reports", "Lost Items", "Found Items"];

    return (
        <div className="w-full h-18 pt-6 border-b-2 border-slate-700/50 items-center justify-center">
            <div className="flex gap-6 ml-10">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 h-full w-fit font-bold text-xl pb-2 transition-colors ${activeTab === tab
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}