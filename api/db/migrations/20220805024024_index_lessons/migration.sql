/*
  Warnings:

  - You are about to drop the column `metric` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `variable` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `allLessons` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "index" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "allLessons" BOOLEAN NOT NULL,
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("courseId", "goal", "id", "userId") SELECT "courseId", "goal", "id", "userId" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mark" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("createdAt", "id", "mark", "title", "userId") SELECT "createdAt", "id", "mark", "title", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
