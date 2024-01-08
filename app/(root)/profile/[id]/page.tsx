import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDateToMonthYear } from "@/lib/utils";
import ProfileAttribute from "@/components/shared/ProfileAttribute";
import { CalendarDays, Link2, MapPin } from "lucide-react";
import Stats from "@/components/shared/Stats";
import TopPostsTab from "@/components/shared/TopPostsTab";
import AnswersTab from "@/components/shared/AnswersTab";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo.user.picture}
            alt="Profile Picture"
            width={144}
            height={144}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.personalWebsite && (
                <ProfileAttribute
                  icon={
                    <Link2 height={20} width={20} className="text-slate-500" />
                  }
                  url={userInfo.user.personalWebsite}
                  title={userInfo.user.personalWebsite}
                />
              )}

              {userInfo.user.location && (
                <ProfileAttribute
                  icon={
                    <MapPin height={20} width={20} className="text-slate-500" />
                  }
                  title={userInfo.user.location}
                />
              )}

              {
                <ProfileAttribute
                  icon={
                    <CalendarDays
                      height={20}
                      width={20}
                      className="text-slate-500"
                    />
                  }
                  title={`Joined ${formatDateToMonthYear(
                    userInfo.user.joinedAt
                  )}`}
                />
              }
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Top Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <TopPostsTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
