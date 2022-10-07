-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TextbookSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "start" INTEGER,
    "end" INTEGER,
    "textbookId" INTEGER NOT NULL,
    CONSTRAINT "TextbookSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TextbookSection_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "Textbook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TextbookSection" ("end", "id", "start", "textbookId", "title", "userId") SELECT "end", "id", "start", "textbookId", "title", "userId" FROM "TextbookSection";
DROP TABLE "TextbookSection";
ALTER TABLE "new_TextbookSection" RENAME TO "TextbookSection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
