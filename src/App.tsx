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
import { Toolbar } from './components/Toolbar'
import AccessibilityContent from './contents/AccessibilityContent'
import CollaboratorsContent from './contents/CollaboratorsContent'
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
          icon={<Accessibility className="size-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <AccessibilityContent />
        </Toolbar.Content>
      </Toolbar.Item>

      <Toolbar.Item>
        <Toolbar.Trigger
          icon={<CircleFadingArrowUpIcon className="size-5" />}
          tooltip="Accessibility"
        />
        <Toolbar.Content>
          <AccessibilityContent />
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
