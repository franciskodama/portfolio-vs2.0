// HubSpot embed code, rendered in the server HTML so HubSpot's validator can find it.
// Only the Vercel production deployment gets it: VERCEL_ENV is unset on localhost
// and set to "preview" on preview deployments, so that traffic stays out of HubSpot.
export default function HubSpotTracking() {
  if (process.env.VERCEL_ENV !== 'production') return null;

  return (
    <script
      type='text/javascript'
      id='hs-script-loader'
      async
      defer
      src='https://js.hs-scripts.com/52214175.js'
    />
  );
}
