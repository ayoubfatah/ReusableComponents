"use client";
import { ChevronRight, File, Folder } from "lucide-react";
import { useState } from "react";

type FileSystemNode = {
  name: string;
  folder?: FileSystemNode[];
};

export default function FileExplorer() {
  const fileSystemData: FileSystemNode = {
    name: "Home",
    folder: [
      {
        name: "Program Files",
        folder: [
          {
            name: "Google",
            folder: [{ name: "Chrome", folder: [{ name: "chrome.exe" }] }],
          },
          {
            name: "Adobe",
            folder: [
              {
                name: "Photoshop",
                folder: [{ name: "photoshop.exe" }, { name: "plugins" }],
              },
            ],
          },
          {
            name: "Microsoft",
            folder: [
              {
                name: "Office",
                folder: [{ name: "Word.exe" }, { name: "Excel.exe" }],
              },
              { name: "Edge", folder: [{ name: "msedge.exe" }] },
            ],
          },
        ],
      },
      {
        name: "Users",
        folder: [
          {
            name: "Admin",
            folder: [
              {
                name: "Desktop",
                folder: [{ name: "My Computer" }, { name: "Recycle Bin" }],
              },
              {
                name: "Documents",
                folder: [{ name: "Resume.docx" }, { name: "Project" }],
              },
              {
                name: "Downloads",
                folder: [{ name: "Setup.exe" }, { name: "Movies" }],
              },
              {
                name: "Pictures",
                folder: [
                  {
                    name: "Wallpapers",
                    folder: [{ name: "sunset.jpg" }, { name: "mountain.png" }],
                  },
                  {
                    name: "Screenshots",
                    folder: [{ name: "screenshot1.png" }],
                  },
                ],
              },
            ],
          },
          {
            name: "Guest",
            folder: [{ name: "Desktop" }, { name: "Downloads" }],
          },
        ],
      },
      {
        name: "Windows",
        folder: [
          {
            name: "System32",
            folder: [{ name: "cmd.exe" }, { name: "drivers" }],
          },
          {
            name: "Fonts",
            folder: [{ name: "Arial.ttf" }, { name: "Roboto.ttf" }],
          },
          {
            name: "Temp",
            folder: [{ name: "log.txt" }],
          },
        ],
      },
      {
        name: "Games",
        folder: [
          {
            name: "Online",
            folder: [
              {
                name: "Riot Games",
                folder: [
                  { name: "League of Legends", folder: [{ name: "lol.exe" }] },
                  { name: "Valorant", folder: [{ name: "valorant.exe" }] },
                ],
              },
            ],
          },
          {
            name: "Offline",
            folder: [
              {
                name: "From Software",
                folder: [
                  { name: "Elden Ring", folder: [{ name: "eldenRing.exe" }] },
                  { name: "Dark Souls", folder: [{ name: "Darksouls.exe" }] },
                ],
              },
            ],
          },
          {
            name: "Steam",
            folder: [
              { name: "Counter-Strike", folder: [{ name: "csgo.exe" }] },
              { name: "Dota 2", folder: [{ name: "dota2.exe" }] },
              { name: "COD III", folder: [] },
            ],
          },
        ],
      },
      {
        name: "Courses",
        folder: [
          {
            name: "AWS",
            folder: [
              {
                name: "Section 1",
                folder: [{ name: "Aws Fundamentals.js" }],
              },
            ],
          },
          {
            name: "JavaScript",
            folder: [
              {
                name: "Section 1",
                folder: [{ name: "Fundamentals.js" }],
              },
            ],
          },
          { name: "React.js", folder: [{ name: "project" }] },
          { name: "Next.js", folder: [] },
        ],
      },
    ],
  };

  return <FileTreeNode node={fileSystemData} />;
}
const FileTreeNode = function ({ node }: { node: FileSystemNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = !!node.folder;
  const isEmpty = isFolder && node?.folder?.length === 0;

  return (
    <ul
      className={`${isFolder ? "pl-8" : "p-0"} ${
        isEmpty ? "pl-15" : ""
      } relative`}
    >
      <div className=""></div>
      <li className="py-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${isFolder ? "" : "ml-7"} flex gap-2 items-center`}
        >
          {isFolder && !isEmpty && (
            <ChevronRight
              size={20}
              className={`${
                isExpanded ? "rotate-90" : ""
              } transition-all duration-300`}
            />
          )}
          {isFolder ? <Folder fill="#FCFAC6" /> : <File />} {node.name}
        </button>
        {isFolder &&
          node?.folder?.map((childNode) => (
            <div
              key={childNode.name}
              className={`grid ${
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              } transition-all duration-300`}
            >
              <div
                className={`min-h-0 overflow-hidden flex gap-1 ${
                  isExpanded ? "border-l border-dashed border-black/5" : ""
                }`}
              >
                <FileTreeNode node={childNode} />
              </div>
            </div>
          ))}
      </li>
    </ul>
  );
};
