import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 py-4  bg-opacity-80 backdrop-blur-md shadow-md  dark:bg-opacity-80">
      <nav className="container flex items-center justify-between mx-auto px-4">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              blog
            </Link>
          </li>
          <li>
            <Link href="https://github.com/jefferypippitt" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              source code
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
