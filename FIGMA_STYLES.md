# Alba Proposal - Figma Styles Reference

Copy these values directly into Figma.

---

## COLOR STYLES

### Brand Colors
```
Alba Orange        #E85A2C    rgb(232, 90, 44)
Soft Coral         #F4A261    rgb(244, 162, 97)
Deep Orange        #C94A1F    rgb(201, 74, 31)
```

### Secondary Colors
```
Soft Sage          #6B8E7D    rgb(107, 142, 125)
Light Sage         #8BA99A    rgb(139, 169, 154)
Deep Sage          #567264    rgb(86, 114, 100)
```

### Backgrounds
```
Warm Cream         #FAF9F6    rgb(250, 249, 246)
Alba Creme         #F4F3E8    rgb(244, 243, 232)
White              #FFFFFF    rgb(255, 255, 255)
Soft Peach         #FEF3EE    rgb(254, 243, 238)
```

### Dark Theme
```
Warm Charcoal      #2B3A42    rgb(43, 58, 66)
Dark Surface       #364954    rgb(54, 73, 84)
Dark Elevated      #425A66    rgb(66, 90, 102)
```

### Text Colors
```
Primary Text       #374151    rgb(55, 65, 81)
Muted Text         #6B7280    rgb(107, 114, 128)
Light Text         #F9FAFB    rgb(249, 250, 251)
Dark Muted         #9CA3AF    rgb(156, 163, 175)
```

### Utility
```
Border Light       #E5E7EB    rgb(229, 231, 235)
WhatsApp Green     #25D366    rgb(37, 211, 102)
Error Red          #EF4444    rgb(239, 68, 68)
Success Green      #10B981    rgb(16, 185, 129)
```

---

## TEXT STYLES

### Display (Hero Headlines)
```
Font:          Plus Jakarta Sans
Weight:        800 (Extra Bold)
Size:          72-96px
Line Height:   90% (0.9)
Letter Spacing: -3% (-0.03em)
```

### Headline 1
```
Font:          Plus Jakarta Sans
Weight:        800 (Extra Bold)
Size:          48-56px
Line Height:   108% (1.08)
Letter Spacing: -2.5% (-0.025em)
```

### Headline 2
```
Font:          Plus Jakarta Sans
Weight:        700 (Bold)
Size:          36-40px
Line Height:   110% (1.1)
Letter Spacing: -2% (-0.02em)
```

### Headline 3
```
Font:          Plus Jakarta Sans
Weight:        700 (Bold)
Size:          28-32px
Line Height:   115% (1.15)
Letter Spacing: -1.5% (-0.015em)
```

### Body Large
```
Font:          Inter
Weight:        400 (Regular)
Size:          18px
Line Height:   175% (1.75)
Letter Spacing: 1% (0.01em)
```

### Body
```
Font:          Inter
Weight:        400 (Regular)
Size:          16px
Line Height:   170% (1.7)
Letter Spacing: 1% (0.01em)
```

### Body Small
```
Font:          Inter
Weight:        400 (Regular)
Size:          14px
Line Height:   150% (1.5)
Letter Spacing: 0%
```

### Label / Tag
```
Font:          Inter
Weight:        600 (Semi Bold)
Size:          12px
Line Height:   140% (1.4)
Letter Spacing: 5% (0.05em)
Transform:     UPPERCASE
```

### Quote / Editorial
```
Font:          Playfair Display
Weight:        400 (Regular)
Size:          24-36px
Line Height:   130% (1.3)
Letter Spacing: -1% (-0.01em)
Style:         Italic (optional)
```

---

## EFFECT STYLES

### Shadow - Small
```
X: 0, Y: 1, Blur: 2, Spread: 0
Color: #000000, Opacity: 5%
```

### Shadow - Medium
```
Effect 1: X: 0, Y: 4, Blur: 6, Spread: -1, Color: #000000 @ 10%
Effect 2: X: 0, Y: 2, Blur: 4, Spread: -2, Color: #000000 @ 10%
```

### Shadow - Large
```
Effect 1: X: 0, Y: 10, Blur: 15, Spread: -3, Color: #000000 @ 10%
Effect 2: X: 0, Y: 4, Blur: 6, Spread: -4, Color: #000000 @ 10%
```

### Shadow - Glass
```
X: 0, Y: 8, Blur: 32, Spread: 0
Color: #2B3A42, Opacity: 10%
```

### Shadow - Orange Glow
```
X: 0, Y: 0, Blur: 30, Spread: 0
Color: #E85A2C, Opacity: 40%
```

### Glassmorphism
```
Fill: #FFFFFF @ 70%
Background Blur: 20px
Stroke: #FFFFFF @ 50%, 1px Inside
Shadow: Glass shadow (above)
```

---

## SPACING VALUES

### Base: 4px

```
4px    (xs)      1 unit
8px    (sm)      2 units
12px             3 units
16px   (md)      4 units
20px             5 units
24px   (lg)      6 units
32px   (xl)      8 units
40px             10 units
48px   (2xl)     12 units
64px   (3xl)     16 units
80px             20 units
96px   (4xl)     24 units
128px  (5xl)     32 units
```

---

## BORDER RADIUS

```
6px    (sm)
8px    (md)
12px   (lg)
16px   (xl)
24px   (2xl)
9999px (full/pill)
```

---

## SLIDE FRAME SETUP

### Dimensions
```
Width:  1920px
Height: 1080px
```

### Grid
```
Columns: 12
Gutter:  24px
Margin:  80px (all sides)
```

### Safe Area
```
Top:    80px
Right:  80px
Bottom: 80px
Left:   80px
```

---

## COMPONENT LIBRARY SUGGESTIONS

### Create These Components:

1. **Section Label**
   - Orange dot (8px) + uppercase text
   - Color: `#E85A2C`

2. **CTA Button - Primary**
   - Background: `#E85A2C`
   - Text: White, 14px, 600 weight, uppercase
   - Padding: 16px 32px
   - Radius: 8px

3. **CTA Button - Outline**
   - Border: 2px `#2B3A42`
   - Text: `#2B3A42`, 14px, 600 weight
   - Padding: 16px 32px
   - Radius: 8px

4. **Feature Card**
   - Background: `#F4F3E8`
   - Radius: 16px
   - Padding: 24px
   - Icon + Title + Description

5. **Screenshot Frame**
   - Browser mockup with rounded corners
   - Shadow: Large
   - Optional "Before/After" label

6. **Phone Mockup**
   - iPhone frame
   - Screen area for content
   - Shadow: Large

7. **Stat Card**
   - Large number in Alba Orange
   - Label below in muted text

8. **Timeline Node**
   - Circle (24px) with number or dot
   - Connected by 2px line
   - Label and description below

---

## ICONS

Use Lucide Icons (https://lucide.dev) for consistency:

- Check: `check` or `check-circle`
- X/Cross: `x` or `x-circle`
- Arrow: `arrow-right`, `arrow-up`, `arrow-down`
- Phone: `phone`
- Mail: `mail`
- Calendar: `calendar`
- Clock: `clock`
- Users: `users`
- Heart: `heart`
- Star: `star`
- Shield: `shield-check`
- Zap: `zap` (speed)
- Globe: `globe`
- Smartphone: `smartphone`
- MessageCircle: `message-circle` (chat)

**Icon Style:**
- Stroke width: 1.5-2px
- Size: 24px default, 32-48px for features
- Color: Match text or use `#E85A2C` for emphasis
