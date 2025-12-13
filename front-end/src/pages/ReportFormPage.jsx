import FilterButton from "../components/FilterButton";
import CustomSelect from "../components/CustomSelect";
import CustomUploadImage from "../components/CustomUploadImage";
import { useState } from "react";
import { useItem } from "../hooks/useItem";
import { useDescriptionAi } from "../hooks/useDescriptionAi";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Wand2, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ReportFormPage() {
  const { createItem } = useItem();
  const { generateDescription, loading: aiLoading } = useDescriptionAi();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth hook

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Lost");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateDescription = async () => {
    if (photos.length === 0) {
      alert("Please upload a photo first to generate a description.");
      return;
    }

    const file = photos[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        const data = await generateDescription(base64String);

        if (data && data.data) {
          let aiResponse = data.data;
          if (typeof aiResponse === 'string') {
            const cleanText = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            try {
              aiResponse = JSON.parse(cleanText);
            } catch (e) {
              console.error("Failed to parse AI JSON", e);
              setDescription(cleanText);
              return;
            }
          }

          if (aiResponse.title) setName(aiResponse.title);
          if (aiResponse.description) setDescription(aiResponse.description);
        }
      } catch (error) {
        console.error("AI Generation failed:", error);
        alert("Failed to generate description. Please try again or fill manually.");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual image upload to Cloudinary here to get URLs
    // For now, in MVP, we might be relying on backend to handle base64 or expecting URLs from a pre-upload step (not implemented here)
    // Assuming backend might handle what we send or we need a real upload flow. 
    // Given context of "replace hardcoded data", we send what we have.

    const itemData = {
      name,
      category,
      description,
      location,
      status,
      date: new Date().toISOString().split('T')[0],
      images: photos,
      contact: { email, phone }
    };

    console.log("Submitting item:", itemData);

    try {
      await createItem(itemData);
      console.log("Item created successfully");
      navigate("/Gallery");
    } catch (error) {
      console.error("Failed to create item:", error);
      alert("Failed to create report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-xl max-w-md w-full">
          <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Login Required</h1>
          <p className="text-gray-400 mb-8">
            You must be logged in to report a lost or found item.
            Please sign in to your account or create a new one.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/Login" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all">
              Login
            </Link>
            <Link to="/Register" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 px-4">
      <form className="flex flex-col gap-6 w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">Report a Lost or Found Item</h1>

        <div className="w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <p className="mb-6 text-gray-300 text-lg">
            Are you reporting an item you lost or found?
          </p>
          <FilterButton text1={"Lost"} text2={"Found"} w="w-full" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>

        <div className="flex flex-col gap-4 w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <p className="text-xl md:text-2xl font-semibold text-white mb-2">Tell us about the item</p>

          <div>
            <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-300">Add Photos (up to 5)</label>
            <CustomUploadImage photos={photos} setPhotos={setPhotos} />
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Item Name</label>
            <input type="text" id="name" name="name" placeholder="e.g iPhone 14 Pro" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">Category</label>
            <CustomSelect
              label="Category"
              options={["electronics", "clothing", "documents", "others"]}
              value={category}
              onChange={setCategory}
              w="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={aiLoading || photos.length === 0}
                className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                {aiLoading ? "Generating..." : "Generate with AI"}
              </button>
            </div>
            <textarea
              id="description"
              name="description"
              placeholder="Describe colors, brands, distinguishing features..."
              maxLength={1000}
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-2">Where was the item lost or found?</h2>
          <div>
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-300">Location</label>
            <input type="text" id="location" name="location" placeholder="e.g University of Ashesi" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-2">How can we contact you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
              <input type="text" id="contactName" name="contactName" placeholder="e.g John Doe" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300"> Your Email Address</label>
              <input type="email" id="email" name="email" placeholder="e.g johndoe@gmail.com" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">Your Phone Number (Optional)</label>
              <input type="tel" id="phone" name="phone" placeholder="e.g +233 24 123 4567" pattern="[0-9]{10}" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <p className="text-sm text-gray-400">Your contact will only be shared if a potential match is found</p>
        </div>

        <div className="flex justify-end mt-2">
          <button
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            type="submit"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  );
}
