import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Калькулятор
          </h1>
          <p className="text-gray-600">
            Современный калькулятор с интуитивным интерфейсом
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
