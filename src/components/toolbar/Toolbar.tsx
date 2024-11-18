import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '../../lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip'

// Context Types
interface ToolbarContextValue {
  activeActionId: string | null
  setActiveActionId: (id: string | null) => void
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

// Root Component
function Root({ children }: { children: React.ReactNode }) {
  const [activeActionId, setActiveActionId] = React.useState<string | null>(
    null
  )

  return (
    <ToolbarContext.Provider value={{ activeActionId, setActiveActionId }}>
      <TooltipProvider delayDuration={100}>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="flex items-center gap-1 p-2 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 rounded-xl shadow-elevated hover:shadow-rised transition-all duration-300">
              {children}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </ToolbarContext.Provider>
  )
}

// Action Component
interface ActionProps {
  children: React.ReactNode
}

function Action({ children }: ActionProps) {
  const actionId = React.useId()
  return (
    <div className="relative" data-action-id={actionId}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { actionId } as any)
        }
        return child
      })}
    </div>
  )
}

// Trigger Component
interface TriggerProps {
  icon: React.ReactNode
  tooltip: string
  actionId?: string
}

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

// Content Component
interface ContentProps {
  children: React.ReactNode
  actionId?: string
}

function Content({ children, actionId }: ContentProps) {
  const { activeActionId } = useToolbarContext()
  const isOpen = actionId === activeActionId

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0, y: 20 }}
          animate={{ height: 'auto', opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
          className={cn(
            'absolute bottom-full left-0 right-0 mb-2',
            'bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 rounded-xl',
            'border border-gray-200/50 dark:border-gray-800/50',
            'shadow-elevated overflow-hidden',
            'min-w-[320px]'
          )}
        >
          <div className="p-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Toolbar = {
  Root,
  Action,
  Trigger,
  Content,
  useToolbarContext,
}
