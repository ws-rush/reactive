import { useEffect } from 'react'
import { NavLink } from 'react-router'

export default function TestLoaderErrorRoute() {
  useEffect(() => {
    // Simulate a data loading error in SPA mode
    throw new Error('Failed to load data: Record Not Found (404)')
  }, [])

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-4">
        <h1 className="text-xl font-bold text-indigo-900 mb-2">
          Loader Error Test Route
        </h1>
        <p className="text-sm text-indigo-700">
          This route simulates a data loading error that occurs during component
          initialization
        </p>
      </div>

      {/* Error Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>External Link</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Data Loading Error Simulation
            </h2>
            <p className="text-sm text-gray-600">
              This page demonstrates what happens when an error occurs during
              data loading in SPA mode.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
              <svg
                className="w-3 h-3 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>External Link</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-yellow-900">
              Error Details
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">!</span>
              </div>
              <div className="text-xs text-yellow-800">
                <strong>Error Type:</strong> Data Loading Error (404)
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">!</span>
              </div>
              <div className="text-xs text-yellow-800">
                <strong>Trigger:</strong> Component useEffect hook
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">!</span>
              </div>
              <div className="text-xs text-yellow-800">
                <strong>Result:</strong> ErrorBoundary catches and displays
                user-friendly error
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>External Link</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            SPA Mode vs SSR Mode
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-1">
              SPA Mode (Current Implementation):
            </h4>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-800 font-mono">
              {`useEffect(() => {
  // Simulate data loading error
  throw new Error('Failed to load data: Record Not Found (404)');
}, []);`}
            </pre>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-1">
              SSR Mode (React Router Loader):
            </h4>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto text-gray-800 font-mono">
              {`export async function loader({ params }) {
  try {
    let record = await fakeDb.getRecord(params.id);
    if (!record) {
      throw new Response('Record Not Found', { status: 404 });
    }
    return record;
  } catch (error) {
    throw new Response('Data loading failed', { status: 500 });
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>External Link</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-blue-900">
            Error Handling Best Practices
          </h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">✓</span>
            </div>
            <div className="text-xs text-blue-800">
              Always wrap data loading in try-catch blocks to handle errors
              gracefully
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">✓</span>
            </div>
            <div className="text-xs text-blue-800">
              Provide meaningful error messages to help users understand what
              went wrong
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">✓</span>
            </div>
            <div className="text-xs text-blue-800">
              Include recovery options like retry buttons or alternative
              navigation
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mt-6">
        <NavLink
          to="/test/error"
          className={({ isPending }) =>
            `px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ${
              isPending ? 'opacity-60' : ''
            }`
          }
        >
          ← Back to Error Tests
        </NavLink>
        <NavLink
          to="/test/action-error"
          className={({ isPending }) =>
            `px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ${
              isPending ? 'opacity-60' : ''
            }`
          }
        >
          Form Error Test
        </NavLink>
        <NavLink
          to="/"
          className={({ isPending }) =>
            `px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ${
              isPending ? 'opacity-60' : ''
            }`
          }
        >
          Home
        </NavLink>
      </div>
    </div>
  )
}
