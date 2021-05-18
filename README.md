# galaxy-map-generator

This project allows to create a galaxy map, which can contain an unlimited number of star clusters.

Each star clusters can contain an unlimited number of star systems, complete with stars, planets (with or without rings), natural satellites, and asteroid fields.

This project makes heavy use of CSS custom properties, which allows the user to dynamically change:
  - the view angles
  - the orbits' scale (default: 1UA = 15rem)
  - the celestial bodies' scale (default: 1 Earth = 1rem)
  - the duration of a year (default: 1 Earth year = 30s)
  - the duration of a day (default: 1 Earth day = 10s)
  - the perspective (default: none)

You can drag the star systems around with the mouse or finger.

Textures are in webp format.
CSS filters and overlays are used to compensate for the somewhat small amount of textures.

Optional:
  - Use real(ish) proportions on celestial bodies (warning: stars are HUGE, satellites are tiny)
  - Replace the mouse cursor by a starship, which:
    - turns in the direction of your mouse move
    - has a jet trail based on mouse speed
    - size can be adjusted with a slider
 
Warning:
  - This project makes heavy use of nested CSS transforms, which can be quite a drag on computer's resources!
  - This project is only fully compatible with Google Chrome and other Chromium-based browsers. Firefox can't handle that much nested transformations, Safari can't display webp images, and MS Edge (pre-Chromium) can't do much in this case.

The full content is based on the Mass Effect Trilogy games, and stored in a json file.
