import { Accessibility, Inbox, Moon, Sun } from 'lucide-react'
import avatar1 from './assets/1.png'
import avatar2 from './assets/2.png'
import avatar3 from './assets/3.png'
import { Toolbar } from './components/toolbar/Toolbar'

function App() {
  return (
    <div className="h-screen w-screen">
      <Toolbar.Root>
        <Toolbar.Action>
          <Toolbar.Trigger
            icon={<Inbox className="w-5 h-5" />}
            tooltip="Inbox"
          />
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
            icon={
              <div className="flex -space-x-2">
                <img
                  src={avatar1}
                  alt="avatar person 1"
                  className="size-6 rounded-full border-2 border-white dark:border-neutral-800"
                />
                <img
                  src={avatar2}
                  alt="avatar person 2"
                  className="size-6 rounded-full border-2 border-white dark:border-neutral-800"
                />
                <img
                  src={avatar3}
                  alt="avatar person 3"
                  className="size-6 rounded-full border-2 border-white dark:border-neutral-800"
                />
              </div>
            }
            tooltip="Jakub, Jonas and 1 more"
          />
          <Toolbar.Content>
            <p className="text-sm">Collaborators</p>
          </Toolbar.Content>
        </Toolbar.Action>
      </Toolbar.Root>
    </div>
  )
}

export default App
