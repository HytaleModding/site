---
title: SoundStyle
authors:
  - name: "Hypixel Studios Canada Inc."
    url: "https://hytale.com"
---

<OfficialDocumentationNotice />

# SoundStyle

Specifies sound properties for a single sound

## Properties

| Name                     | Type             | Description                                                                                                               |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **SoundPath**            | UI Path (String) | The sound file to play. Must be an .ogg file                                                                              |
| **Volume**               | Float            | The volume in decibels                                                                                                    |
| **MinPitch**             | Float            | If specified, a random number between MinPitch and MaxPitch will be picked for the pitch. This value must be in semitones |
| **MaxPitch**             | Float            | If specified, a random number between MinPitch and MaxPitch will be picked for the pitch. This value must be in semitones |
| **StopExistingPlayback** | Boolean          | If enabled, any existing UI sound playback with the same file path will be stopped before this sound will be played       |
