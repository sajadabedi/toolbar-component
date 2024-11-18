import { Accessibility, Inbox, Moon, Sun, Users } from 'lucide-react'
import { Toolbar } from './components/toolbar/Toolbar'
import { useTheme } from './hooks/use-theme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="h-screen w-screen bg-gray-50/50 dark:bg-gray-900">
      <Toolbar.Root>
        <Toolbar.Action>
          <Toolbar.Trigger
            icon={<Inbox className="w-5 h-5" />}
            tooltip="Inbox"
          />
          <Toolbar.Content>
            <p className="text-lg">Messages</p>
          </Toolbar.Content>
        </Toolbar.Action>

        <Toolbar.Action>
          <Toolbar.Trigger
            icon={<Accessibility className="w-5 h-5" />}
            tooltip="Accessibility"
          />
          <Toolbar.Content>
            <p className="text-lg">Settings</p>
          </Toolbar.Content>
        </Toolbar.Action>

        <Toolbar.Action>
          <Toolbar.Trigger
            icon={
              <div className="relative">
                <div className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-gray-950" />
                <div className="absolute -right-3 -top-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-950" />
                <div className="absolute -right-5 -top-1 w-6 h-6 rounded-full bg-purple-500 border-2 border-white dark:border-gray-950" />
                <Users className="w-5 h-5" />
              </div>
            }
            tooltip="Team"
          />
          <Toolbar.Content>
            <p className="text-lg">Collaborators</p>
          </Toolbar.Content>
        </Toolbar.Action>

        <Toolbar.Action>
          <Toolbar.Trigger
            icon={
              theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )
            }
            tooltip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          />
          <Toolbar.Content>
            <p className="text-lg">Appearance</p>
          </Toolbar.Content>
        </Toolbar.Action>
      </Toolbar.Root>
    </div>
  )
}

export default App
