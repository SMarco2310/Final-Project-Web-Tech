export default function TabsSwitchFilter({ activeTab, setActiveTab }) {
    const tabs = ["All Reports", "Lost Items", "Found Items"];

    return (
        <div className="w-full border-b border-slate-700/50 px-6 pt-6">
            <div className="flex gap-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab
                            ? "text-blue-500"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}