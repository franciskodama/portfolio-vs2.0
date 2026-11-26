'use client';

import { useEffect } from 'react';

// Only track the live site, so localhost and Vercel previews stay out of HubSpot.
const TRACKED_HOSTS = ['fkodama.com', 'www.fkodama.com'];
const SCRIPT_ID = 'hs-script-loader';

export default function HubSpotTracking() {
  useEffect(() => {
    if (!TRACKED_HOSTS.includes(window.location.hostname)) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://js.hs-scripts.com/52214175.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
