import CustomUploadImage from "../components/CustomUploadImage";
import { useState } from "react";
export default function ClaimFormPage() {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const [images, setImages] = useState([]);

    return (
        <div className="flex items-center justify-center">
        <div className="flex flex-col gap-8 p-8 w-fit mt-3  rounded-2xl">
            <div id="header" className="flex flex-col gap-2 mb-3">
                <h1 className="text-4xl font-bold">Claim Your Item</h1>
                <p className="text-gray-400">Fill out the form below to claim your lost item.</p>
            </div>

            <div id="item-info-card" className="flex justify-between border border-slate-700/80 p-5 rounded-2xl h-50">
                <div className="flex flex-col gap-2 w-1/2 mx-2 ">
                    <h1>Item Name</h1>
                    <p><span>Category: </span> | <span>Found on: </span></p>
                </div>
                <div className="w-1/4">
                    <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" className="w-full h-full object-cover rounded-3xl" />
                </div>
            </div>
            <form className="flex flex-col gap-4 justify-left w-full border border-slate-700/50 rounded-2xl p-5 py-5">
                <h1 className="text-xl font-bold ">Your Contact Details</h1>
                <div className="grid grid-cols-2 w-full gap-4 p-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" className="bg-gray-800 border border-slate-700/50 rounded-xl p-2 " 
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-800 border border-slate-700/50 rounded-xl p-2" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="bg-gray-800 border border-slate-700/50 rounded-xl p-2" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} />
                </div>
                </div>

                <h1 className="text-xl font-bold">Why is this item yours?</h1>
                <div className="p-2">
                <div className="flex flex-col gap-2">
                <label htmlFor="reason">Description</label>
                <p className="text-gray-400">Please provide specific details only you would know. Mention any unique marks, scratches, or contents.</p>
                <textarea name="reason" id="reason" cols="20" rows="5" required  className="w-full resize-none bg-gray-800 border border-slate-700/50 rounded-2xl p-2 my-4 placeholder:font-bold" placeholder="Please provide specific details only you would know. Mention any unique marks, scratches, or contents."
                value={reason}
                onChange={(e) => setReason(e.target.value)}></textarea>
                </div>
</div>
                <div className="flex flex-col gap-4 mb-6">
                    <label htmlFor="images" >Upload Proof(Optional)</label>
                    <p className="text-gray-400">Upload a photo of you with the item, a receipt, or any other supporting evidence.</p>
                    <CustomUploadImage/> {/*files={files} setFiles={setFiles} />*/}
                </div>
                

                <div className="flex gap-4 flex-row mx-2 my-2 justify-end">
                <button className="bg-transparent border-none text-gray-400 hover:text-white px-6 py-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-2xl">Submit</button>
                </div>
            </form>
        </div>
        </div>
    );
}