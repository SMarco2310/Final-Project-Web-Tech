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
        <div className="w-auto h-auto my-10 mx-20 border-2 border-slate-700/50 rounded-xl overflow-hidden">
            <TabsSwitchFilter activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                {filteredItems.map((item) => (
                    <ProfileItems key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}