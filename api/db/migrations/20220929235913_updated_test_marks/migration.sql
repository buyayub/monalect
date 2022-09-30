/*
  Warnings:

  - You are about to alter the column `mark` on the `TestOnLesson` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `mark` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `TestOnLesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mark" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quiz" BOOLEAN NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Test_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Test" ("courseId", "id", "quiz", "userId") SELECT "courseId", "id", "quiz", "userId" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
CREATE TABLE "new_TestOnLesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mark" REAL NOT NULL,
    "count" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    CONSTRAINT "TestOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestOnLesson_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestOnLesson" ("id", "lessonId", "mark", "testId") SELECT "id", "lessonId", "mark", "testId" FROM "TestOnLesson";
DROP TABLE "TestOnLesson";
ALTER TABLE "new_TestOnLesson" RENAME TO "TestOnLesson";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
