export default function AccessibilityContent() {
  return (
    <div className="flex flex-col gap-1 w-full">
      <ul className="flex flex-wrap gap-1">
        <li className="rounded-full text-[13px] flex border items-center gap-1 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
          <span className="size-2 rounded-full block bg-green-700" />
          AAA
        </li>
        <li className="rounded-full text-[13px] flex border items-center gap-1 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
          <span className="size-2 rounded-full block bg-yellow-500" />
          1.4
        </li>
        <li className="rounded-full text-[13px] flex border items-center gap-1 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
          <span className="size-2 rounded-full block bg-red-500" />
          3.0
        </li>
      </ul>
      <div className="shadow-subtle mt-1 rounded-md text-[13px] w-full bg-white dark:bg-neutral-800 py-2">
        <ul className="flex flex-col gap-1">
          <li className="flex flex-col border-b border-gray-100 dark:border-neutral-700 pb-2 px-3 last:border-0 last:pb-0">
            <h4 className="text-sm">
              <span className="size-2 rounded-full inline-block border-2 border-red-500 mr-1" />
              Insufficient color contrast
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-neutral-400">
              Ensure sufficient color contrast for visual accessibility.
            </p>
          </li>
          <li className="flex flex-col border-b border-gray-100 dark:border-neutral-700 pb-2 px-3 last:border-0 last:pb-0">
            <h4 className="text-sm">
              <span className="size-2 rounded-full inline-block border-2 border-yellow-500 mr-1" />
              Inaccessible font size
            </h4>
            <p className="text-[13px] text-gray-500 dark:text-neutral-400">
              Optimize font sizes for visual accessibility, maintaining layout
              integrity when zoomed.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
