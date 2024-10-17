import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (
        <React.Fragment>
            <nav className='flex gap-4 p-8 bg-primary text-secondary'>
                <Link to="/" className='[&.active]:font-bold'>Home</Link>
                <Link to="/about" className='[&.active]:font-bold'>About</Link>
                <Link to="/page" className='[&.active]:font-bold'>Page</Link>
            </nav>
            <Outlet  />
        </React.Fragment>
    ),
})
