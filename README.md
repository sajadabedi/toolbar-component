# An Interactive Component

Built using `React`, `Framer Motion`, and `Tailwind CSS`.

## Toolbar Component

The `Toolbar` component is a flexible and interactive toolbar that allows you to manage actions and their associated content easily. Here are some of its key features:

### Features

- **Accessibility**: The toolbar is designed with a11y in mind.
- **Keyboard Navigation**: You can navigate through the toolbar using your keyboard.

### How to Use

1. Import the `Toolbar`:

```typescript
import { Toolbar } from '../Tooltip'
```

2. Wrap your actions and content within the `Toolbar.Root` component. Here's a simple example:

```typescript
<Toolbar.Root>
  <Toolbar.Action>
    <Toolbar.Trigger icon={<YourIcon />} tooltip="Action 1">
      <Toolbar.Content>Content for Action 1</Toolbar.Content>
    </Toolbar.Trigger>
  </Toolbar.Action>
  <Toolbar.Action>
    <Toolbar.Trigger icon={<YourIcon />} tooltip="Action 2">
      <Toolbar.Content>Content for Action 2</Toolbar.Content>
    </Toolbar.Trigger>
  </Toolbar.Action>
</Toolbar.Root>
```

## How to run

- bun install
- bun run dev
