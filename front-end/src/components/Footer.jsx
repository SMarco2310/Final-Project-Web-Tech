export default function Footer() {
  return (
    <footer className=" w-screen flex p-6 text-gray-400 text-xs px-4 h-20 mt-10 items-center flex-row justify-between bg-[#0E1A2B] border-t border-s-stone-900 relative">
      <p className="w-fit">
        &copy; 2025 Lost & Found Inc. All rights reserved.
      </p>
      <p className="flex justify-between w-fit gap-6 mr-5 ">
        <a href="/about">About Us</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact Support</a>
      </p>
    </footer>
  );
}
