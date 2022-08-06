-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NotebookPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "words" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,
    "lessonId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "NotebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NotebookPage" ("content", "courseId", "id", "lessonId", "page", "userId", "words") SELECT "content", "courseId", "id", "lessonId", "page", "userId", "words" FROM "NotebookPage";
DROP TABLE "NotebookPage";
ALTER TABLE "new_NotebookPage" RENAME TO "NotebookPage";
CREATE TABLE "new_Textbook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "author" TEXT,
    "pages" INTEGER DEFAULT 0,
    "pageOffset" INTEGER,
    "isbn" TEXT,
    "uploaded" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Textbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Textbook_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Textbook" ("author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "uploaded", "url", "userId") SELECT "author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "uploaded", "url", "userId" FROM "Textbook";
DROP TABLE "Textbook";
ALTER TABLE "new_Textbook" RENAME TO "Textbook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
