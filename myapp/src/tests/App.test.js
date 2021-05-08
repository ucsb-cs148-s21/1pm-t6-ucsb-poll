import App from '../App';
import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


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


test('renders form to input new polls when page loads', () => {
    render(<App />);
    expect(screen.queryByText(/Create a New Poll/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Add Poll Information/i)).toBeInTheDocument();
});


test('renders recommended, recent, and popular polls', () => {
    render(<App />);
    expect(screen.queryByText(/Recommended Polls/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Recent Polls/i)).toBeInTheDocument(); 
    expect(screen.queryByText(/Popular Polls/i)).toBeInTheDocument();

});