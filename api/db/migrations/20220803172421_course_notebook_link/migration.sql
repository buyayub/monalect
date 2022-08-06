/*
  Warnings:

  - Added the required column `courseId` to the `NotebookPage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NotebookPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "words" INTEGER NOT NULL,
    "content" TEXT,
    "lessonId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "NotebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NotebookPage" ("content", "id", "lessonId", "page", "userId", "words") SELECT "content", "id", "lessonId", "page", "userId", "words" FROM "NotebookPage";
DROP TABLE "NotebookPage";
ALTER TABLE "new_NotebookPage" RENAME TO "NotebookPage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
