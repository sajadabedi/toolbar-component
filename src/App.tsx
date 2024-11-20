import { Contrast, Cookie, Inbox, Rabbit, Share2 } from 'lucide-react'
import { Toolbar } from './components/Toolbar/Toolbar'
import AccessibilityContent from './contents/AccessibilityContent'
import CollaboratorsContent from './contents/CollaboratorsContent'
import CookieContent from './contents/CookieContent'
import { DummyData } from './contents/DummyData'
import InboxContent from './contents/InboxContent'
import PerformanceContent from './contents/PerformanceContent'
import ShareContent from './contents/ShareContent'

function App() {
  return (
    <Toolbar.Root>
      <Toolbar.Item>
        <Toolbar.Trigger icon={<Inbox className="size-5" />} tooltip="Inbox" />
        <Toolbar.Content>
          <InboxContent />
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Contrast className="size-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <AccessibilityContent />
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Cookie className="size-5" />}
          tooltip="Cookie"
        />
        <Toolbar.Content>
          <CookieContent />
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
              {DummyData.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={`avatar ${i + 1}`}
                  className="size-6 rounded-full border-2 border-white dark:border-neutral-800"
                />
              ))}
            </div>
          }
          tooltip="Jakub, Jonas and 1 more"
        />
        <Toolbar.Content>
          <CollaboratorsContent />
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<Rabbit className="size-5" />}
          tooltip="Improve performance"
        />
        <Toolbar.Content>
          <PerformanceContent />
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger icon={<Share2 className="size-5" />} tooltip="Share" />
        <Toolbar.Content>
          <ShareContent />
        </Toolbar.Content>
      </Toolbar.Item>
    </Toolbar.Root>
  )
}

export default App
