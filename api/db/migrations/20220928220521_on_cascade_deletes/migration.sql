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
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Goal_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("allLessons", "completed", "courseId", "goal", "id", "lessonId", "type", "userId") SELECT "allLessons", "completed", "courseId", "goal", "id", "lessonId", "type", "userId" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "index" INTEGER,
    CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("courseId", "id", "index", "title", "userId") SELECT "courseId", "id", "index", "title", "userId" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "author" TEXT,
    "pages" INTEGER,
    "pageOffset" INTEGER,
    "doi" TEXT,
    "uploaded" BOOLEAN NOT NULL,
    "url" TEXT,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Article_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("author", "courseId", "doi", "id", "pageOffset", "pages", "title", "uploaded", "url", "userId") SELECT "author", "courseId", "doi", "id", "pageOffset", "pages", "title", "uploaded", "url", "userId" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "description" TEXT NOT NULL DEFAULT 'No description',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mark" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("active", "createdAt", "description", "id", "mark", "title", "userId") SELECT "active", "createdAt", "description", "id", "mark", "title", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("answer", "correct", "id", "questionId", "userId") SELECT "answer", "correct", "id", "questionId", "userId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_SectionOnLesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lessonId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    CONSTRAINT "SectionOnLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SectionOnLesson_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "TextbookSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SectionOnLesson" ("id", "lessonId", "sectionId") SELECT "id", "lessonId", "sectionId" FROM "SectionOnLesson";
DROP TABLE "SectionOnLesson";
ALTER TABLE "new_SectionOnLesson" RENAME TO "SectionOnLesson";
CREATE TABLE "new_NotebookPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "words" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,
    "lessonId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "NotebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NotebookPage_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NotebookPage" ("content", "courseId", "id", "lessonId", "page", "userId", "words") SELECT "content", "courseId", "id", "lessonId", "page", "userId", "words" FROM "NotebookPage";
DROP TABLE "NotebookPage";
ALTER TABLE "new_NotebookPage" RENAME TO "NotebookPage";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "multiple" BOOLEAN NOT NULL,
    "choices" INTEGER,
    "lessonId" INTEGER,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("choices", "courseId", "id", "lessonId", "multiple", "question", "userId") SELECT "choices", "courseId", "id", "lessonId", "multiple", "question", "userId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
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
    CONSTRAINT "Textbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Textbook_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Textbook" ("author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "uploaded", "url", "userId") SELECT "author", "courseId", "id", "isbn", "pageOffset", "pages", "title", "uploaded", "url", "userId" FROM "Textbook";
DROP TABLE "Textbook";
ALTER TABLE "new_Textbook" RENAME TO "Textbook";
CREATE TABLE "new_TextbookSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "textbookId" INTEGER NOT NULL,
    CONSTRAINT "TextbookSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TextbookSection_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "Textbook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TextbookSection" ("end", "id", "start", "textbookId", "title", "userId") SELECT "end", "id", "start", "textbookId", "title", "userId" FROM "TextbookSection";
DROP TABLE "TextbookSection";
ALTER TABLE "new_TextbookSection" RENAME TO "TextbookSection";
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "mark" INTEGER NOT NULL,
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
