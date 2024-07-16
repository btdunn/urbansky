# Urban Sky Inventory Management System
An inventory management system for Urban Sky, built using React, Node and Postgres.

## Usage
The application runs in a Docker container.

Make sure you have the Docker client installed first.

To run:
`docker compose up --build`

The backend API includes a suite of tests for all endpoints.

To run tests:
`cd urbansky-back`
`npx vitest`

## Features/Flexes
- Form validation using `yup` and `react-hook-form`
- Endpoint testing using `vitest` and `supertest`

## Future
This application has plenty of room for improvement. For me, the top three listed are the highest priorities (the rest is unordered).
- `ItemList.tsx` is a monsterous file, and so badly needs to have it's various pieces turned into components.
- Editting an item should only require a single field for submission.
- Implementing React Query, or Redux, for centralized state management. 
- Many of the form behaviors could be improved to smooth out the experience.
- Loading state after form submission should be on a small timeout to prevent the flash that happens when the request goes through too quickly.
- Forms could be modularized to DRY the code.
- Forms should close on submit
- Layout could use some TLC, the gap in the middle for example, is bad.
- Delete confirmation should be a modal that takes focus, dims the background etc.
- CORS should allow specifically the frontend address, not everybody.
- A get item by serial number method would likely be useful, especially with future search functionality in mind.
- Some minor flex nudging happens when you expand an items details, that should be corrected.
- `docker-compose.yml` is likely suboptimal in it's execution, could use improvements.
- Form validation could be expanded and refined.
- I'd probably rethink the design altogether to account for scalability. It's pretty limiting at the moment and would be cumbersome with dramatically larger inventories.
