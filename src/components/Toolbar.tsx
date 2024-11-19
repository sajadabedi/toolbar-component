import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip'

// Context interface for Toolbar
interface ToolbarContextValue {
  activeItemId: string | null
  setActiveItemId: (id: string | null) => void
  registerContent: (id: string, content: React.ReactNode) => void
  motionDirection: number
  focusedItemId: string | null
  setFocusedItemId: (id: string | null) => void
}

// Create context for Toolbar
const ToolbarContext = React.createContext<ToolbarContextValue | undefined>(
  undefined
)

// Custom hook to use Toolbar context
function useToolbarContext() {
  const context = React.useContext(ToolbarContext)
  if (!context) {
    throw new Error('Toolbar components must be used within a Toolbar.Root')
  }
  return context
}

// Root component for the Toolbar
function Root({ children }: { children: React.ReactNode }) {
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null)
  const [focusedItemId, setFocusedItemId] = React.useState<string | null>(null)
  const [direction, setDirection] = React.useState(0)
  const [contents, setContents] = React.useState<Map<string, React.ReactNode>>(
    new Map()
  )
  const [itemIds, setItemIds] = React.useState<string[]>([])
  const shouldReduceMotion = useReducedMotion()

  // Register content for items
  const registerContent = React.useCallback(
    (id: string, content: React.ReactNode) => {
      setContents((prev) => new Map(prev).set(id, content))
      setItemIds((prev) => [...new Set([...prev, id])])
    },
    []
  )

  // Handle item changes
  const handleItemChange = React.useCallback(
    (newId: string | null) => {
      if (!newId) {
        setActiveItemId(null)
        return
      }

      const oldIndex = itemIds.indexOf(activeItemId || '')
      const newIndex = itemIds.indexOf(newId)
      setDirection(oldIndex !== -1 && newIndex !== -1 ? newIndex - oldIndex : 0)
      setActiveItemId(newId)
    },
    [activeItemId, itemIds]
  )

  const activeContent = activeItemId ? contents.get(activeItemId) : null

  // Handle keyboard navigation
  const handleKeyboardNavigation = (event: React.KeyboardEvent) => {
    const currentFocusIndex = itemIds.indexOf(focusedItemId || '')
    let newFocusedId: string | null = null

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        if (currentFocusIndex > 0) {
          newFocusedId = itemIds[currentFocusIndex - 1]
        } else if (currentFocusIndex === -1 && itemIds.length > 0) {
          newFocusedId = itemIds[0]
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentFocusIndex < itemIds.length - 1) {
          newFocusedId = itemIds[currentFocusIndex + 1]
        } else if (currentFocusIndex === -1 && itemIds.length > 0) {
          newFocusedId = itemIds[0]
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedItemId) {
          const newIndex = itemIds.indexOf(focusedItemId)
          const oldIndex = itemIds.indexOf(activeItemId || '')
          setDirection(
            oldIndex !== -1 && newIndex !== -1 ? newIndex - oldIndex : 0
          )
          setActiveItemId(focusedItemId === activeItemId ? null : focusedItemId)
        }
        break
      case 'Escape':
        event.preventDefault()
        setActiveItemId(null)
        setFocusedItemId(null)
        break
    }

    if (newFocusedId) {
      setFocusedItemId(newFocusedId)
      // Find and focus the button element
      const button = document.querySelector(
        `[data-item-id="${newFocusedId}"] button`
      )
      if (button instanceof HTMLElement) {
        button.focus()
      }
    }
  }

  return (
    <ToolbarContext.Provider
      value={{
        activeItemId,
        setActiveItemId: handleItemChange,
        registerContent,
        motionDirection: direction,
        focusedItemId,
        setFocusedItemId,
      }}
    >
      <TooltipProvider delayDuration={500}>
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2"
          role="toolbar"
          aria-label="Item toolbar"
          onKeyDown={handleKeyboardNavigation}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-elevated transition-all duration-300 dark:shadow-elevatedDark">
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
                    key={activeItemId}
                    className="rounded-lg bg-gray-50/80 dark:bg-neutral-900/40 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] mx-1 mt-1"
                    custom={direction}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { x: direction * 20, opacity: 0 }
                    }
                    animate={
                      shouldReduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }
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
                      className="p-2 max-w-[236px]"
                      role="region"
                      aria-label="Item content"
                    >
                      {activeContent}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div
              className="flex items-center p-1 gap-1 justify-center"
              role="group"
              aria-label="Toolbar items"
            >
              {children}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ToolbarContext.Provider>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  const itemId = React.useId()
  const { registerContent } = useToolbarContext()

  React.useEffect(() => {
    const content = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === Content
    )
    if (React.isValidElement(content)) {
      registerContent(itemId, content.props.children)
    }
  }, [itemId, children, registerContent])

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Trigger
  )

  return (
    <div
      className="relative flex items-center justify-center"
      data-item-id={itemId}
      role="presentation"
    >
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger, { itemId } as any)}
    </div>
  )
}

interface TriggerProps {
  icon: React.ReactNode
  tooltip: string
  itemId?: string
}

function Trigger({ icon, tooltip, itemId }: TriggerProps) {
  const { activeItemId, setActiveItemId, focusedItemId, setFocusedItemId } =
    useToolbarContext()

  const isActive = itemId === activeItemId
  const isFocused = itemId === focusedItemId

  const handleClick = () => {
    if (itemId) {
      setActiveItemId(isActive ? null : itemId)
      setFocusedItemId(itemId)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          onFocus={() => setFocusedItemId(itemId || null)}
          onBlur={() => setFocusedItemId(null)}
          className={`relative min-w-8 min-h-8 flex items-center justify-center p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200 dark:text-gray-300 text-gray-500 hover:text-gray-700 dark:hover:text-white focus-visible:outline-none ${
            isActive
              ? 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-white'
              : isFocused
              ? 'shadow-[inset_0_0_0_1.5px_#e5e7eb] dark:shadow-[inset_0_0_0_1.5px_#404040]'
              : ''
          }`}
          aria-expanded={isActive}
          aria-haspopup="true"
          aria-label={tooltip}
        >
          <span className="sr-only">{tooltip}</span>
          <div className="min-w-5 min-h-5" aria-hidden="true">
            {icon}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

// Content component for toolbar items
function Content(_: { children: React.ReactNode; itemId?: string }) {
  return null
}

// Exporting Toolbar components
export const Toolbar = {
  Root,
  Item,
  Trigger,
  Content,
}
