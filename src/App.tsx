import {
  Accessibility,
  CircleFadingArrowUpIcon,
  Inbox,
  Rabbit,
  Share2,
} from 'lucide-react'
import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import { Toolbar } from './components/toolbar/Toolbar'

function App() {
  return (
    <Toolbar.Root>
      <Toolbar.Action>
        <Toolbar.Trigger icon={<Inbox className="w-5 h-5" />} tooltip="Inbox" />
        <Toolbar.Content>
          <p className="text-sm">Messages</p>
        </Toolbar.Content>
      </Toolbar.Action>

      <Toolbar.Action>
        <Toolbar.Trigger
          icon={<Accessibility className="w-5 h-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Action>

      <Toolbar.Action>
        <Toolbar.Trigger
          icon={<CircleFadingArrowUpIcon className="w-5 h-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Action>

      <Toolbar.Action>
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
      </Toolbar.Action>
      <Toolbar.Action>
        <Toolbar.Trigger
          icon={<Rabbit className="w-5 h-5" />}
          tooltip="Rabbit"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Action>
      <Toolbar.Action>
        <Toolbar.Trigger
          icon={<Share2 className="w-5 h-5" />}
          tooltip="Share"
        />
        <Toolbar.Content>
          <p className="text-sm">Settings</p>
        </Toolbar.Content>
      </Toolbar.Action>
    </Toolbar.Root>
  )
}

export default App
