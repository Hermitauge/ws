import { type ClassValue, clsx } from "clsx"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CheckActive = ({ href }: { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return isActive;
}