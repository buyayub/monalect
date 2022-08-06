/*
  Warnings:

  - Added the required column `words` to the `NotebookPage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Textbook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "author" TEXT,
    "pages" INTEGER,
    "pageOffset" INTEGER,
    "isbn" TEXT,
    "uploaded" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Textbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Textbook_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Textbook" ("author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "url", "userId") SELECT "author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "url", "userId" FROM "Textbook";
DROP TABLE "Textbook";
ALTER TABLE "new_Textbook" RENAME TO "Textbook";
CREATE TABLE "new_NotebookPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "words" INTEGER NOT NULL,
    "content" TEXT,
    "lessonId" INTEGER NOT NULL,
    CONSTRAINT "NotebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NotebookPage" ("content", "id", "lessonId", "page", "userId") SELECT "content", "id", "lessonId", "page", "userId" FROM "NotebookPage";
DROP TABLE "NotebookPage";
ALTER TABLE "new_NotebookPage" RENAME TO "NotebookPage";
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mark" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("createdAt", "id", "title", "userId") SELECT "createdAt", "id", "title", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
