-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('email', 'sms', 'push', 'in_app', 'chat', 'whatsapp');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPreference" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicChannelPreference" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "channel" "Channel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicChannelPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- CreateIndex
CREATE INDEX "User_organizationId_role_idx" ON "User"("organizationId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "User_organizationId_email_key" ON "User"("organizationId", "email");

-- CreateIndex
CREATE INDEX "NotificationGroup_organizationId_idx" ON "NotificationGroup"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationGroup_organizationId_name_key" ON "NotificationGroup"("organizationId", "name");

-- CreateIndex
CREATE INDEX "NotificationTopic_groupId_idx" ON "NotificationTopic"("groupId");

-- CreateIndex
CREATE INDEX "NotificationTopic_organizationId_idx" ON "NotificationTopic"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTopic_groupId_name_key" ON "NotificationTopic"("groupId", "name");

-- CreateIndex
CREATE INDEX "GroupPreference_userId_idx" ON "GroupPreference"("userId");

-- CreateIndex
CREATE INDEX "GroupPreference_groupId_idx" ON "GroupPreference"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupPreference_userId_groupId_key" ON "GroupPreference"("userId", "groupId");

-- CreateIndex
CREATE INDEX "TopicChannelPreference_userId_idx" ON "TopicChannelPreference"("userId");

-- CreateIndex
CREATE INDEX "TopicChannelPreference_topicId_idx" ON "TopicChannelPreference"("topicId");

-- CreateIndex
CREATE INDEX "TopicChannelPreference_userId_topicId_idx" ON "TopicChannelPreference"("userId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "TopicChannelPreference_userId_topicId_channel_key" ON "TopicChannelPreference"("userId", "topicId", "channel");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationGroup" ADD CONSTRAINT "NotificationGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationTopic" ADD CONSTRAINT "NotificationTopic_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationTopic" ADD CONSTRAINT "NotificationTopic_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "NotificationGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPreference" ADD CONSTRAINT "GroupPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPreference" ADD CONSTRAINT "GroupPreference_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "NotificationGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicChannelPreference" ADD CONSTRAINT "TopicChannelPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicChannelPreference" ADD CONSTRAINT "TopicChannelPreference_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "NotificationTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
