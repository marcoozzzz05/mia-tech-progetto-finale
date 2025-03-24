import EventCard from "../EventCard/EventCard";

const SearchResults = ({ results }) => {
  return (
    <div className="container mx-auto px-6 mt-4">
      <h2 className="text-2xl font-bold text-[#2e2e2e] mb-6">Risultati della ricerca</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((event, index) => (
          <EventCard key={index} title={event} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;