import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page')({
  component: () => <div>Hello /page!</div>,
})
