import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/searchbar/LocalSearchBar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const allUsers = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-8 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          placeholder="Search for users..."
          additionalClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          additionalClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses=""
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {allUsers.users.length > 0 ? (
          allUsers.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p className="mb-2">No Users Found</p>
            <Link href="/sign-up" className="font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={allUsers.isNext}
        />
      </div>
    </>
  );
};

export default Page;
