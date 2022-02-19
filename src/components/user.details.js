import { UserContext } from "./users";

export default function UserDetails() {
  return (
    <>
      <section class="container mx-auto p-6 font-mono">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">gender</th>
                  <th class="px-4 py-3">age</th>
                  <th class="px-4 py-3">ID-name</th>
                  <th class="px-4 py-3">street no</th>
                  <th class="px-4 py-3">state</th>
                  <th class="px-4 py-3">timezone</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="text-gray-700">
                  <UserContext.Consumer>
                    {(value) => (
                      <>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.gender}
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.dob.age}
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.id.name}
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.location.street.number}
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.location.state}
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {value?.location.timezone.offset}
                        </td>
                      </>
                    )}
                  </UserContext.Consumer>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
