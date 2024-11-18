import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '../../lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip'

interface ToolbarContextValue {
  activeActionId: string | null
  setActiveActionId: (id: string | null) => void
  registerContent: (id: string, content: React.ReactNode) => void
}

const ToolbarContext = React.createContext<ToolbarContextValue | undefined>(
  undefined
)

function useToolbarContext() {
  const context = React.useContext(ToolbarContext)
  if (!context) {
    throw new Error('Toolbar components must be used within a Toolbar.Root')
  }
  return context
}

/**
 * Root component for the Toolbar.
 * Provides context and layout for toolbar actions and their content.
 *
 * @example
 * ```tsx
 * <Toolbar.Root>
 *   <Toolbar.Action>
 *     <Toolbar.Trigger icon={<Icon/>} tooltip="Action" />
 *     <Toolbar.Content>Content</Toolbar.Content>
 *   </Toolbar.Action>
 * </Toolbar.Root>
 * ```
 */
function Root({ children }: { children: React.ReactNode }) {
  const [activeActionId, setActiveActionId] = React.useState<string | null>(
    null
  )
  const [contents, setContents] = React.useState<Map<string, React.ReactNode>>(
    new Map()
  )

  const registerContent = React.useCallback(
    (id: string, content: React.ReactNode) => {
      setContents((prev) => new Map(prev).set(id, content))
    },
    []
  )

  const activeContent = activeActionId ? contents.get(activeActionId) : null

  return (
    <ToolbarContext.Provider
      value={{ activeActionId, setActiveActionId, registerContent }}
    >
      <TooltipProvider delayDuration={100}>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 rounded-xl shadow-elevated hover:shadow-rised transition-all duration-300">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="p-4 border-b border-gray-200/50 dark:border-gray-800/50"
                  >
                    {activeContent}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-1 p-2">{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </ToolbarContext.Provider>
  )
}

/**
 * Container for a toolbar action and its associated content.
 *
 * @example
 * ```tsx
 * <Toolbar.Action>
 *   <Toolbar.Trigger icon={<Icon/>} tooltip="Action" />
 *   <Toolbar.Content>Content shown when triggered</Toolbar.Content>
 * </Toolbar.Action>
 * ```
 */
function Action({ children }: { children: React.ReactNode }) {
  const actionId = React.useId()
  const { registerContent } = useToolbarContext()

  React.useEffect(() => {
    const content = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === Content
    )
    if (React.isValidElement(content)) {
      registerContent(actionId, content.props.children)
    }
  }, [actionId, children, registerContent])

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Trigger
  )

  return (
    <div className="relative" data-action-id={actionId}>
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger, { actionId } as any)}
    </div>
  )
}

interface TriggerProps {
  /** Icon component to display in the trigger button */
  icon: React.ReactNode
  /** Tooltip text shown on hover */
  tooltip: string
  /** @internal */
  actionId?: string
}

/**
 * Button that triggers the display of associated content.
 * Includes an icon and tooltip.
 *
 * @example
 * ```tsx
 * <Toolbar.Trigger
 *   icon={<Icon/>}
 *   tooltip="Helpful description"
 * />
 * ```
 */
function Trigger({ icon, tooltip, actionId }: TriggerProps) {
  const { activeActionId, setActiveActionId } = useToolbarContext()
  const isActive = actionId === activeActionId

  const handleClick = () => {
    if (actionId) {
      setActiveActionId(isActive ? null : actionId)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={cn(
            'relative p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700',
            isActive && 'bg-gray-100/80 dark:bg-gray-800/80'
          )}
        >
          <span className="sr-only">{tooltip}</span>
          <div className="w-5 h-5 text-gray-700 dark:text-gray-300">{icon}</div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

interface ContentProps {
  /** Content to display when the action is triggered */
  children: React.ReactNode
  /** @internal */
  actionId?: string
}

/**
 * Container for content shown when an action is triggered.
 * Content appears above the toolbar.
 * Note: This is a marker component - the content is rendered through the registration system.
 */
function Content(_: ContentProps) {
  return null
}

export const Toolbar = {
  Root,
  Action,
  Trigger,
  Content,
}
