interface PerformanceMetric {
  label: string
  color: string
  value?: string
}

interface PerformanceIssue {
  title: string
  description: string
  severity: 'yellow' | 'red'
}

const MetricBadge = ({ label, color, value }: PerformanceMetric) => (
  <li className="rounded-full text-[13px] flex border items-center gap-1 min-w-9 text-center border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-200 px-2 py-[1px] bg-white dark:bg-neutral-800">
    {color && <span className={`size-2 rounded-full block bg-${color}-500`} />}
    {value || label}
  </li>
)

const IssueItem = ({ title, description, severity }: PerformanceIssue) => (
  <li className="flex flex-col border-b border-gray-100 dark:border-neutral-700 pb-2 px-3 last:border-0 last:pb-0">
    <h4 className="text-sm">
      <span
        className={`size-2 rounded-full inline-block border-2 border-${severity}-500 mr-1`}
      />
      {title}
    </h4>
    <p className="text-[13px] text-gray-500 dark:text-neutral-400">
      {description}
    </p>
  </li>
)

const PerformanceContent = () => {
  const metrics: PerformanceMetric[] = [
    { label: 'All', color: '' },
    { label: '', color: 'yellow', value: '0.10' },
    { label: '', color: 'red', value: '0.24' },
  ]

  const issues: PerformanceIssue[] = [
    {
      title: 'Image compression',
      description: 'Compress your images to reduce the size of your website.',
      severity: 'red',
    },
    {
      title: 'Code splitting',
      description: 'Split your code into smaller chunks.',
      severity: 'yellow',
    },
  ]

  return (
    <div className="flex flex-col gap-1 w-full">
      <ul className="flex flex-wrap gap-1">
        {metrics.map((metric, index) => (
          <MetricBadge key={index} {...metric} />
        ))}
      </ul>
      <div className="shadow-subtle mt-2 rounded-md text-[13px] w-full bg-white dark:bg-neutral-800 py-2">
        <ul className="flex flex-col">
          {issues.map((issue, index) => (
            <IssueItem key={index} {...issue} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PerformanceContent
