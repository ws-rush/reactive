import { useState } from 'react'
import { NavLink } from 'react-router'

export default function TestActionErrorRoute() {
  const [shouldError, setShouldError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShouldError(true)
  }

  if (shouldError) {
    throw new Error('Validation failed: Invalid data submitted (400)')
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Section */}
        <div className="bg-teal-100 border border-teal-200 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-teal-900 mb-3">
            Action Error Test Route
          </h1>
          <p className="text-sm text-teal-700">
            Test form submission errors that can occur during user actions
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start space-x-4 mb-6">
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
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Form Submission Error Test
              </h2>
              <p className="text-sm text-gray-600">
                Submit this form to trigger a validation error and test the
                ErrorBoundary component.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="test-field"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Test Field
              </label>
              <input
                type="text"
                id={'test-field'}
                name="test-field"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-gray-50 transition-colors"
                placeholder="Enter anything to trigger action error"
              />
              <p className="text-xs text-gray-500 mt-2">
                This form will intentionally throw an error when submitted to
                test error handling.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Submit Form (Will Trigger Error)
              </button>
              <span className="text-sm text-gray-500">
                ⚠️ This will cause an error to demonstrate the ErrorBoundary
              </span>
            </div>
          </form>
        </div>

        {/* Error Information */}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-yellow-900">
              What Happens When You Submit?
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">1</span>
              </div>
              <div className="text-sm text-yellow-800">
                The form submission triggers a{' '}
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">
                  Validation failed
                </code>{' '}
                error
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">2</span>
              </div>
              <div className="text-sm text-yellow-800">
                The ErrorBoundary component catches the error and displays a
                user-friendly message
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-yellow-600">3</span>
              </div>
              <div className="text-sm text-yellow-800">
                Users can navigate away, report the issue, or try to recover
                from the error
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
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
            <h3 className="text-base font-semibold text-gray-900">
              Error Code
            </h3>
          </div>
          <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto text-gray-800 font-mono">
            {`// Error thrown in form submission handler
if (shouldError) {
  throw new Error('Validation failed: Invalid data submitted (400)');
}

// In a real app, this might be:
try {
  await submitForm(formData);
} catch (error) {
  if (error.response?.status === 400) {
    throw new Error('Validation failed: ' + error.message);
  }
  throw error;
}`}
          </pre>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 pt-4">
          <NavLink
            to="/test-error"
            className={({ isPending }) =>
              `px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors ${
                isPending ? 'opacity-60' : ''
              }`
            }
          >
            ← Back to Error Tests
          </NavLink>
          <NavLink
            to="/"
            className={({ isPending }) =>
              `px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors ${
                isPending ? 'opacity-60' : ''
              }`
            }
          >
            Home
          </NavLink>
        </div>
      </div>
    </div>
  )
}
