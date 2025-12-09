import { useState } from "react";
import ProfileItems from "./ProfileItems";
import TabsSwitchFilter from "./TabsSwitchFilter";

export default function ProfileGallery({ items }) {
    const [activeTab, setActiveTab] = useState("All Reports");

    const filteredItems = items.filter((item) => {
        if (activeTab === "All Reports") return true;
        if (activeTab === "Lost Items") return item.status === "Lost";
        if (activeTab === "Found Items") return item.status === "Found";
        return true;
    });

    return (
        <div className="w-full h-auto border border-slate-700/50 rounded-3xl overflow-hidden bg-[#0f172a]">
            <TabsSwitchFilter activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col">
                {filteredItems.map((item) => (
                    <ProfileItems key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}