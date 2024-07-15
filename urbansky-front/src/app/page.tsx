import ItemsList from "@/components/ItemList";

const HomePage: React.FC = () => {
  return (
    <main>
      <div className="relative md:flex h-screen overflow-hidden no-scollbar">
        <div className="flex flex-col w-40 gap-y-4 p-4">
          <h1 className="text-xl uppercase font-bold">Urban Sky </h1>
          <h2 className="text-lg">Inventory Management System</h2>
        </div>
        <div>
          <div className="w-full p-4 text-2xl font-bold h-screen overflow-y-auto no-scrollbar">
            <ItemsList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
