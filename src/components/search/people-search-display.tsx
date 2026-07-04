import { Await, Link } from "@tanstack/react-router";
import { Route } from "~/routes/$lang/_app/search";

export default function PeopleSearchDisplay() {
  const { people } = Route.useLoaderData();
  if (!people) return <div></div>;
  return (
    <Await promise={people} fallback={<div>Loading...</div>}>
      {(people) => (
        <div className="mt-2">
          <div className="text-2xl text-neutral-50 mb-2">
            Explore movies/shows of actors:{" "}
          </div>
          <div className="mb-4">
            <ul className="flex flex-wrap  text-xl ">
              {people.results.map((person) => (
                <li className="px-2  text-neutral-50" key={person.id}>
                  <Link
                    to={`/$lang/search`}
                    params={{ lang: Route.useParams().lang }}
                    search={{ person: person.id + "" }}
                    preload={false}
                  >
                    {person.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Await>
  );
}
