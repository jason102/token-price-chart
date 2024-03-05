# token-price-chart

This is a TypeScript React demo app showing the [Neutron](https://www.neutron.org/) and [Atom](https://app.astroport.fi/swap) token values over the past 7 days. It is hosted on AWS S3 here: http://token-price-chart.s3-website-us-west-2.amazonaws.com/

Note that the above website does not have HTTPS certificates enabled and your web browser may complain about it being "insecure".

## Libraries Used

- [Recharts](https://recharts.org/) for showing a chart. I chose this one as it seemed to be one of the most popular React chart libraries.
- Vite for tooling
- Vitest and React Testing Library for unit test cases

## Running the app locally

After cloning the project, in the root of the project's folder run `npm install` to install the dependencies. Then you can run `npm run dev` to run the app on localhost.

## Running the test cases

`run npm test` will run the Vitest test cases.
