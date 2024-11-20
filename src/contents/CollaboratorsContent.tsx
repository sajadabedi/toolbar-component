import { DummyData } from './DummyData'

const CollaboratorItem = ({ src, name, lastEdited }: any) => (
  <li className="flex gap-2 items-center">
    <img
      src={src}
      width={24}
      height={24}
      alt={`${name}'s avatar`}
      className="size-6 rounded-full select-none"
      draggable={false}
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
  return (
    <ul className="flex flex-col gap-1 w-full">
      {DummyData.map((collaborator) => (
        <CollaboratorItem key={collaborator.name} {...collaborator} />
      ))}
      <button className="mt-2 dark:text-neutral-200 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 bg-white w-full h-7 px-2 rounded-lg text-[13px] focus:outline-none">
        View all →
      </button>
    </ul>
  )
}

export default CollaboratorsContent
