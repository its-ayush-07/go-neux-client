import { Avatar, AvatarImage } from "./ui/avatar";
import ArticleCard from "./ui/article-card";

interface AccountDashboardProps {
  user: {
    UserName: string;
    Email: string;
  };
  data: {
    ID: string;
    Title: string;
    CreatedAt: string;
    Image: string;
  }[];
}

export default function AccountDashboard({
  user,
  data,
}: AccountDashboardProps) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div>
          <Avatar className="h-60 w-60">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-3xl font-semibold text-slate-950">
            {user.UserName}
          </p>
          <p className="text-xl text-slate-500">{user.Email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-3xl font-semibold text-slate-950">Articles</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((article) => (
            <ArticleCard key={article.ID} data={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
