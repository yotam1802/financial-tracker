interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  const checkmarkSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
    </svg>
  );

  return (
    <div className="card w-72 h-60 lg:h-72 lg:w-56 shadow-xl border border-gray-300 bg-base-200">
      <div className="card-body">
        <h2 className="card-title">{checkmarkSVG}</h2>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
