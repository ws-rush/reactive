import { useState } from 'react'
import { NavLink } from 'react-router'

export default function TestErrorRoute() {
  const [shouldError, setShouldError] = useState(false)
  const [shouldNetworkError, setShouldNetworkError] = useState(false)

  if (shouldError) {
    throw new Error(
      'This is a test error to demonstrate the ErrorBoundary component',
    )
  }

  if (shouldNetworkError) {
    throw new TypeError('Failed to fetch: Network error simulation')
  }

  const triggerReactRouterError = () => {
    // Navigate to a route that will trigger a loader error
    window.location.href = '/test/loader-error'
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Section */}
        <div className="bg-red-100 border border-red-200 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-red-900 mb-3">
            ErrorBoundary Test Page
          </h1>
          <p className="text-sm text-red-700">
            Test different types of errors to see how the ErrorBoundary
            component handles them
          </p>
        </div>

        {/* Test Cases Container */}
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200 shadow-sm">
          {/* Application Error Test */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>External Link</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Application Error Test
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  This will throw a JavaScript error to test the ErrorBoundary
                  component.
                </p>
                <button
                  type="button"
                  onClick={() => setShouldError(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Trigger Application Error
                </button>
              </div>
            </div>
          </div>

          {/* Network Error Test */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>External Link</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Network Error Test
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Test handling of network-related errors.
                </p>
                <button
                  type="button"
                  onClick={() => setShouldNetworkError(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Trigger Network Error
                </button>
              </div>
            </div>
          </div>

          {/* Data Loading Error Test */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-indigo-600"
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
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Data Loading Error Test (SPA Mode)
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Navigate to a route that simulates a data loading error in SPA
                  mode.
                </p>
                <button
                  type="button"
                  onClick={triggerReactRouterError}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Navigate to Data Error Route
                </button>
              </div>
            </div>
          </div>

          {/* Form Submission Error Test */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>External Link</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Form Submission Error Test (SPA Mode)
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Navigate to a route with a form that triggers a submission
                  error.
                </p>
                <NavLink
                  to="/test/action-error"
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  Go to Form Error Test
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>External Link</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-yellow-900">
              Error Code Examples
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                SPA Mode - Data Loading Error:
              </h4>
              <pre className="text-sm bg-yellow-100 p-3 rounded-lg overflow-x-auto text-yellow-900 font-mono">
                {`useEffect(() => {
  throw new Error('Failed to load data: Record Not Found');
}, []);`}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                SSR Mode - React Router:
              </h4>
              <pre className="text-sm bg-yellow-100 p-3 rounded-lg overflow-x-auto text-yellow-900 font-mono">
                {`import { data } from "react-router";

export async function loader({ params }) {
  let record = await fakeDb.getRecord(params.id);
  if (!record) {
    throw data("Record Not Found", { status: 404 });
  }
  return record;
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
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
            <h3 className="text-base font-semibold text-blue-900">
              Testing Instructions
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">1</span>
              </div>
              <div className="text-sm text-blue-800">
                Click any of the buttons above to trigger different types of
                errors
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">2</span>
              </div>
              <div className="text-sm text-blue-800">
                Each error type will be caught by the ErrorBoundary component
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">3</span>
              </div>
              <div className="text-sm text-blue-800">
                Test the action buttons: Go Back, Go to Home, Logout
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">4</span>
              </div>
              <div className="text-sm text-blue-800">
                Try the &quot;Report this issue&quot; functionality
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">5</span>
              </div>
              <div className="text-sm text-blue-800">
                In development mode, you can expand the technical details to see
                stack traces
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 pt-4">
          <NavLink
            to="/"
            className={({ isPending }) =>
              `px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors ${
                isPending ? 'opacity-60' : ''
              }`
            }
          >
            ← Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  )
}
