import CustomUploadImage from "../components/CustomUploadImage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItem } from "../hooks/useItem";
import { useClaim } from "../hooks/useClaim";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
export default function ClaimFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, token } = useAuth();
    const { getItemById } = useItem();
    const { createClaim } = useClaim();

    const [itemDetails, setItemDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const [photos, setPhotos] = useState([]); // Renamed from images/files to match other forms approx

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getItemById(id);
                if (data.ok) {
                    setItemDetails(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching item:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchItem();
    }, [id, getItemById]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            itemId: id,
            userId: user.id,
            reason: reason,
            contact_phone: phone,
            proof_images: photos
        };

        try {
            // using the hook function
            await createClaim(payload);
            navigate("/dashboard/claims");
        } catch (error) {
            console.error("Claim Error:", error);
            alert(error.message || "Failed to submit claim");
        }
    };
    if (loading) return <p className="text-white p-10">Loading item...</p>;
    if (error || !itemDetails) return <Navigate to="/NotFound" replace />;

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="flex flex-col gap-8 p-8 w-full max-w-4xl mt-3 rounded-2xl">
                <div id="header" className="flex flex-col gap-2 mb-3">
                    <h1 className="text-4xl font-bold text-white">Claim Your Item</h1>
                    <p className="text-gray-400">Fill out the form below to claim your lost item.</p>
                </div>

                <div id="item-info-card" className="flex justify-between border border-slate-700/80 bg-slate-800/20 p-5 rounded-2xl h-50">
                    <div className="flex flex-col gap-2 w-1/2 mx-2 text-xl my-7 font-bold">
                        <h1>Item Name : <strong>{itemDetails.title}</strong></h1>
                        <p className="flex flex-col gap-2 "><span>Category: <strong>{itemDetails.category}</strong></span> <span>Found on: <strong>{itemDetails.createdAt.split("T")[0].replaceAll("-", " / ")}</strong></span></p>
                    </div>
                    <div className="w-1/4">
                        <img src={itemDetails.images[0].url} alt="" className="w-full h-full object-cover rounded-3xl" />
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
