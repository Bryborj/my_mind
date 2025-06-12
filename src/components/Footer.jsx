// Footer minimalista con tus datos y redes
import Link from "next/link";
import info from "@/dev_info.json";
const creatorInfo = info.creator;

const name = creatorInfo.name || "Z_SH";
const githubUrl = creatorInfo.github || "https://github.com/";
const twitterUrl = creatorInfo.twitter || "https://twitter.com/";
const linkedinUrl = creatorInfo.linkedIn || "https://linkedin.com/";
const facebookUrl = creatorInfo.facebook || "https://facebook.com/";

export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 px-4 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
      <div className="mb-2">
        Desarrollado por <span className="font-semibold text-blue-700 dark:text-blue-300">{name}</span>
      </div>
      <div className="flex justify-center gap-4 mb-2">
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</Link>
        <Link href={twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Twitter</Link>
        <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</Link>
        <Link href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Facebook</Link>
      </div>
      <div>
        <span className="text-xs">© {new Date().getFullYear()} Z_SH. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
