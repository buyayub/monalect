/*
  Warnings:

  - Added the required column `courseId` to the `TestOnLesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestOnLesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mark" REAL DEFAULT 0,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correct" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    CONSTRAINT "TestOnLesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestOnLesson_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestOnLesson" ("correct", "count", "date", "id", "lessonId", "mark", "testId") SELECT "correct", "count", "date", "id", "lessonId", "mark", "testId" FROM "TestOnLesson";
DROP TABLE "TestOnLesson";
ALTER TABLE "new_TestOnLesson" RENAME TO "TestOnLesson";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
