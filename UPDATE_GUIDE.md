# Motion and mobile update

Open index.html after extracting the whole ZIP. This package uses your latest uploaded portfolio and current illustrated portrait.

## Code changes

- css/motion.css: a 2.8-second dark/light green dot pulse; 2-second floating portrait card (7px desktop, 4px mobile); hover/focus refinements; narrow-screen typography, card sizing, input sizing and touch targets.
- js/motion.js: Automatically pauses decoration while offscreen or in a background tab. No visible motion-control button.
- All four HTML pages load these files after the existing CSS/JS. The homepage includes corrected intrinsic portrait dimensions (1116 × 1301).

## Adjust the motion

Edit status-breathe in css/motion.css to change the dot colours. Change the 2s duration to make the card move faster/slower. Edit translateY(-7px) and translateY(-4px) to adjust desktop/mobile travel. Reduced-motion preferences disable this decorative movement.

## Mobile refinements

Smaller headings on narrow phones; wrapping role label; 16px input text to avoid focus zoom on iOS; scrollable mobile menu for short landscape screens; larger touch targets; flexible grid items; less portrait movement. Your existing project pages, text, links and four-second intro are retained.

## Validation

All local assets, links and anchors passed. All JavaScript files passed syntax checks. Isolated checks verified pause/resume, blocked storage, offscreen and background pausing. The supplied video was reviewed as an animation reference. Live browser preview was blocked from opening the local site, so viewport rendering and real iPhone behaviour could not be verified. Suggested manual widths: 320, 375, 390, 430, 768, 1024 and 1440px.

Latest change: the portrait moves through each up/down cycle in 2 seconds instead of 6 seconds. The Pause motion button and its stored preference were removed. Reduced-motion support remains.

## Navigation and document-return update

- js/enhancements.js adds the navbar section indicator and a thin scroll progress bar.
- main.js staggers visible cards by 80ms, capped at 240ms, with a 420ms entrance.
- Project previews zoom slightly on mouse hover and their link arrows move. Touch navigation remains direct; reduced motion disables decorative movement.
- NK Motors experience-letter and NILS certificate links now open in the same tab. Their click position is stored in the current browser-history entry. Browser Back restores the scroll position and keyboard focus. Native browser restoration remains the fallback.
- Existing 2-second portrait motion is retained.

Checked local links, anchors, unique IDs, JavaScript syntax, progress calculations and simulated browser-history restoration. Live PDF-viewer/browser-back behaviour remains unverified because the local browser preview was blocked.

## Menu, button and contact feedback

Mobile menu uses a 220ms slide/fade and hides closed links from keyboard navigation. Buttons have a small tap/press effect. Contact fields show focus and invalid-field feedback. Submitting shows a spinner and disables duplicate submissions; success displays a checkmark and resets the form; failure retains the message and shows an error. Reduced-motion settings remove decorative motion.

Code: css/motion.css and js/main.js. Syntax and simulated success/failure/duplicate-submission checks passed. No live message was sent. Browser appearance remains unverified.

## Featured project, case studies and email copying

The homepage highlights the UTA Manpower Service business website. Its case-study button opens full.html at the corresponding project and expands its details. All four technical and four UI/UX projects now include Problem, My role, Solution and Result summaries based on the existing portfolio descriptions. Results describe deliverables, not unverified business metrics. Review these summaries when adding more project evidence.

One Copy email button per page provides clipboard feedback, a compatibility fallback and a manual-copy message if copying is blocked. No external clipboard service is used.

New code files: css/projects.css and js/projects.js. HTML contains the editable featured section and case-study text. Verified eight case studies, local assets/anchors, unique IDs and simulated clipboard success/fallback/failure. Browser rendering remains unverified.

## Featured section removed and card expansion corrected

Removed the homepage featured-project section. Project grids now align cards at the top rather than stretching neighbouring cards to the expanded card's height. Case studies remain independently expandable. Copy email and the existing animations remain available.
