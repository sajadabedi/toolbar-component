import { DummyData } from './DummyData'

const InboxItem = ({ src, name, message, time }: any) => (
  <li className="flex gap-2 items-center">
    <img
      width={24}
      height={24}
      src={src}
      alt={`${name}'s avatar`}
      className="size-6 rounded-full bg-cover"
    />
    <div className="flex flex-col">
      <span className="text-sm">
        {name}
        <span className="text-xs text-gray-400 dark:text-neutral-500 ml-1">
          {time}
        </span>
      </span>
      <span className="text-xs text-gray-500 dark:text-neutral-400">
        {message}
      </span>
    </div>
  </li>
)

const InboxContent = () => {
  return (
    <ul className="flex flex-col gap-1 w-full">
      {DummyData.filter((_, index) => index < 2).map((message) => (
        <InboxItem key={message.name} {...message} />
      ))}
    </ul>
  )
}

export default InboxContent
