// import { useRef, useState } from "react";
// import { Upload, X, Camera, Check } from "lucide-react";
// import { useImage } from "../hooks/useImage";

// export default function CustomUploadImage({ photos, setPhotos }) {
//     const [showCamera, setShowCamera] = useState(false);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const { uploadImage } = useImage();

//     // Fallback if used without props
//     const fileList = photos || [];

//     const handleFileChange = async (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     if ((photos?.length || 0) + selectedFiles.length > 5) {
//         alert("You can only upload up to 5 images.");
//         return;
//     }

//     try {
//         for (const file of selectedFiles) {
//             const imageUrl = await uploadImage(file);

//             setPhotos(prev => [...prev, imageUrl]);
//         }
//     } catch (err) {
//         alert("Failed to upload image");
//     }
// };

//     const removeFile = (index) => {
//         if (setPhotos) {
//             setPhotos((prev) => prev.filter((_, i) => i !== index));
//         }
//     };

//     const startCamera = async () => {
//         setShowCamera(true);
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (err) {
//             console.error("Error accessing camera:", err);
//             setShowCamera(false);
//             alert("Could not access camera. Please allow permissions or upload a file.");
//         }
//     };

//     const stopCamera = () => {
//         const stream = videoRef.current?.srcObject;
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setShowCamera(false);
//     };

//     const capturePhoto = () => {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         if (video && canvas) {
//             const context = canvas.getContext('2d');
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);

//             canvas.toBlob((blob) => {
//                 const file = new File([blob], `photo_${Date.now()}.jpg`, { type: "image/jpeg" });
//                 if (setPhotos) {
//                     setPhotos((prev) => [...prev, file]);
//                 }
//                 stopCamera();
//             }, 'image/jpeg');
//         }
//     };

import { useRef, useState } from "react";
import { Upload, X, Camera } from "lucide-react";
import { useImage } from "../hooks/useImage";

export default function CustomUploadImage({ photos = [], setPhotos }) {
    const [showCamera, setShowCamera] = useState(false);
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const { uploadImage } = useImage();

    // ---------------- FILE UPLOAD ----------------
    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (photos.length + selectedFiles.length > 5) {
            alert("You can only upload up to 5 images.");
            return;
        }

        for (const file of selectedFiles) {
            try {
                setLoadingIndexes(prev => [...prev, photos.length]);

                const imageUrl = await uploadImage(file);
                setPhotos(prev => [...prev, imageUrl]);
            } catch (err) {
                alert("Image upload failed");
            } finally {
                setLoadingIndexes(prev => prev.slice(0, -1));
            }
        }
    };

    // ---------------- REMOVE IMAGE ----------------
    const removeFile = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    // ---------------- CAMERA ----------------
    const startCamera = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            videoRef.current.srcObject = stream;
        } catch {
            setShowCamera(false);
            alert("Camera access denied");
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        stream?.getTracks().forEach(track => track.stop());
        setShowCamera(false);
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        canvas.toBlob(async (blob) => {
            try {
                const file = new File(
                    [blob],
                    `photo_${Date.now()}.jpg`,
                    { type: "image/jpeg" }
                );

                const imageUrl = await uploadImage(file);
                setPhotos(prev => [...prev, imageUrl]);
            } catch {
                alert("Photo upload failed");
            } finally {
                stopCamera();
            }
        }, "image/jpeg");
    };
    return (
        <div className="w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Browse Label */}
                <label
                    htmlFor="file-upload"
                    className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-gray-600 border-dashed rounded-3xl cursor-pointer bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400">
                            Upload from <span className="text-blue-500 font-medium">Device</span>
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

                {/* Camera Button */}
                <button
                    type="button"
                    onClick={startCamera}
                    className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-gray-600 border-dashed rounded-3xl cursor-pointer bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors"
                >
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">
                        Take <span className="text-blue-500 font-medium">Photo</span>
                    </p>
                </button>
            </div>

            {/* Camera Modal */}
            {showCamera && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-lg border border-slate-700 relative shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Take a Photo</h3>

                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-6 border border-slate-700">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex gap-4 justify-center">
                            <button
                                type="button"
                                onClick={stopCamera}
                                className="px-6 py-3 rounded-xl bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={capturePhoto}
                                className="px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                            >
                                <Camera size={20} />
                                Snap Photo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Section */}
            {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={url}
                                alt={`uploaded ${index}`}
                                className="w-full h-32 object-cover rounded-xl border border-gray-700"
                            />
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
