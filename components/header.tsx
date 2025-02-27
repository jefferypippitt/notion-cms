import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container max-w-3xl flex items-center justify-between mx-auto px-4 h-10">
        <Link 
          href="/" 
          className="font-medium text-sm text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Notion Blog CMS
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
