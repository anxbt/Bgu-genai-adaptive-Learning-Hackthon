interface QuestionCardProps {
  concept: string;
  question: string;
}

const QuestionCard = ({ concept, question }: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-card border border-border p-8 shadow-sm">
      <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-button bg-accent text-accent-foreground">
        {concept}
      </div>
      <p className="text-xl font-medium text-foreground leading-relaxed">
        {question}
      </p>
    </div>
  );
};

export default QuestionCard;
