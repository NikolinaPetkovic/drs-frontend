interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
}

export default function Button({ children, type = "button", variant = "primary" }: ButtonProps) {
  const base = "w-full py-2 rounded-md font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-gray-900"
      : "border border-gray-300 hover:bg-gray-50 text-sm";

  return (
    <button type={type} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
