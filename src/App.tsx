import {
  Accessibility,
  CircleFadingArrowUpIcon,
  Inbox,
  Rabbit,
  Share2,
  ShieldCheck,
} from 'lucide-react'
import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import { Toolbar } from './components/Toolbar'

function App() {
  return (
    <Toolbar.Root>
      <Toolbar.Item>
        <Toolbar.Trigger icon={<Inbox className="size-5" />} tooltip="Inbox" />
        <Toolbar.Content>
          <p className="text-sm">Messages</p>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Accessibility className="size-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<CircleFadingArrowUpIcon className="size-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={
            <div
              className="flex -space-x-3"
              aria-label="Collaborators"
              role="img"
            >
              {[img1, img2, img3].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`avatar ${i + 1}`}
                  className="size-6 rounded-full border-2 border-white dark:border-neutral-800"
                />
              ))}
            </div>
          }
          tooltip="Jakub, Jonas and 1 more"
        />
        <Toolbar.Content>
          <ul className="flex flex-col gap-1 w-full">
            {img1 && (
              <li className="flex gap-2 items-center">
                <img
                  src={img1}
                  alt="Collaborator 1"
                  className="size-6 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm">Jakub</span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400">
                    Last edited: 10 minutes ago
                  </span>
                </div>
              </li>
            )}
            {img2 && (
              <li className="flex gap-2 items-center">
                <img
                  src={img2}
                  alt="Collaborator 2"
                  className="size-6 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm">Jonas</span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400">
                    Last edited: 1 hour ago
                  </span>
                </div>
              </li>
            )}
            {img3 && (
              <li className="flex gap-2 items-center">
                <img
                  src={img3}
                  alt="Collaborator 3"
                  className="size-6 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm">Kuba</span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400">
                    Last edited: 2 hours ago
                  </span>
                </div>
              </li>
            )}
            <button className="mt-2 text-sm text-gray-700 dark:text-neutral-200 shadow-subtle rounded-md text-[13px] w-full text-center bg-white px-2 py-1 dark:bg-neutral-800">
              View all →
            </button>
          </ul>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Rabbit className="size-5" />}
          tooltip="Improve performance"
        />
        <Toolbar.Content>
          <div className="flex flex-col gap-1 w-full">
            <ul className="flex flex-wrap gap-1">
              <li className="rounded-full text-[13px] flex border items-center gap-1 min-w-9 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-gray-100 dark:bg-neutral-700">
                All
              </li>
              <li className="rounded-full text-[13px] flex border items-center gap-1 min-w-9 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
                <span className="size-2 rounded-full block bg-yellow-500" />
                0.10
              </li>
              <li className="rounded-full text-[13px] flex border items-center gap-1 min-w-9 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
                <span className="size-2 rounded-full block bg-red-500" />
                0.24
              </li>
            </ul>
            <div className="shadow-subtle mt-2 rounded-md text-[13px] w-full bg-white  dark:bg-neutral-800 py-2">
              <ul className="flex flex-col">
                <li className="flex flex-col border-b border-gray-100 dark:border-neutral-700 pb-2 px-3">
                  <h4 className="text-sm">
                    <span className="size-2 rounded-full inline-block border-2 border-red-500 mr-1" />
                    Image compression
                  </h4>
                  <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                    Compress your images to reduce the size of your website.
                  </p>
                </li>
                <li className="flex flex-col pt-2 px-3">
                  <h4 className="text-sm">
                    <span className="size-2 rounded-full inline-block border-2 border-yellow-500 mr-1" />
                    Code splitting
                  </h4>
                  <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                    Split your code into smaller chunks.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger icon={<Share2 className="size-5" />} tooltip="Share" />
        <Toolbar.Content>
          <div className="flex flex-col items-center gap-1 text-center w-full">
            <div className="bg-white dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-700 p-2">
              <ShieldCheck className="size-5 text-gray-500 dark:text-neutral-400" />
            </div>
            <h2 className="text-base font-medium text-gray-700 dark:text-neutral-200 tracking-tight">
              Share Preview
            </h2>
            <p className="text-[13px] text-gray-500 dark:text-neutral-400">
              Choose who can comment on deployments for feature.
            </p>
            <input
              className="mt-2 dark:text-neutral-200 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 bg-white w-full h-8 px-2 rounded-lg text-[13px] focus:outline-none"
              placeholder="Add team members email"
            />
          </div>
        </Toolbar.Content>
      </Toolbar.Item>
    </Toolbar.Root>
  )
}

export default App
