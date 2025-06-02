 
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

function trimText(text = "", maxLength = 35) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default function ArticleCard({ article, id }) {
  return (
    <Link   href={`/blog/${article.slug}`} className="bg-slate-100 group w-full shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[350px]">
      <div className="imagebox  h-48 overflow-hidden">
        <img
          src={
            article?.thumbnailUrl ||
            "https://res.cloudinary.com/dgp04dpun/image/upload/v1746926867/aktu%20brand/g0n6c31i0nzmizdelz7f.jpg"
          }
          alt={article.title}
          className="h-48 w-full group-hover:scale-105 transition-transform duration-300 object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl h-14 font-semibold group-hover:text-highlight transition-all ease-in-out duration-300 text-gray-800">
          {trimText(article.title)}
        </h2>

        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
          {article.tags?.slice(0, 3).join(", ")}
        </p>

        <div className="lowerdiv flex items-center justify-between">
          <div className="left">
            <span className="text-xs text-gray-400">
              Author: <strong>{article.author}</strong>
            </span>
            <span className="text-xs block text-gray-400">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="right">
            <span className="text-md flex items-center bg-highlight text-white rounded-2xl p-2">
              Read <MdArrowForwardIos className="ml-1 group-hover:mx-2 transition-all ease-in-out duration-300" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
