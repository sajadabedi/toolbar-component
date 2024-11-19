const InboxItem = ({ avatar, name, message, time }: any) => (
  <li className="flex gap-2 items-center">
    <img
      src={avatar}
      alt={`${name}'s avatar`}
      className="size-6 rounded-full"
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
  const messages = [
    {
      avatar: '/src/assets/1.png',
      name: 'Jakub',
      message: 'Hello, how can I help you?',
      time: '10:00 AM',
    },
    {
      avatar: '/src/assets/2.png',
      name: 'Jonas',
      message: 'I need assistance with my account.',
      time: '11:00 AM',
    },
  ]

  return (
    <ul className="flex flex-col gap-1 w-full">
      {messages.map((message) => (
        <InboxItem key={message.name} {...message} />
      ))}
    </ul>
  )
}

export default InboxContent
