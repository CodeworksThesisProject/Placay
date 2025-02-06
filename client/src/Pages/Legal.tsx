const Legal = () => {
  return (
      <div className="mx-auto p-6 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Legal Information</h1>
        <p className="text-gray-600 mb-4">
          At Placay, we are committed to providing a transparent and compliant service. Below you can 
          find important legal details about our platform and services.
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Terms of Service</h2>
        <p className="text-gray-600 mt-2">
          By using Placay, you agree to our terms and conditions. These terms outline your rights 
          and responsibilities while using our platform.
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">Privacy Policy</h2>
        <p className="text-gray-600 mt-2">
          Your privacy is important to us. Placay ensures that your data is handled securely and 
          responsibly.
        </p>
      </div>
  );
};

export default Legal;