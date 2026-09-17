# Bin Kaiff — Professional Portfolio

## Open the portfolio

1. Extract the complete ZIP folder.
2. Open `index.html` in your browser.
3. Keep the HTML pages, `css`, `js`, images and documents together.

No installation or build command is required. `home.html` is an identical entry page retained for compatibility with your original filename. VS Code Live Server can also preview the folder.

## What changed

- New warm-white and deep-green theme, consistent typography and spacing.
- Exactly three core skills: UI/UX Design, Technical Projects and Work Migration Marketing.
- Removed WordPress, Graphic Design and Quantity Surveying from the core-skills offering. Existing graphic-design education remains in your qualifications.
- Four UI/UX projects arranged in a balanced two-column desktop grid, with contained image previews, concise headings, tags and clear actions. Mobile uses one column.
- Matching technical-project cards and a three-document migration page.
- Redesigned experience, education and contact sections.
- Shared responsive navigation, keyboard focus indicators, skip link and reduced-motion support.
- All styling and scripts are local; no external font or icon downloads are needed.
- Corrected the NILS assignment filename, institute name and PDF labels, and the NILS certificate link.
- Removed empty project links and buttons for documents absent from the supplied ZIP.
- Removed the contact form's localhost redirect. Added submission progress, success and failure messages, a timeout, and duplicate-submit prevention.

## Edit the content

| File | Purpose |
| --- | --- |
| `index.html` | Main portfolio |
| `home.html` | Matching legacy homepage; keep it in sync with index.html |
| `ui.html` | Four UI/UX design projects |
| `full.html` | Four technical projects |
| `work.html` | Migration coursework and documents |
| `css/style.css` | All colours, layouts, typography and responsive styles |
| `js/main.js` | Mobile navigation and contact form behaviour |
| `images/` | Original project previews, portrait and favicon |
| `documents/`, `certificates/`, `nils/` | Supplied supporting files |

To change the theme, edit the variables at the beginning of `css/style.css`. To add a project, duplicate an existing `project-card` in the relevant HTML page and update its image, title, description and link.

## Contact and external links

The contact form retains your supplied Formspree endpoint. It requires internet access and an active Formspree account. No real message was sent during validation. The email link remains available as a fallback. Figma, GitHub and LinkedIn URLs were retained from your upload; their access permissions and remote availability were not verified.

Empty URLs for the UTA and photo-gallery demos and the calculator repository were removed. Add verified URLs when available. These files were not in your upload, so their broken buttons were removed: `uta_manpower_letter.pdf`, `iit_higher_ed_diploma.pdf`, `marstech.pdf` and `idm_english_it_diploma.pdf`.

Your qualification and employment dates were retained from the uploaded homepage. Review them when you next update your résumé.

## Put it online

Upload the contents of this folder to your static website host, with `index.html` at the root. No backend, package manager or compilation is required. After publishing, check your external project access and send a test contact message yourself to confirm Formspree delivery.

## Validation performed

Checked every local asset, page, document link and fragment target. Confirmed exactly three core skills and four UI/UX cards. JavaScript syntax passed, and isolated navigation and simulated form success/error checks passed. Browser rendering could not be checked because a browser runtime was unavailable in the editing environment. No live contact message was sent.

## Readability and motion update

Shortened project descriptions and the About, Experience and Education copy. Increased small text sizes for easier reading. Moved Back to portfolio to the bottom of all three project pages. Added a subtle 480ms fade-and-rise entrance on scroll for phones and laptops. Each item animates once; reduced-motion preferences disable the effect. Content remains visible without animation support or JavaScript. Scroll animation logic and reduced-motion handling passed isolated checks; browser visual preview remains unverified.

## Full-photo and page-transition update

- The hero photo now uses its natural proportions, without a fixed-height crop. The rounded frame and caption are more compact.
- Refined headline size and small labels for a more balanced hero section.
- Added a short branded opening screen on the first visit per tab session. It closes after the page loads (minimum 4 seconds), with a 8-second safety limit. If session storage is blocked, it may appear on each page.
- Local portfolio-page links use a subtle 160ms exit transition, followed by a short entrance animation. External links, downloads, same-page anchors and modified clicks keep their usual behaviour.
- Smooth anchor scrolling and once-only section entrance animations remain enabled. Reduced-motion preferences disable decorative motion.
- Browser Back restores the visible page. No-JavaScript browsing works normally without the opening screen.
- Added `js/transitions.js` for the opening screen and page-navigation behaviour.

Validation: isolated checks passed for the opening screen, timeout, storage fallback, navigation, reduced motion and browser-back recovery. All local links and assets passed. Browser visual preview remains unverified in this environment.

## Four-second opening screen and portrait repair

The first-visit intro now stays for at least four seconds and waits for the hero image to decode. On a slow connection, it can take longer, with an eight-second fallback. Reduced-motion settings still skip the intro. The complete original photo was recovered from the initial upload and converted to a validated, approximately 90 KB WebP. It is preloaded and eagerly displayed, with explicit dimensions to prevent layout shifts. Bin Kaiff and the caption now appear above the photograph. Navigation and section animations remain unchanged. Image decoding and logic checks passed; browser layout preview remains unverified.

## Footer and photo-caption update

The portrait is followed by its label, Bin Kaiff name and tagline. The shared footer now includes labelled SVG logos for LinkedIn, GitHub, Instagram and Facebook, plus quick navigation and a back-to-top link. Social links open in a new tab. Facebook uses the link supplied in the original portfolio. No external icon library is required. Four-second introduction and existing animations remain unchanged. Footer markup, local links and portrait ordering were checked; live social destinations and browser appearance were not verified.
