/*
  Warnings:

  - You are about to drop the column `mark` on the `Test` table. All the data in the column will be lost.
  - Added the required column `correct` to the `TestOnLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correct` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestOnLesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mark" REAL NOT NULL,
    "correct" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    CONSTRAINT "TestOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestOnLesson_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestOnLesson" ("count", "id", "lessonId", "mark", "testId") SELECT "count", "id", "lessonId", "mark", "testId" FROM "TestOnLesson";
DROP TABLE "TestOnLesson";
ALTER TABLE "new_TestOnLesson" RENAME TO "TestOnLesson";
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "correct" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quiz" BOOLEAN NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Test_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Test" ("courseId", "id", "quiz", "userId") SELECT "courseId", "id", "quiz", "userId" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
