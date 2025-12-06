import ProfileGallery from "../components/ProfileGallery";
import ProfileCard from "../components/ProfileCard";
export default function ProfilePage() {
    const user = {
        name: "John Doe",
        location: "Room 101",
        memberSince: "2022-01-01",
        items: [
            {
                id: 1,
                name: "Laptop",
                description: "A black laptop with a broken screen",
                image: "laptop_image.jpg",
                location: "Room 101",
                date: "2022-01-01",
                status: "Lost",
            },
            {
                id: 2,
            name: "Phone",
            description: "A white phone with a cracked screen",
                image: "phone_image.jpg",
                location: "Room 102",
            date: "2022-01-02",
            status: "Found",
            },
            {
                id: 3,
            name: "Wallet",
            description: "A black wallet with a missing card",
                image: "purse_picture.png",
                location: "Room 103",
            date: "2022-01-03",
                status: "Lost",
            },
            {
                id: 4,
            name: "Wallet",
            description: "A black wallet with a missing card",
                image: "purse_picture.png",
                location: "Room 103",
            date: "2022-01-03",
            status: "Lost",
            },
            {
                id: 5,
                name: "Phone",
                description: "A white phone with a cracked screen",
                image: "phone_image.jpg",
                location: "Room 102",
                date: "2022-01-02",
            status: "Claimed",
            },
        {
            id: 6,
            name: "Wallet",
            description: "A black wallet with a missing card",
            image: "purse_picture.png",
            location: "Room 103",
            date: "2022-01-03",
            status: "Lost",
        },
        {
            id: 7,
            name: "Wallet",
            description: "A black wallet with a missing card",
            image: "purse_picture.png",
            location: "Room 103",
            date: "2022-01-03",
            status: "Lost",
        },
    ]};
    return (
        <div className="w-full min-h-screen bg-[#0f172a] text-white flex justify-center p-10">
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2">
                    <ProfileCard user={user} />
                </div>
                <div className="w-full md:w-3/4">
                    <ProfileGallery items={user.items} />
                </div>
            </div>
        </div>
    );
}
