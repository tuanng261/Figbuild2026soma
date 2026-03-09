SONA
Product Requirements Document
Mobile App v1.0

Product
SONA Mobile App
Platform
iOS / Android
Version
1.0 — Concept
Paired Device
SONA Wearable Sensor Patch
Primary User
Parents, caregivers, general adults
Core Purpose
Translate invisible pain signals into a visible, actionable body map



1. Product Overview
SONA is a mobile app paired with a soft wearable sensor. It reads physiological signals from the body and renders them as a real-time interactive body map — translating invisible pain into something visible, understandable, and actionable.

The app is designed for anyone who needs to understand pain in a person who cannot communicate it — starting with parents of infants as the primary use case, extending to caregivers of elderly individuals, and general adults tracking their own body signals.

Core promise: You should never have to guess what hurts. SONA tells you.


2. Problem Statement
Pain is the body's most critical warning signal — but it is completely invisible to everyone except the person feeling it. When that person cannot communicate, the signal disappears.

A baby cries and parents spend hours guessing between hunger, gas, fever, and teething
An elderly person with dementia cannot localize or describe what hurts
A non-verbal child shows distress but caregivers cannot identify the source
An adult ignores a recurring body signal for months until it becomes a serious injury

In every case, pain persists longer than necessary because the signal cannot be received, understood, or acted upon.


3. Product Goals
Primary Goal
Reduce the time between pain onset and effective caregiver response — from hours of guessing to minutes of informed action.

Secondary Goals
Give general adults a way to detect and track their own body signals before they become serious
Reduce caregiver anxiety and helplessness through clear, confident information
Serve as a supporting tool for healthcare providers — not a replacement

Out of Scope
SONA is not a diagnostic tool and does not replace medical consultation
SONA does not prescribe medication or treatment plans
SONA does not store or share biometric data externally


4. Target Users
Primary
Parents of infants 0-12 months — cannot communicate pain at all
Secondary
Parents of toddlers 1-3 years — limited vocabulary for pain
Secondary
Caregivers of elderly with dementia — communication impaired
Secondary
General adults 18-40 — poor interoception, miss early signals
Edge case
Caregivers of non-verbal individuals with autism


Primary User Profile — New Parent
Age 25-35, first or second child
High anxiety around not knowing what is wrong
Uses phone heavily, comfortable with apps
Wants confidence and clarity, not data
Core need: tell me what hurts and what to do about it


5. Core Features
5.1 — Onboarding & Device Pairing
Bluetooth pairing with SONA wearable sensor
Profile setup — name, age, and relationship to wearer
Baseline calibration — 3 minute initial reading to establish normal signals
Permission setup — notifications, background monitoring
Clear consent screen explaining what data is collected and how it is used

5.2 — Body Map Dashboard (Core Screen)
The primary interface is a 3D anatomical model of the wearer rendered in the center of the screen. Pain signals from the wearable are overlaid directly onto the body as a severity heatmap.

Semantic Zoom Navigation — four progressive levels of detail:

Macro Level
Soft visual highlight on the general body region experiencing distress
Meso Level
Tap the region to zoom into the specific limb or section
Micro Level
Further zoom isolates the specific joint, muscle, or organ
Diagnostic Level
Deepest zoom highlights the exact tissue generating the signal


2D / 3D toggle for users who prefer a flat anatomical view
Severity heatmap overlaid on body — intensity communicates pain level visually
Real-time updating as signals change
Tap any highlighted area to see plain-language interpretation

5.3 — Pain Interpretation Card
When a pain signal is detected, a card surfaces from the bottom of the screen with:
Most likely pain type in plain language — e.g. Gas pain, Ear discomfort, Muscle tension
Confidence percentage — e.g. 84% confidence
2-3 specific suggested actions the caregiver can try immediately
Dismiss or mark as resolved — feeds back into system learning
Option to log the episode for pattern tracking

5.4 — Signal History & Patterns
A log of all detected pain episodes over time. Helps caregivers and healthcare providers identify recurring patterns.
Timeline of past episodes with body location and type
Frequency charts — is this signal happening more often?
Export as PDF for sharing with a doctor

5.5 — Passive Background Monitoring
SONA monitors continuously in the background when the wearable is active.
Quiet ambient indicator on device home screen showing current signal status
Push notification when a new pain signal is detected above a set threshold
User controls notification sensitivity — high, medium, low
No alerts for signals below threshold — avoids notification fatigue

5.6 — Escalation Protocol
If signals reach critical thresholds — e.g. high fever + elevated distress — app escalates with a prominent alert
Alert includes suggested next steps — call doctor, go to emergency room
One-tap emergency call shortcut within escalation alert
All escalation events automatically logged


6. Screen Architecture
Onboarding
Welcome, device pairing, profile setup, consent, baseline calibration
Home — Body Map
3D body model with live heatmap, semantic zoom, active signal card
Signal Detail
Full interpretation card, suggested actions, confidence level
History
Episode timeline, frequency charts, pattern insights
Settings
Notification preferences, profile management, data controls
Escalation Alert
Full-screen critical alert with next steps and emergency shortcut



7. Navigation
Bottom navigation bar with four tabs:

Home
Body Map — the primary screen users land on every time
History
Past signal log and pattern insights
Alerts
Notification history and escalation log
Settings
Profile, device, notifications, data


The Body Map is the default landing screen every time the app is opened — no dashboard or home screen in between. Users should see the body map immediately.


8. Content Principles
Plain language always — no medical jargon in the UI
Confidence shown, not hidden — always display certainty level
Suggest, never diagnose — all outputs framed as possibilities not facts
One clear action at a time — surface the most helpful next step, not a list of ten
Calm tone — the app should feel reassuring not alarming


9. Safeguards & Constraints
All biometric data processed on-device — never sent to external servers
No data sharing with insurers, advertisers, or third parties
Clear medical disclaimer on every interpretation card
Persistent recommendation to consult healthcare provider for recurring signals
Full data deletion available at any time from settings
Device loss detection — alert if wearable disconnects unexpectedly


