# Toolbar Component prototype
Exploring a multipurpose floating toolbar interface where users can perform quick actions and view relevant information at their fingertips. 

[Watch preview](https://res.cloudinary.com/sajjadportfolio/video/upload/v1745924422/playground/fqq6dp7sslyakxfwt0v0.mov)

Built using `React`, `Framer Motion`, `Tailwind CSS`.

## Usage

```typescript
import { Toolbar } from './components/Toolbar';

<Toolbar.Root>
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


