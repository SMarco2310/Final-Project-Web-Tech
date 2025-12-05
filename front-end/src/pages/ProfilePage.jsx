import ProfileGallery from "../components/ProfileGallery";

export default function ProfilePage() {
    const items = [
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
    ];
    return (
        <div className="w-full h-auto flex justify-center ">
            <div className="w-1/3 h-2/3 px-10 py-5 mx-20 my-auto flex flex-col text-center border-2 border-slate-700/50 rounded-xl">
                <img src="" alt="" />
                <p className="flex flex-col gap-2">
                    <h1>Username</h1>
                    <span>Member Since: 2022-01-01</span>
                    <span>Location: Room 101</span>
                </p>
                <button className="w-full h-10 px-5 py-2 mt-5 bg-blue-500/50 rounded-full border-blue-500/50">send Message</button>
                <div className="w-full h-2/3 mt-5 bg-slate-700/50 border-slate-700/50">Hello</div>
                <div className="w-full h-2/3 mt-5 bg-slate-700/50 border-slate-700/50">Hello</div>
            </div>
            <ProfileGallery items={items} />
        </div>
    );
}
