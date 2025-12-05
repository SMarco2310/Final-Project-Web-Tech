import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function CustomUploadImage() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (files.length + selectedFiles.length > 5) {
            alert("You can only upload up to 5 images.");
            return;
        }
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full">
            <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-600 border-dashed rounded-3xl cursor-pointer bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="p-3 bg-gray-800 rounded-lg mb-3">
                        <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">
                        Drag & drop files here or <span className="text-blue-500 font-medium">browse</span>
                    </p>
                </div>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>

            {files.length > 0 && (
                <div className="grid grid-cols-5 gap-4 mt-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                className="w-full h-20 object-cover rounded-xl border border-gray-700"
                            />
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
