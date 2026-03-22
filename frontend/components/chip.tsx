type Props = {
  label: string;
  className?: string;
};

export default function Chip({ label, className = "" }: Props) {
  return (
    <div className={`bg-[#272321] inline border-2 border-[#2b2826] px-2 py-0.5 rounded-sm text-textsubcolor text-xs 2xl:text-sm ${className}`}>
      {label}
    </div>
  );
}