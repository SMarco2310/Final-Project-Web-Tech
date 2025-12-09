export default function ProfileCard({ user }) {
    return (
        <div className="w-full h-auto p-8 flex flex-col text-center border border-slate-700/50 rounded-3xl bg-[#0f172a]">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOtobM1j3ECr0pN0ZWg8LNDdi7YBTXWO8infmDL937kAZZXI4rQ8Mg2JiZrKVYjL81ci5lGrHICuH7AIXNU1t7kqae8eM1CKPdRee_38kFEA0WuPK5QXgN2WCb7H4kUG_r2Episs7h0D98YdIkSW1Z6wzZlPPGgSPIqSd5sS4SVBoPoG0dq-ngpzHBAf3PLciKAIREqR4pMXCCEIzFmNdEpgHVN9EGMhyRyqTBj4Sa8uYhXfK5JH_u49IFeR-0Q6Q6HZFu6vl5eAk" alt="" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
            <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <span className="text-slate-400 text-sm">{user.location}</span>
                <span className="text-slate-400 text-sm">Member since {user.memberSince}</span>
            </div>
            <button className="w-full py-3 mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">Send Message</button>

            <div className="flex flex-col gap-4">
                <div className="w-full p-5 text-left border border-slate-700/50 rounded-2xl bg-[#1e293b]/50">
                    <span className="block font-bold text-3xl mb-1">{user.items.filter((item) => item.status === "Reunited" || item.status === "Claimed").length}</span>
                    <p className="text-slate-400 text-sm">Items Reunited</p>
                </div>
                <div className="w-full p-5 text-left border border-slate-700/50 rounded-2xl bg-[#1e293b]/50">
                    <span className="block font-bold text-3xl mb-1">{user.items.length}</span>
                    <p className="text-slate-400 text-sm">Total Reports</p>
                </div>
            </div>
        </div>
    );
}