import FilterButton from "../components/FilterButton";
import CustomSelect from "../components/CustomSelect";
import CustomUploadImage from "../components/CustomUploadImage";
import { useState, useEffect } from "react";
import { useItem } from "../hooks/useItem";
import { useDescriptionAi } from "../hooks/useDescriptionAi";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Loader2, Wand2, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ReportFormPage() {
  const { createItem, getItemById, updateItem } = useItem();
  const { generateDescription, loading: aiLoading } = useDescriptionAi();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth(); // Get user and token from auth hook

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Lost");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          const data = await getItemById(id);
          // Adjust 'data.data' based on your API response structure (e.g. data or data.data)
          const item = data.data || data;

          setTitle(item.title || "");
          setCategory(item.category || "");
          setDescription(item.description || "");
          setLocation(item.location || "");
          setStatus(item.status || "Lost");
          setPhotos(item.images || []);
          // Populate contact info if available
          if (item.user) {
            setEmail(item.user.email || "");
            setPhone(item.user.phone || "");
            setContactName(item.user.name || "");
          }
        } catch (error) {
          console.error("Failed to fetch item for edit:", error);
          alert("Could not load item details.");
        }
      }
    };
    fetchItem();
  }, [id, getItemById]);

  // Pre-fill contact info from logged-in user if creating new report
  useEffect(() => {
    if (!id && user) {
      setContactName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [id, user]);

  const handleGenerateDescription = async () => {
    if (photos.length === 0) {
      alert("Please upload a photo first to generate a description.");
      return;
    }

    // photos state now contains URLs (strings) because CustomUploadImage uploads them immediately.
    // So we just take the first URL.
    const imageUrl = photos[0];

    try {
      const data = await generateDescription(imageUrl);

      if (data && data.data) {
        let aiResponse = data.data;

        // If it's a string, try to clean and parse it
        if (typeof aiResponse === 'string') {
          // Remove Markdown code blocks if present (case insensitive)
          const cleanText = aiResponse.replace(/```(json)?/gi, '').replace(/```/g, '').trim();

          // Try to find the JSON object within the text (in case there's conversational text)
          const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
          const jsonString = jsonMatch ? jsonMatch[0] : cleanText;

          try {
            aiResponse = JSON.parse(jsonString);
          } catch (e) {
            console.error("Failed to parse AI JSON", e);
            // If parsing fails, just use the raw text as description
            setDescription(cleanText);
            return;
          }
        }

        // Now aiResponse should be an object
        if (aiResponse.title) setTitle(aiResponse.title);
        if (aiResponse.description) setDescription(aiResponse.description);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate description. Please try again or fill manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images first
      const uploadedImageUrls = await Promise.all(photos.map(async (photo) => {
        // If it's already a string, it's an existing URL
        if (typeof photo === 'string') return photo;

        // If it's a File object, upload it
        if (photo instanceof File || photo instanceof Blob) {
          const formData = new FormData();
          formData.append('image', photo);

          const response = await fetch('https://findmystuff-f92h.onrender.com/api/image/upload', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }, body: formData
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to upload image');
          return data.imageUrl;
        }
        return null;
      }));

      // Filter out any failed uploads (nulls)
      const validImageUrls = uploadedImageUrls.filter(url => url !== null);

      const itemData = {
        user_id: user.id,
        location,
        category,
        title,
        description,
        status,
        images: validImageUrls,
      };

      console.log("Submitting item:", itemData);

      if (id) {
        await updateItem(id, itemData);
        console.log("Item updated successfully");
      } else {
        await createItem(itemData);
        console.log("Item created successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to create/update item:", error);
      alert(error.message || "Failed to submit report. Please try again.");
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
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">{id ? "Edit Item Report" : "Report a Lost or Found Item"}</h1>

        <div className="w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <p className="mb-6 text-gray-300 text-lg">
            Are you reporting an item you lost or found?
          </p>
          <FilterButton text1={"Lost"} text2={"Found"} val1="Lost" val2="Found" w="w-full" value={status} selected={status} onChange={(val) => setStatus(val)} />
        </div>

        <div className="flex flex-col gap-4 w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <p className="text-xl md:text-2xl font-semibold text-white mb-2">Tell us about the item</p>

          <div>
            <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-300">Add Photos (up to 5)</label>
            <CustomUploadImage photos={photos} setPhotos={setPhotos} />
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-300">Item Name</label>
            <input type="text" id="title" name="title" placeholder="e.g iPhone 14 Pro" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">Category</label>
            <CustomSelect
              label="Category"
              options={["electronics", "clothing", "documents", "books", "accessories", "others"]}
              value={category}
              onChange={setCategory}
              w="w-full"
              className="z-100"
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
              rows={10}
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
          <div className="w-full h-48 bg-slate-700/50 rounded-xl overflow-hidden mt-2 border border-gray-700">
            <iframe
              title="Location Preview"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(location || "Ashesi University")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full border border-gray-700 rounded-2xl p-6 bg-[#1e293b]/30 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-2">How can we contact you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
              <input type="text" id="contactName" name="contactName" placeholder="e.g John Doe" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300"> Your Email Address</label>
              <input type="email" id="email" name="email" placeholder="e.g johndoe@gmail.com" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">Your Phone Number (Optional)</label>
              <input type="tel" id="phone" name="phone" placeholder="e.g 0241234567" pattern="[0-9]{10}" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
            {isSubmitting ? "Submitting..." : (id ? "Update Report" : "Submit Report")}
          </button>
        </div>
      </form>
    </div>
  );
}
