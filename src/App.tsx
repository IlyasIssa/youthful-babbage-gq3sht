import React, { useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  isSponsored: boolean;
}

const generateMockResults = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  // Simulate some results based on the query
  const baseResults = [
    {
      id: `organic-${query}-1`,
      title: `Best ${query} Solutions - Official Site`,
      url: `https://www.example.com/${query}-solutions`,
      displayUrl: `www.example.com/${query}-solutions`,
      snippet: `Find the top-rated ${query} solutions tailored for your needs. Explore features, pricing, and reviews.`,
      isSponsored: false,
    },
    {
      id: `sponsored-${query}-1`,
      title: `[Ad] Affordable ${query} Services - Limited Time Offer!`,
      url: `https://www.sponsored-example.com/offer-${query}`,
      displayUrl: `www.sponsored-example.com/offer`,
      snippet: `Get professional ${query} services at unbeatable prices. Click here for a special discount!`,
      isSponsored: true,
    },
    {
      id: `organic-${query}-2`,
      title: `${query} Explained: A Comprehensive Guide`,
      url: `https://www.knowledgebase.com/${query}-guide`,
      displayUrl: `www.knowledgebase.com/${query}`,
      snippet: `Understand everything about ${query} with our detailed guide. Learn the basics and advanced concepts.`,
      isSponsored: false,
    },
    {
      id: `sponsored-${query}-2`,
      title: `[Ad] Top ${query} Provider | Rated #1`,
      url: `https://www.top-provider-example.net/${query}`,
      displayUrl: `www.top-provider-example.net/${query}`,
      snippet: `Choose the leading provider for ${query}. High quality service guaranteed. Get a free quote today!`,
      isSponsored: true,
    },
     {
      id: `organic-${query}-3`,
      title: `Compare ${query} Options - 2024 Reviews`,
      url: `https://www.reviewsite.org/compare-${query}`,
      displayUrl: `www.reviewsite.org/compare`,
      snippet: `See side-by-side comparisons of popular ${query} options. Make an informed decision.`,
      isSponsored: false,
    },
  ];

  // Shuffle results slightly for variety
  return baseResults.sort(() => Math.random() - 0.5);
};

const SponsoredSearchSimulator: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clickedSponsoredLink, setClickedSponsoredLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    setIsLoading(true);
    setResults([]);
    setClickedSponsoredLink(null);
    setError(null);

    // Simulate network delay & search process
    setTimeout(() => {
      try {
        if (!query.trim()) {
          throw new Error('Please enter a search query.');
        }
        // In a real scenario, this is where the problematic interaction would happen.
        // Here, we just generate mock data.
        console.log(`Simulating search for: "${query}"`);
        const mockData = generateMockResults(query);
        setResults(mockData);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred during the simulated search.');
        setIsLoading(false);
      }
    }, 1500); // Simulate 1.5 seconds delay
  };

  const handleSponsoredClick = (url: string) => {
    console.log(`Simulating click on sponsored link: ${url}`);
    setClickedSponsoredLink(url);
    // IMPORTANT: This simulation does NOT actually navigate or interact with external websites.
    // It only updates the state to show which mock sponsored link was "clicked".
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Sponsored Search Simulator
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          This tool simulates searching Google and identifying sponsored results. It does <span className="font-semibold">not</span> actually perform searches or click on real ads.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query (e.g., 'best laptops')"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className={`px-6 py-2 rounded-md text-white font-semibold transition-colors duration-200 ${
              isLoading || !query.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </div>
            ) : (
              'Simulate Search'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {clickedSponsoredLink && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Action Simulated:</strong>
            <span className="block sm:inline ml-2">"Clicked" on sponsored link: {clickedSponsoredLink}</span>
          </div>
        )}

        <div className="space-y-6">
          {results.length > 0 && !isLoading && (
             <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Simulated Results for "{query}"</h2>
          )}
          {results.map((result) => (
            <div key={result.id} className={`p-4 rounded-lg border ${result.isSponsored ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
              {result.isSponsored && (
                 <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-1">
                   Sponsored
                 </span>
              )}
               <h3 className="text-lg font-medium text-blue-700 hover:underline cursor-pointer" onClick={() => result.isSponsored && handleSponsoredClick(result.url)}>
                {result.title.replace('[Ad] ', '')}
              </h3>
               <p className="text-sm text-green-700">{result.displayUrl}</p>
              <p className="text-gray-600 mt-1">{result.snippet}</p>
              {result.isSponsored && (
                <button
                  onClick={() => handleSponsoredClick(result.url)}
                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors duration-200"
                >
                  Simulate Click on Ad
                </button>
              )}
            </div>
          ))}
           {isLoading && results.length === 0 && (
             <div className="text-center py-10">
               <p className="text-gray-500">Loading simulated results...</p>
             </div>
           )}
          {!isLoading && results.length === 0 && query && !error && (
            <div className="text-center py-10">
               <p className="text-gray-500">No simulated results generated for "{query}". Try a different query.</p>
             </div>
          )}
           {!isLoading && results.length === 0 && !query && !error && (
            <div className="text-center py-10 flex flex-col items-center">
               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4"></div>
               <p className="text-gray-500">Enter a query and click "Simulate Search" to begin.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SponsoredSearchSimulator;