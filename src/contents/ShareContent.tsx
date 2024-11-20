import { ShieldCheck } from 'lucide-react'

const ShareContent = () => {
  return (
    <div className="flex flex-col items-center gap-1 text-center w-full">
      <div className="bg-white dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-700 p-2">
        <ShieldCheck className="size-5 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-base font-medium text-gray-700 dark:text-neutral-200 tracking-tight">
        Share Preview
      </h2>
      <p className="text-[13px] text-gray-500 dark:text-neutral-400">
        Choose who can comment on deployments for feature.
      </p>
      <input
        className="mt-2 dark:text-neutral-200 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 bg-white w-full h-8 px-2 rounded-lg text-[13px] focus:outline-none"
        placeholder="Add team members email"
      />
    </div>
  )
}

export default ShareContent
