import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Track 404 errors in analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 - Page Not Found',
        page_location: window.location.href,
        page_path: location.pathname,
        non_interaction: true
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Return to Homepage
          </Link>
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Looking for something specific? Try our <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact page</Link> or <Link to="/sitemap" className="text-blue-600 dark:text-blue-400 hover:underline">sitemap</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
