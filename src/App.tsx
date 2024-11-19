import {
  Accessibility,
  CircleFadingArrowUpIcon,
  Inbox,
  Rabbit,
  Share2,
  ShieldCheck,
  ShieldIcon,
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
          <p className="text-sm">Collaborators</p>
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Rabbit className="size-5" />}
          tooltip="Rabbit"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
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
