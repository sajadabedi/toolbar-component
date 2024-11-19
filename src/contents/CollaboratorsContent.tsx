import * as React from 'react'

interface CollaboratorProps {
  avatar: string
  name: string
  lastEdited: string
}

const CollaboratorItem = ({ avatar, name, lastEdited }: CollaboratorProps) => (
  <li className="flex gap-2 items-center">
    <img
      src={avatar}
      alt={`${name}'s avatar`}
      className="size-6 rounded-full"
    />
    <div className="flex flex-col">
      <span className="text-sm">{name}</span>
      <span className="text-xs text-gray-500 dark:text-neutral-400">
        Last edited: {lastEdited}
      </span>
    </div>
  </li>
)

const CollaboratorsContent = () => {
  const collaborators = [
    {
      avatar: '/src/assets/1.png',
      name: 'Jakub',
      lastEdited: '10 minutes ago',
    },
    { avatar: '/src/assets/2.png', name: 'Jonas', lastEdited: '1 hour ago' },
    { avatar: '/src/assets/3.png', name: 'Kuba', lastEdited: '2 hours ago' },
  ]

  return (
    <ul className="flex flex-col gap-1 w-full">
      {collaborators.map((collaborator) => (
        <CollaboratorItem key={collaborator.name} {...collaborator} />
      ))}
      <button className="mt-2 text-sm text-gray-700 dark:text-neutral-200 shadow-subtle rounded-md text-[13px] w-full text-center bg-white px-2 py-1 dark:bg-neutral-800">
        View all →
      </button>
    </ul>
  )
}

export default CollaboratorsContent
