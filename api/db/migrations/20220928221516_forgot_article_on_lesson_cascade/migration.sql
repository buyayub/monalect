-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArticleOnLesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lessonId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    CONSTRAINT "ArticleOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ArticleOnLesson_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ArticleOnLesson" ("articleId", "id", "lessonId") SELECT "articleId", "id", "lessonId" FROM "ArticleOnLesson";
DROP TABLE "ArticleOnLesson";
ALTER TABLE "new_ArticleOnLesson" RENAME TO "ArticleOnLesson";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
