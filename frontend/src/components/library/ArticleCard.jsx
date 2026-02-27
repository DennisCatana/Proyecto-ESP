import { BookOpen, ArrowRight, Calendar } from 'lucide-react';

const ArticleCard = ({ title, description, author, date, readMoreUrl, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#007BFF]">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
          {author && (
            <>
              <span className="mx-2">|</span>
              <span>{author}</span>
            </>
          )}
        </div>
        
        <h3 className="text-[#0056b3] font-bold text-xl mb-3 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <a
          href={readMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#007BFF] font-semibold hover:text-[#0056b3] transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Leer artículo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
