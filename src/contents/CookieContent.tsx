import { EarthLockIcon } from 'lucide-react'

const CookieContent = () => {
  return (
    <div className="flex flex-col items-center gap-1 text-center w-full">
      <div className="bg-white dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-700 p-2">
        <EarthLockIcon className="size-5 text-gray-500 dark:text-neutral-400" />
      </div>
      <h2 className="text-base font-medium text-gray-700 dark:text-neutral-200 tracking-tight">
        EU Cookie Policy
      </h2>
      <p className="text-[13px] text-gray-500 dark:text-neutral-400">
        This website uses cookies to ensure you get the best experience on our
        website.
      </p>
      <button className="mt-2 dark:text-neutral-200 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600 bg-white w-full h-7 px-2 rounded-lg text-[13px] focus:outline-none">
        Accept Cookies
      </button>
    </div>
  )
}

export default CookieContent
