"use client";

type ButtonProps = {
  text: string;
  mode: "light" | "dark";
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
};

export default function Button({ text, mode, onClick, type }: ButtonProps) {
  const buttonClass =
    mode === "light" ? "bg-white text-black" : "bg-black text-white";

  return (
    <button
      className={`${buttonClass} px-4 py-2 rounded-full text-sm font-medium`}
      onClick={() => onClick()}
      type={type}
    >
      {text}
    </button>
  );
}
