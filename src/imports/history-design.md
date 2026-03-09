Design the History tab for SONA mobile app.
Two views toggled from the same screen.

TOP BAR
- Title: "History" top left
- Two toggle buttons top right: 
  "Timeline" and "Calendar"
  Active toggle is filled, inactive is outlined
- Keep white background, minimal layout

──────────────────────────────
VIEW 1 — TIMELINE (default view)
──────────────────────────────

Shows today's pain episodes as a 
vertical timeline down the page.

DATE HEADER
- Today's date displayed at top
  e.g. "Saturday, March 8"
- Subtext: "3 episodes detected"

TIMELINE LAYOUT
- Vertical line running down the 
  left side of the screen
- Each pain episode appears as a 
  card connected to the timeline line
- Cards show:
    - Time of episode e.g. "2:14 AM"
    - Body region affected e.g. "Abdomen"
    - Pain type e.g. "Gas pain"
    - Confidence level e.g. "84%"
    - Status tag: Resolved or Active
- Cards are spaced down the timeline
  in chronological order
- Empty time periods show as a thin 
  faint line with no card
- If no episodes today show a simple 
  empty state: "No episodes today"

BOTTOM
- Small text link: "View past days"
  which opens the Calendar view

──────────────────────────────
VIEW 2 — CALENDAR VIEW
──────────────────────────────

Full month calendar inspired by 
Apple Calendar UI but in SONA's 
white minimal theme.

CALENDAR LAYOUT
- Month and year header at top
  with left and right arrows to 
  navigate between months
- 7 column grid — Sun through Sat
- Each day shows as a circle or 
  rounded square
- Days with pain episodes have a 
  small colored dot below the date 
  number — dot color matches 
  pain severity
  Light dot = mild episode
  Medium dot = moderate episode
  Dark dot = severe episode
- Today's date is highlighted 
  with a filled circle
- Days with no episodes are plain

SELECTED DAY DETAIL
- When user taps a day the calendar 
  stays visible at the top
- Below the calendar a list of 
  that day's episodes slides in
- Same card format as Timeline view
- If no episodes: "No episodes on 
  this day" in small grey text

DESIGN NOTES
- Keep entire screen white and minimal
- Calendar grid lines should be very 
  subtle — almost invisible
- Dot indicators should be small and 
  understated — not loud
- The transition between Timeline 
  and Calendar views should feel 
  like a smooth slide
- Typography and spacing should 
  match the rest of the SONA app
- Feel should reference Apple 
  Calendar — clean, spacious, 
  confident — but simpler