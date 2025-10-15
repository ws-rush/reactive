export default function ShellIndex() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center space-y-8 max-w-md">
        {/* Empty State */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">
              No story selected
            </h2>
            <p className="text-sm text-gray-500">
              Choose a story from the sidebar to start reading
            </p>
          </div>
        </div>

        {/* Simple Instructions */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 text-left">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-orange-600">1</span>
              </div>
              <div className="text-sm text-gray-700">
                Browse stories in the sidebar
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-orange-600">2</span>
              </div>
              <div className="text-sm text-gray-700">
                Click on any story to read
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-orange-600">3</span>
              </div>
              <div className="text-sm text-gray-700">
                Join the discussion with comments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
