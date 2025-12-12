import CustomUploadImage from "../components/CustomUploadImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClaimFormPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const [photos, setPhotos] = useState([]); // Renamed from images/files to match other forms approx

    const handleSubmit = async (e) => {
        e.preventDefault();
        const claimData = {
            name,
            email,
            phone,
            reason,
            photos
        };

        console.log("Submitting Claim:", claimData);

        // Mock API call
        // await submitClaim(claimData);

        // Navigate back to Claims dashboard or Gallery
        navigate("/dashboard/claims");
        // Or if you want to show a success message first, you could alert.
        // For now, simple redirect.
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="flex flex-col gap-8 p-8 w-full max-w-4xl mt-3 rounded-2xl">
                <div id="header" className="flex flex-col gap-2 mb-3">
                    <h1 className="text-4xl font-bold text-white">Claim Your Item</h1>
                    <p className="text-gray-400">Fill out the form below to claim your lost item.</p>
                </div>

            <div id="item-info-card" className="flex justify-between border border-slate-700/80 bg-slate-800/20 p-5 rounded-2xl h-50">
                <div className="flex flex-col gap-2 w-1/2 mx-2 ">
                    <h1>Item Name</h1>
                    <p><span>Category: </span> | <span>Found on: </span></p>
                    </div>
                    <div className="w-1/4">
                        <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="" className="w-full h-full object-cover rounded-3xl" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-left w-full border border-slate-700/50 bg-slate-800/20 rounded-2xl p-6 py-8 backdrop-blur-sm">
                    <h1 className="text-xl font-bold text-white">Your Contact Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 p-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-gray-300 text-sm font-medium">Full Name</label>
                            <input type="text" id="name" name="name" className="bg-gray-800 border border-slate-700/50 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-gray-300 text-sm font-medium">Email</label>
                            <input type="email" id="email" name="email" className="bg-gray-800 border border-slate-700/50 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="phone" className="text-gray-300 text-sm font-medium">Phone Number</label>
                            <input type="tel" id="phone" name="phone" className="bg-gray-800 border border-slate-700/50 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-white mt-4">Why is this item yours?</h1>
                    <div className="p-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="reason" className="text-gray-300 text-sm font-medium">Description</label>
                            <p className="text-gray-400 text-sm">Please provide specific details only you would know. Mention any unique marks, scratches, or contents.</p>
                            <textarea name="reason" id="reason" cols="20" rows="5" required className="w-full resize-none bg-gray-800 border border-slate-700/50 rounded-2xl p-4 my-2 placeholder:text-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter details here..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-6 p-2">
                        <label htmlFor="images" className="text-gray-300 text-sm font-medium">Upload Proof (Optional)</label>
                        <p className="text-gray-400 text-sm">Upload a photo of you with the item, a receipt, or any other supporting evidence.</p>
                        <CustomUploadImage photos={photos} setPhotos={setPhotos} />
                    </div>


                    <div className="flex gap-4 flex-row mx-2 my-2 justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="bg-transparent text-gray-400 hover:text-white px-6 py-2 transition-colors">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all transform hover:scale-[1.02]">Submit Claim</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
