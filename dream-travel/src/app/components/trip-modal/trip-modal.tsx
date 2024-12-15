export default function TripModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Create a trip</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-600">
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Italy"
            />
          </div>

          <div>
            <label
              htmlFor="introduction"
              className="block text-sm font-medium text-gray-700"
            >
              Introduction (max. 240 characters)
            </label>
            <input
              type="text"
              id="introduction"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="From Rome to Venice..."
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Discover the wonders of the Roman empire..."
              rows={4}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label
              htmlFor="itinerary"
              className="block text-sm font-medium text-gray-700"
            >
              Day by day itinerary
            </label>
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2">
                <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <option>Day</option>
                  <option>1</option>
                  <option>2</option>
                </select>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Location"
                />
              </div>
              <textarea
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Description"
                rows={2}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
