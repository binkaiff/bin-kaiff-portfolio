# Portfolio viewer update

- UI/UX and Technical Projects case studies open in an animated dialog, keeping the card grid stable.
- Letters and certificates open in the same page, with Close, Escape, background dismissal, zoom and original downloads.
- PDF previews are bundled locally and include every page. Original documents are preserved.
- The reading progress bar is 6px high.
- Responsive dialog sizing, keyboard focus, reduced motion and scroll position restoration are included.
- IDM certificate now points to the included IDM PDF.

## Existing content to complete
The CEH certificate was not supplied. Its viewer displays an unavailable message. Add the correct file, update the link, and remove data-preview-unavailable from that link when ready.
The UTA internship letter link still points to the supplied Codveda PDF, as in the original. Replace its href with the correct UTA document when supplied.

## Validation
JavaScript syntax, document preview paths, complete PDF page coverage, viewer integration on all four pages, and preservation of original assets were checked. Browser installation timed out, so live desktop/mobile rendering and interaction tests could not be completed in this environment.

## Use
Extract the complete folder and open index.html, or upload the folder contents to your existing host. No build step or extra dependency is required. Upload images/document-previews along with the HTML, CSS and JavaScript.

## Mobile refinement
The document header and toolbar are now compact on mobile, with reduced page padding. Close stays outside the scrolling and zooming body. Both résumé links use the same viewer and include all résumé pages.

## Centered mobile popup
Document viewers now occupy 88% of the mobile viewport height and are centered with equal space above and below. The blurred backdrop remains visible. Close, Zoom and Download stay outside the scrolling document body.

## Currently building
Added a compact Mentora AI - Student Personal Assistant card below How I can help. Includes the supplied project description, technology stack and In development status, with a stacked mobile layout.
