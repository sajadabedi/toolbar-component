# Toolbar Component

Built using `React`, `Framer Motion`, `Tailwind CSS`.

## Usage

```typescript
import { Toolbar } from './components/Toolbar'
;<Toolbar.Root>
  <Toolbar.Item>
    <Toolbar.Trigger icon={<Icon className="size-5" />} tooltip="Messages" />
    <Toolbar.Content>
      <div className="space-y-2">
        <h3 className="font-medium">Inbox</h3>
        <p>You have 3 new messages</p>
      </div>
    </Toolbar.Content>
  </Toolbar.Item>
</Toolbar.Root>
```

## Things I want to improve

- Optimizing for the mobile and touch screens.
- Moving from Tailwind arbitrary styling into variables or tokens.
- Supporting more extended content.
