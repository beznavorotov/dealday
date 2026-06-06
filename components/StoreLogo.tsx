interface StoreLogoProps {
  name: string;
  logoUrl?: string | null;
  size?: "sm" | "md";
}

export default function StoreLogo({
  name,
  logoUrl,
  size = "md",
}: StoreLogoProps) {
  const dimension = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        className={`${dimension} shrink-0 rounded-full bg-zinc-50 object-contain ring-1 ring-zinc-200/80`}
      />
    );
  }

  return (
    <span
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-zinc-100 ${textSize} font-semibold text-zinc-600 ring-1 ring-zinc-200/80`}
      aria-hidden
    >
      {initial}
    </span>
  );
}
