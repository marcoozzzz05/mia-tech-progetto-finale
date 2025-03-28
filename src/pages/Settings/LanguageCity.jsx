import Button1 from "../../components/Buttons/Button1";

const LanguageCity = () => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Lingua e Area Geografica</h2> <br />
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Paese</label>
          <select name="Paese" className="w-full p-2 border rounded">
            <option value="Italia">Italia</option>
            <option value="Spagna">Spagna</option>
            <option value="Francia">Francia</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Lingua</label>
          <select name="Lingua" className="w-full p-2 border rounded">
            <option value="Italiano">Italiano</option>
            <option value="Inglese">Inglese</option>
            <option value="Spagnolo">Spagnolo</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Città</label>
          <select name="Citta" className="w-full p-2 border rounded">
            <option value="Milano">Milano</option>
            <option value="Roma">Roma</option>
            <option value="Venezia">Venezia</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-4">
        <Button1 className="bg-gray-700 text-white" text="Cancel" />
        <Button1 className="bg-purple-500 hover:bg-purple-600 text-white" text="Save" />
      </div>
    </div>
  );
};

export default LanguageCity;
