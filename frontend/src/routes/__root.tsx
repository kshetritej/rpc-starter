import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: Root
})

function Navbar() {
    return (
        <nav className='flex gap-4 p-8 bg-primary text-secondary'>
            <Link to="/" className='[&.active]:font-bold'>Home</Link>
            <Link to="/about" className='[&.active]:font-bold'>About</Link>
            <Link to="/page" className='[&.active]:font-bold'>Page</Link>
            <Link to="/expenses" className='[&.active]:font-bold'>Expenses</Link>
            <Link to="/create-expense" className='[&.active]:font-bold'>Create</Link>
        </nav>
    )
}

function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
