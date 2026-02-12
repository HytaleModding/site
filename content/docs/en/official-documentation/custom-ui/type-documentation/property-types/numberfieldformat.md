---
title: NumberFieldFormat
authors:
  - name: "Hypixel Studios Canada Inc."
    url: "https://hytale.com"
---

<OfficialDocumentationNotice />

# NumberFieldFormat

## Properties

| Name                 | Type    | Description                                                                                                                                                                                                                         |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MaxDecimalPlaces** | Integer | Specifies the maximum number of decimal numbers allowed. Use 0 for integers                                                                                                                                                         |
| **Step**             | Decimal | Specifies by how much the number will be incremented or decremented when using key controls                                                                                                                                         |
| **MinValue**         | Decimal | Minimum number that can be entered. Number cannot be smaller than this                                                                                                                                                              |
| **MaxValue**         | Decimal | Maximum number that can be entered. Number cannot be bigger than this                                                                                                                                                               |
| **DefaultValue**     | Decimal | The default number                                                                                                                                                                                                                  |
| **Suffix**           | String  | If specified, a text suffix will be added after the number. Useful for percentages (100%) or other units (10px, 10€) The user can edit this suffix, however the suffix will be added back, if removed, when the element loses focus |
