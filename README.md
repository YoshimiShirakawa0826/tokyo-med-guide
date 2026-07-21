# MediNavi JAPAN

Find the right care. Without the confusion.

## Overview

MediNavi JAPAN is a multilingual healthcare navigation platform for international visitors and students in Japan.

It helps users find appropriate medical facilities based on symptoms, medical specialty, language, location, opening hours, and practical access conditions.

## Features

- Symptom-based medical department guidance
- Multilingual clinic search
- Language filters
- Open-now, night, weekend, and walk-in filters
- Map, phone, and website access
- Emergency guidance
- Connection to Nurse Guide Japan

## Demo

Demo video: [https://vimeo.com/1211815264]
Live application: [https://tokyo-med-guide-upmc.vercel.app/]

## Built With
- OpenAI Codex
- GPT-5.6
- Claude
- Vercel
- GitHub
- Public medical facility data

## How to Run

1. Clone the repository.
   
## Bugs Fixed and Improvements Made

During OpenAI Build Week, we used Codex to fix a bug affecting the GPS-based current-location feature.

### GPS location fix

The app’s current-location function did not always work reliably, which could prevent users from finding nearby medical facilities.

Codex helped us:

- Inspect the GPS and location-handling implementation
- Identify the issue affecting current-location searches
- Correct the location-related logic
- Verify that the user’s location could be used for nearby clinic searches
- Review fallback behavior when location access is unavailable

This fix improved one of the app’s most important functions: helping international visitors find suitable medical care near their current location.
