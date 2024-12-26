interface CommentProps {
  comment: {
    id: number;
    author: string;
    content: string;
    timestamp: string;
  };
}

export const PostComment = ({ comment }: CommentProps) => {
  return (
    <div className="bg-[#fcfcfc] p-3 rounded-lg">
      <div className="flex items-center space-x-2 mb-1">
        <span className="font-medium text-[#240a46]">{comment.author}</span>
        <span className="text-sm text-[#5b1852]">{comment.timestamp}</span>
      </div>
      <p className="text-[#240a46]">{comment.content}</p>
    </div>
  );
};