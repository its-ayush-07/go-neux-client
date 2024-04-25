import ArticleCard from "./ui/article-card";

interface SearchResultsProps {
  term: string;
  data: {
    ID: string;
    Title: string;
    CreatedAt: string;
    Image: string;
  }[];
}

export default function SearchResults({ term, data }: SearchResultsProps) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-oswald text-4xl font-medium text-slate-950">
        Search results for &quot;{term}&quot;
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.ID} data={article} />
        ))}
      </div>
    </div>
  );
}
