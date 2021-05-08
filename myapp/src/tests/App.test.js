import App from '../App';
import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'


// example code for testing taken from documentation 
// const server = setupServer(
//   rest.get('/greeting', (req, res, ctx) => {
//     return res(ctx.json({ greeting: 'hello there' }))
//   })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// test('loads and displays greeting', async () => {
//   render(<App />)

//   fireEvent.click(screen.getByText('Load Greeting'))    // fireEvent can be used to simulate user actions

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })



test('renders navigation bar when page loads', () => {
    render(<App />);
    screen.debug(); //This outputs all the html for App when test is run. 
    expect(screen.queryByText(/Home/i)).toBeInTheDocument(); // /Home/i --> the "i" indicates that we don't care about case. 
    expect(screen.queryByText("Polls")).toBeInTheDocument(); //use "Polls" here became otherwise querybytext will find other instances of polls and return an error... and we say polls a lot.
    expect(screen.queryByText(/Search/i)).toBeInTheDocument();
    //not sure how to test log in button
});


test('renders form to input new polls when page loads', async () => {
    render(<App />);
    expect(screen.queryByText(/Create a New Poll/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Add Poll Information/i)).toBeInTheDocument();

    userEvent.click(screen.getByText('Add Poll Information'))
    // fireEvent.click(screen.getByText('Add Poll Information')); can also be used

    /*
        waitFor is meant to be used with an assertion. In other words it is meant to wait until an expectation is true
        Once the statement is true, we know the process is finished and we can continue to test 
        We know that if we click the button, something like "question" should show up, so we wait for that. 
    */
    await waitFor(() =>
        expect(screen.getByText(/Question/)).toBeInTheDocument()
    )

    // for some reason, querybylabeltext doesn't work, so I just use query by text

    expect(screen.queryByText(/Question/i)).toBeInTheDocument();
    expect(screen.queryByText(/Category/i)).toBeInTheDocument();
    expect(screen.queryByText(/Due Date/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Vote option1/i)).toBeInTheDocument(); 
});


test('renders recommended, recent, and popular polls', () => {
    render(<App />);
    expect(screen.queryByText(/Recommended Polls/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Recent Polls/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Popular Polls/i)).toBeInTheDocument();

});