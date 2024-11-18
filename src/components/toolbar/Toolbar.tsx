import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  motionDirection: number
  focusedActionId: string | null
  setFocusedActionId: (id: string | null) => void
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
 */
function Root({ children }: { children: React.ReactNode }) {
  const [activeActionId, setActiveActionId] = React.useState<string | null>(
    null
  )
  const [focusedActionId, setFocusedActionId] = React.useState<string | null>(
    null
  )
  const [direction, setDirection] = React.useState(0)
  const [contents, setContents] = React.useState<Map<string, React.ReactNode>>(
    new Map()
  )
  const [actionIds, setActionIds] = React.useState<string[]>([])
  const shouldReduceMotion = useReducedMotion()

  const registerContent = React.useCallback(
    (id: string, content: React.ReactNode) => {
      setContents((prev) => new Map(prev).set(id, content))
      setActionIds((prev) => [...new Set([...prev, id])])
    },
    []
  )

  const handleActionChange = React.useCallback(
    (newId: string | null) => {
      if (!newId) {
        setActiveActionId(null)
        return
      }

      const oldIndex = actionIds.indexOf(activeActionId || '')
      const newIndex = actionIds.indexOf(newId)
      setDirection(oldIndex !== -1 && newIndex !== -1 ? newIndex - oldIndex : 0)
      setActiveActionId(newId)
    },
    [activeActionId, actionIds]
  )

  const activeContent = activeActionId ? contents.get(activeActionId) : null

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentFocusIndex = actionIds.indexOf(focusedActionId || '')

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        if (currentFocusIndex > 0) {
          setFocusedActionId(actionIds[currentFocusIndex - 1])
        } else if (currentFocusIndex === -1 && actionIds.length > 0) {
          setFocusedActionId(actionIds[0])
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentFocusIndex < actionIds.length - 1) {
          setFocusedActionId(actionIds[currentFocusIndex + 1])
        } else if (currentFocusIndex === -1 && actionIds.length > 0) {
          setFocusedActionId(actionIds[0])
        }
        break
      case 'Enter':
      case ' ': // Space key
        event.preventDefault()
        if (focusedActionId) {
          const newIndex = actionIds.indexOf(focusedActionId)
          const oldIndex = actionIds.indexOf(activeActionId || '')
          setDirection(
            oldIndex !== -1 && newIndex !== -1 ? newIndex - oldIndex : 0
          )
          setActiveActionId(
            focusedActionId === activeActionId ? null : focusedActionId
          )
        }
        break
      case 'Escape':
        event.preventDefault()
        setActiveActionId(null)
        setFocusedActionId(null)
        break
    }
  }

  return (
    <ToolbarContext.Provider
      value={{
        activeActionId,
        setActiveActionId: handleActionChange,
        registerContent,
        motionDirection: direction,
        focusedActionId,
        setFocusedActionId,
      }}
    >
      <TooltipProvider delayDuration={500}>
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2"
          role="toolbar"
          aria-label="Action toolbar"
          onKeyDown={handleKeyDown}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-elevated    transition-all duration-300 dark:shadow-elevatedDark">
            <motion.div
              initial={false}
              animate={{
                height: activeContent ? 'auto' : 0,
                opacity: activeContent ? 1 : 0,
              }}
              transition={{
                height: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5,
                },
                opacity: { duration: 0.15 },
              }}
              className="relative overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="sync" custom={direction}>
                {activeContent && (
                  <motion.div
                    key={activeActionId}
                    className="rounded-lg bg-gray-50/80 dark:bg-neutral-800/50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] mx-1 mt-1"
                    custom={direction}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            x: direction * 20,
                            opacity: 0,
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : {
                            x: 0,
                            opacity: 1,
                          }
                    }
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            x: direction * -20,
                            opacity: 0,
                            position: 'absolute',
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                      opacity: { duration: 0.15 },
                    }}
                  >
                    <div
                      className="p-4"
                      role="region"
                      aria-label="Action content"
                    >
                      {activeContent}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div
              className="flex items-center gap-1 p-1 justify-center"
              role="group"
              aria-label="Toolbar actions"
            >
              {children}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ToolbarContext.Provider>
  )
}

/**
 * Container for a toolbar action and its associated content.
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
    <div className="relative" data-action-id={actionId} role="presentation">
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
 */
function Trigger({ icon, tooltip, actionId }: TriggerProps) {
  const {
    activeActionId,
    setActiveActionId,
    focusedActionId,
    setFocusedActionId,
  } = useToolbarContext()

  const isActive = actionId === activeActionId
  const isFocused = actionId === focusedActionId

  const handleClick = () => {
    if (actionId) {
      setActiveActionId(isActive ? null : actionId)
      setFocusedActionId(actionId)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          onFocus={() => setFocusedActionId(actionId || null)}
          onBlur={() => setFocusedActionId(null)}
          className={cn(
            'relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800/80',
            'transition-colors duration-200 text-gray-700 dark:text-gray-300',
            'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700',
            isActive && isFocused && 'bg-gray-200/80 dark:bg-neutral-800/80'
          )}
          aria-expanded={isActive}
          aria-haspopup="true"
          aria-label={tooltip}
        >
          <span className="sr-only">{tooltip}</span>
          <div className="min-w-5 h-5" aria-hidden="true">
            {icon}
          </div>
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
