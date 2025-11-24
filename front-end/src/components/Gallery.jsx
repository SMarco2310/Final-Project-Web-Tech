import ItemCard from "../components/ItemCard.jsx";

export default function Gallery({ items }) {
  return (
    <div className=" w-screen flex flex-wrap m-3 mx-2 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
