interface Props {
  color?: string;
  border?: string;
  children: React.ReactNode;
  shadow?: boolean;
  className?: string;
}

export const Card = ({
  color = "bg-[#ffffff]",
  border,
  children,
  shadow = true,
  className = "",
}: Props) => {
  return (
    <div
      className={`flex flex-col ${color}  ${
        shadow ? "shadow" : ""
      } rounded-[${border}] ${className}`}
    >
      {children}
    </div>
  );
};
