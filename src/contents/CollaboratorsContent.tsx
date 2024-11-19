const CollaboratorItem = ({ avatar, name, lastEdited }: any) => (
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
      <button className="mt-2 dark:text-neutral-200 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 bg-white w-full h-7 px-2 rounded-lg text-[13px] focus:outline-none">
        View all →
      </button>
    </ul>
  )
}

export default CollaboratorsContent
