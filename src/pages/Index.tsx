import FulfillmentCalculator from "@/components/FulfillmentCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Калькулятор фулфилмента 🚀
          </h1>
          <p className="text-gray-600">
            Рассчитайте точную стоимость хранения и обработки товаров
          </p>
        </div>
        <FulfillmentCalculator />
      </div>
    </div>
  );
};

export default Index;
