# Abdulaziz Yusupaliev — Personal Portfolio Website Specification

## 1. Project Overview

This document describes the complete plan for building a personal portfolio website for **Abdulaziz Yusupaliev**. The website will present Abdulaziz as a **Frontend Developer** with growing skills in **AI Engineering** and **Machine Learning**.

The portfolio should be personal, clean, modern, and professional. It should help visitors quickly understand who Abdulaziz is, what skills he has, what technologies he uses, and how to contact him.

The website will be designed mainly for personal branding and showcasing technical growth. It can later be expanded for university applications, internships, freelance work, and AI/ML project presentation.

---

## 2. Website Goal

The main goal of the website is to let visitors **look through Abdulaziz's profile, skills, experience, education, and future projects** in a simple and visually appealing way.

Primary visitor action:

> Look through the website and understand Abdulaziz's technical profile.

Secondary goals:

- Show Abdulaziz as a serious frontend developer.
- Show early but growing interest in AI engineering and machine learning.
- Provide contact links for communication and networking.
- Create a strong personal brand through clean design and smooth animations.
- Prepare the portfolio structure so projects can be added later.

---

## 3. Personal Brand Positioning

### Name

**Abdulaziz Yusupaliev**

### Location

**Tashkent, Uzbekistan**

### Main Role

**Frontend Developer & Beginner AI Engineer**

### Short Positioning Statement

> I build clean, modern, and responsive web experiences, while expanding my skills in AI engineering and machine learning.

### Possible Hero Subtitle

> Frontend developer from Tashkent focused on React, Next.js, clean user interfaces, and practical AI/ML tools.

### Personality of the Website

The website should feel:

- Minimal
- Clean
- Dark
- Professional
- Slightly futuristic
- Lightly animated
- Developer-focused

It should not feel too colorful, childish, or overloaded with animations.

---

## 4. Target Audience

The website should be understandable and useful for:

- Other developers
- University reviewers
- Potential collaborators
- Internship recruiters
- Freelance clients
- Teachers or mentors
- People who want to see Abdulaziz's work and technical growth

---

## 5. Design Direction

> **Note (August 2026):** This section describes the original v1 direction and
> is superseded by the shipped noir/gold redesign — see `DESIGN.md` for the
> current visual system (Space Grotesk / Inter / Instrument Serif, `#010108`
> background, gold `#fbbf24` + blue `#60a5fa` accents, 3D particle backdrop).

### Main Style

The website should use a **dark minimal and clean design**.

Recommended visual style:

- Dark background, such as `#080B10`, `#0D1117`, or `#111827`
- White or light gray text
- Subtle accent color, such as cyan, blue, violet, or green
- Clean spacing
- Rounded cards
- Thin borders
- Soft hover effects
- Smooth transitions

### Typography

Use **Montserrat** and **Poppins** as the main fonts.

Recommended font usage:

- **Montserrat** for big headings, hero name, section titles, and strong labels
- **Poppins** for body text, buttons, navbar links, cards, and descriptions

Suggested CSS setup:

```css
font-family: 'Poppins', sans-serif;

.hero-title, h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
}
```

The font style should feel modern, bold, clean, and readable. Avoid default browser fonts or fonts that look too formal, old, or decorative.

### Design Keywords

- Dark mode
- Minimal
- Clean layout
- Developer portfolio
- Subtle animation
- Modern typography
- Grid-based sections
- Smooth scrolling
- Clear hierarchy

### Animation Style

Animations should be small and elegant. Avoid heavy effects that distract from the content.

Recommended animations:

- Smooth section fade-in on scroll
- Button hover effects
- Skill icon hover scale
- Project card hover lift
- Typing or rotating text animation in the Hero section
- Small animated greeting text in multiple languages

---

## 6. Multilingual Greeting Animation

The Hero section should include a small animation that says **hello** in multiple languages.

Suggested greetings:

- Hello
- Привет
- Salom
- Assalomu alaykum
- Hi

Possible animation formats:

### Option 1: Rotating Word

Example:

```txt
Hello → Привет → Salom → Assalomu alaykum
```

The word changes every 1–2 seconds with a fade animation.

### Option 2: Typing Animation

The greeting appears as if it is being typed:

```txt
Hello, I'm Abdulaziz.
```

Then it switches language.

### Recommended Choice

Use a **rotating word animation** because it is simpler, cleaner, and easier to control.

---

## 7. Website Structure

The website should be a single-page portfolio with clear sections.

Recommended sections:

1. Navbar
2. Hero
3. Skills
4. Experience
5. Projects
6. Education
7. Contact
8. Footer

Optional future sections:

- About Me
- Blog
- Achievements
- Resume / CV download
- Testimonials

---

## 8. Navbar Section

### Purpose

The navbar helps users quickly move between sections.

### Navbar Items

Recommended navigation links:

- Home
- Skills
- Experience
- Projects
- Education
- Contact

### Navbar Behavior

- Fixed or sticky at the top
- Transparent or dark blurred background
- Smooth scroll to sections
- Active section highlight if possible
- Mobile hamburger menu on small screens

### Navbar Style

- Minimal text links
- Small logo or initials on the left
- Links on the right

Possible logo text:

```txt
Abdulaziz
```

or

```txt
AY
```

---

## 9. Hero Section

### Purpose

The Hero section should immediately introduce Abdulaziz and explain what he does. It should be the strongest visual part of the website and should look similar to the provided reference image: dark background, large name on the left, short role description, action buttons, and floating technology icons on the right.

### Hero Layout

Use a **two-column desktop layout**:

- **Left side:** name, animated multilingual greeting, role, short description, social buttons, and resume button
- **Right side:** floating technology icon cloud / orbit-style visual

On mobile, stack the layout vertically:

- Text first
- Buttons second
- Floating icons below or lightly behind the text

### Hero Visual Reference

The Hero should follow this visual direction:

- Full-width dark hero area
- Background color close to black, such as `#050505`, `#070A0F`, or `#080B10`
- Very large bold name on the left
- Blinking cursor or rotating greeting beside/above the name
- Role line with highlighted words
- White/gray text with one accent color
- Social icon buttons in small dark rounded squares
- Resume button with strong accent color
- Floating technology icons on the right in grayscale/white
- Icons should have random sizes and positions
- Icons should move slowly with subtle floating animation
- The layout should feel minimal, premium, and developer-focused

### Hero Content

Recommended main text:

```txt
Hello, I'm Abdulaziz Yusupaliev.
Frontend Developer & AI Engineering Learner.
```

Alternative shorter version:

```txt
Abdulaziz Yusupaliev
Frontend Developer & AI Learner
```

Supporting text:

```txt
I build clean, responsive, and modern web interfaces with React, Next.js, TypeScript, and Tailwind CSS. I am also expanding into AI engineering, machine learning, and practical model deployment with Python.
```

### Role Highlight Style

The role line should highlight key words using an accent color.

Example:

```txt
Frontend Developer & AI Engineering Learner
```

Recommended highlight:

- `Frontend` in accent color
- `AI Engineering` in accent color
- Remaining words in light gray or white

Possible accent colors:

- Yellow/gold: `#FACC15`
- Cyan: `#22D3EE`
- Blue: `#3B82F6`
- Violet: `#8B5CF6`

For a look close to the reference image, use **yellow/gold** as the main accent color.

### Hero Call-to-Action Buttons

Recommended buttons:

- GitHub icon button
- LinkedIn icon button
- Email icon button
- Resume button

Optional text buttons:

- View Skills
- Contact Me
- View Projects

Since there are no projects yet, the Projects button can scroll to the Projects section where future projects are mentioned.

### Hero Icon Cloud

The right side should contain floating grayscale technology icons. The icon cloud can include:

- React
- Next.js
- JavaScript
- TypeScript
- HTML5
- CSS3
- Tailwind CSS
- Git
- GitHub
- GitLab
- npm
- Python
- Pandas
- NumPy
- Scikit-learn
- Vercel
- VS Code

Icon design rules:

- Use white, light gray, and dark gray only
- Keep opacity between `0.35` and `0.95`
- Make icons different sizes
- Position icons organically, not in a perfect grid
- Add slow floating movement using Framer Motion
- Add very subtle rotation to some icons
- Avoid making the icon area too colorful or distracting

### Hero Animation Requirements

Include a small multilingual greeting animation. Suggested greetings:

```txt
Hello
Привет
Salom
Assalomu alaykum
Hi
```

Recommended animation behavior:

- Greeting changes every 1.5–2 seconds
- Smooth fade or typing effect
- Small blinking cursor after the name or greeting
- Keep animation subtle and clean

### Hero Fonts

Use the selected typography system:

- Hero name: **Montserrat**, bold, large
- Role text: **Montserrat**, semibold/bold
- Supporting description: **Poppins**, regular/medium
- Buttons: **Poppins**, medium

Recommended desktop sizes:

```txt
Hero name: 56px–72px
Role: 28px–36px
Description: 18px–20px
Buttons: 15px–17px
```

Recommended mobile sizes:

```txt
Hero name: 36px–44px
Role: 22px–28px
Description: 15px–17px
Buttons: 14px–16px
```

### Short Prompt for Hero Section

```txt
Create a dark minimal hero section for Abdulaziz Yusupaliev's personal portfolio. Use a two-column layout: on the left, show a large bold Montserrat name, a multilingual hello animation with a blinking cursor, the role “Frontend Developer & AI Engineering Learner” with the key words highlighted in yellow/gold, a short Poppins description, social icon buttons, and a Resume button. On the right, create a floating grayscale technology icon cloud with React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind, GitHub, Git, Python, Pandas, NumPy, Scikit-learn, Vercel, and VS Code icons. Use a near-black background, white/gray text, subtle Framer Motion floating animations, clean spacing, rounded buttons, and a premium developer portfolio style similar to the reference image. Make it fully responsive.
```

---

## 10. Skills Section

### Purpose

The Skills section should show the technologies Abdulaziz uses and is learning.

The design can be inspired by the reference image: a dark section with technology icons and a short categorized list.

### Main Skill Categories

#### Languages

- JavaScript
- TypeScript
- Python

#### Frontend Frameworks & Libraries

- React
- Next.js

#### Styling & UI

- HTML5
- CSS3
- Tailwind CSS
- Bootstrap
- Pug

#### Developer Tools

- Git
- GitHub
- npm
- Vercel

#### AI / ML / Data Science

- Python
- Pandas
- NumPy
- Scikit-learn
- Machine Learning fundamentals
- ML deployment basics
- AI engineering basics

### Skill Icons to Include

Recommended icon list:

- React
- JavaScript
- TypeScript
- Next.js
- HTML5
- CSS3
- Tailwind CSS
- Git
- GitHub
- GitLab
- Bootstrap
- npm
- Python
- Pandas
- NumPy
- Scikit-learn

### Example Skills Text

```txt
Languages: JavaScript, TypeScript, Python
Frameworks: React, Next.js
Styling: HTML, CSS, Tailwind CSS, Bootstrap, Pug
Tools: Git, GitHub, npm, Vercel
AI / ML: Python, Pandas, NumPy, Scikit-learn, ML deployment basics
```

### Skills Design

Recommended layout:

- Title: `🚀 Skills & Tools`
- Horizontal row or grid of icons
- Category bullet list below
- Hover effect on each icon
- Tooltip with technology name

---

## 11. Experience Section

### Purpose

The Experience section should describe Abdulaziz's current technical journey, even if he does not have formal work experience yet.

### Suggested Content

Because there are no specific jobs listed yet, the section can focus on learning and practical development experience.

Example:

```txt
Frontend Development Practice
Built and practiced responsive interfaces using HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS.

AI / ML Learning Journey
Learning Python-based AI engineering tools including Pandas, NumPy, Scikit-learn, and basic model deployment.
```

### Recommended Format

Use timeline cards:

- Title
- Type
- Date or status
- Short description
- Technologies used

Example card:

```txt
Frontend Development Practice
Personal Learning / Practice
Focused on building clean UI components, responsive layouts, and modern frontend workflows.
Tech: React, Next.js, TypeScript, Tailwind CSS
```

---

## 12. Projects Section

### Current Status

No projects are ready to be added yet.

The Projects section should still exist because projects will be important later.

### Recommended Current Text

```txt
Projects are coming soon.
I am currently building my portfolio and developing projects in frontend development and AI engineering.
```

### Future Project Categories

The website should be prepared to show projects in these categories:

- Frontend projects
- React / Next.js projects
- AI / ML projects
- Data analysis projects
- Full-stack projects
- School or learning center software projects

### Future Project Card Fields

Each project card should include:

- Project title
- Short description
- Tech stack
- GitHub link
- Live demo link
- Screenshot or preview image
- Status: Completed / In Progress / Planned

### Example Placeholder Project Card

```txt
Project Coming Soon
Frontend / AI Engineering
A practical project will be added here with a live demo, GitHub repository, and explanation.
```

---

## 13. Education Section

### Purpose

The Education section should show Abdulaziz's academic background and current learning direction.

### Suggested Content

```txt
Student based in Tashkent, Uzbekistan
Focused on frontend development, AI engineering, machine learning, and modern web technologies.
```

### Possible Education Card

```txt
Independent Technical Learning
Frontend Development & AI Engineering
Currently studying React, Next.js, TypeScript, Python, Pandas, NumPy, Scikit-learn, and ML deployment fundamentals.
```

### Future Additions

Later, this section can include:

- School name
- Graduation year
- Certificates
- Online courses
- Olympiads or competitions
- University preparation

---

## 14. Contact Section

### Purpose

The Contact section should make it easy for people to reach Abdulaziz.

### Public Contact Information

#### Email

```txt
abdulazizyusupaliev009@gmail.com
```

#### GitHub Username

```txt
abdulazizyusupaliev
```

Suggested GitHub URL:

```txt
https://github.com/abdulazizyusupaliev
```

#### LinkedIn

```txt
https://www.linkedin.com/in/abdulaziz-yusupaliev-521166377
```

#### Telegram / Social Handle

```txt
d_vaderrr
```

### Contact UI Ideas

Use contact cards or buttons:

- Email Me
- GitHub
- LinkedIn
- Telegram

### Contact Form

A contact form can be added later. For the first version, direct links are enough.

Optional form fields:

- Name
- Email
- Message
- Submit button

---

## 15. Language Support

The website should support:

- English
- Russian

### Recommended Approach

For the first version, create the main website in **English** and add Russian support later.

Possible language switcher:

```txt
EN / RU
```

### Initial Language Strategy

Version 1:

- English only
- Russian greeting included in Hero animation

Version 2:

- Add full Russian translation
- Add language switcher
- Store translations in a separate file

---

## 16. Recommended Tech Stack

### Main Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel

### Supporting Tools

- Git
- GitHub
- npm

### AI / ML Skills to Display

- Python
- Pandas
- NumPy
- Scikit-learn
- ML deployment basics
- AI engineering basics

### Recommended Deployment

Deploy the website on **Vercel**.

Suggested deployment flow:

1. Create GitHub repository.
2. Build the website locally.
3. Push code to GitHub.
4. Connect repository to Vercel.
5. Deploy.
6. Add a custom domain later if needed.

---

## 17. Suggested File Structure

Recommended Next.js project structure:

```txt
portfolio-website/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   ├── skills.ts
│   ├── projects.ts
│   └── translations.ts
├── public/
│   ├── icons/
│   └── images/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 18. Component Plan

### Navbar Component

Responsibilities:

- Display website logo or name
- Display navigation links
- Support mobile menu
- Smooth scroll to sections

### Hero Component

Responsibilities:

- Show greeting animation
- Show name
- Show role
- Show short description
- Show CTA buttons

### Skills Component

Responsibilities:

- Show technology icons
- Show categorized skills
- Add hover effects

### Experience Component

Responsibilities:

- Show learning/practice experience
- Use timeline or cards

### Projects Component

Responsibilities:

- Show placeholder projects for now
- Later display real projects

### Education Component

Responsibilities:

- Show academic and self-learning background

### Contact Component

Responsibilities:

- Show email, GitHub, LinkedIn, and Telegram/social handle
- Provide clickable links

### Footer Component

Responsibilities:

- Show copyright
- Show small closing message

Example:

```txt
© 2026 Abdulaziz Yusupaliev. Built with Next.js and Tailwind CSS.
```

---

## 19. Content Draft for the Website

### Hero Draft

```txt
Hello, I'm Abdulaziz Yusupaliev.
Frontend Developer & Beginner AI Engineer.

I build clean, responsive, and modern web interfaces using React, Next.js, TypeScript, and Tailwind CSS. I am also learning AI engineering, machine learning, and practical model deployment with Python.
```

### Skills Draft

```txt
Skills & Tools

Languages: JavaScript, TypeScript, Python
Frameworks: React, Next.js
Styling: HTML5, CSS3, Tailwind CSS, Bootstrap, Pug
Tools: Git, GitHub, GitLab, npm, Vercel
AI / ML: Pandas, NumPy, Scikit-learn, machine learning basics, ML deployment basics
```

### Experience Draft

```txt
Frontend Development Practice
I have been practicing modern frontend development by building clean interfaces, responsive layouts, and reusable components with React, Next.js, TypeScript, and Tailwind CSS.

AI Engineering Learning
I am expanding my skills in Python, data analysis, machine learning fundamentals, and model deployment using tools such as Pandas, NumPy, and Scikit-learn.
```

### Projects Draft

```txt
Projects Coming Soon
I am currently preparing projects in frontend development and AI engineering. This section will include live demos, GitHub repositories, screenshots, and explanations.
```

### Education Draft

```txt
Education & Learning
I am a student based in Tashkent, Uzbekistan, focused on frontend development, AI engineering, machine learning, and building practical software projects.
```

### Contact Draft

```txt
Contact Me
Feel free to connect with me or look through my work.

Email: abdulazizyusupaliev009@gmail.com
GitHub: abdulazizyusupaliev
LinkedIn: Abdulaziz Yusupaliev
Telegram / Handle: d_vaderrr
```

---

## 20. Visual Inspiration Links

The following links were collected as inspiration for the portfolio design:

1. `https://narayaniv-profile.netlify...` — incomplete link
2. `https://sanjaymalladi.vercel.app/`
3. `https://portfolio-abhijit-arote.vercel...` — incomplete link
4. `https://koepfli.dev/`
5. `https://www.simoncamacho.dev/e...` — incomplete link
6. `https://nemerem-portfolio.vercel.app/`
7. `https://engelgatus.com/`
8. `https://www.61j3t.pro/`
9. `https://pran.proreact.dev/`
10. `https://www.ahmedhamila.com/`
11. `https://benhalverson.dev/`
12. `https://rython.dev/`
13. `https://gregorgracnar.com/`
14. `https://abhijitsaha.vercel.app/`

Recommended links to study first:

- `https://koepfli.dev/`
- `https://benhalverson.dev/`
- `https://gregorgracnar.com/`
- `https://abhijitsaha.vercel.app/`

---

## 21. UI Layout Recommendation

### Page Flow

```txt
Navbar
↓
Hero
↓
Skills & Tools
↓
Experience
↓
Projects
↓
Education
↓
Contact
↓
Footer
```

### Section Spacing

Recommended spacing:

- Desktop: large vertical padding
- Mobile: smaller but still breathable spacing
- Max content width: around `1100px` or `1200px`

### Cards

Use cards for:

- Skills categories
- Experience items
- Project placeholders
- Contact links

Card style:

- Dark background slightly lighter than page background
- Thin border
- Rounded corners
- Hover border glow
- Smooth transition

---

## 22. Accessibility Requirements

The website should be accessible and easy to use.

Requirements:

- Good color contrast
- Semantic HTML sections
- Descriptive button text
- Keyboard-accessible navigation
- Alt text for images and icons when needed
- Clear heading hierarchy
- Responsive design for mobile and desktop

---

## 23. SEO Requirements

Basic SEO should be included.

Recommended metadata:

```txt
Title: Abdulaziz Yusupaliev | Frontend Developer & Beginner AI Engineer
Description: Personal portfolio website of Abdulaziz Yusupaliev, a frontend developer from Tashkent learning AI engineering and machine learning.
Keywords: Abdulaziz Yusupaliev, Frontend Developer, React Developer, Next.js, AI Engineering, Machine Learning, Tashkent, Uzbekistan
```

Open Graph metadata should also be added later for better link previews.

---

## 24. Responsive Design Requirements

The website must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile requirements:

- Navbar should become hamburger menu
- Hero text should not be too large
- Skills icons should wrap nicely
- Cards should stack vertically
- Buttons should be easy to tap

---

## 25. Development Roadmap

### Version 1: Basic Portfolio

Include:

- Navbar
- Hero
- Skills
- Experience
- Projects placeholder
- Education
- Contact
- Footer
- Dark clean design
- Basic animations
- Vercel deployment

### Version 2: Improved Portfolio

Add:

- Real projects
- Project screenshots
- GitHub and live demo links
- Full Russian language support
- Resume download
- Better SEO

### Version 3: Advanced Portfolio

Add:

- Blog section
- AI/ML project case studies
- Contact form
- Analytics
- Custom domain
- More advanced animations

---

## 26. Final Recommended Build Stack

For the best result, use:

```txt
Next.js + TypeScript + Tailwind CSS + Framer Motion + Montserrat + Poppins + Vercel
```

Why this stack fits the project:

- Next.js is strong for portfolio websites.
- TypeScript makes the project cleaner and more professional.
- Tailwind CSS helps create a fast, clean dark UI.
- Framer Motion makes smooth animations easier.
- Vercel makes deployment simple.

---

## 27. Final Notes

This portfolio should start simple but be built in a way that makes future expansion easy. The most important thing is to make the first version clean, fast, responsive, and professional.

The first version does not need too many effects or complex features. A clear personal brand, strong Hero section, clean Skills section, and simple Contact section are enough to make it useful.

Projects can be added later when they are ready.

---

## 28. Folder Structure Rule

Keep the component tree split by responsibility.

- `components/layout/` is for site shell pieces such as the navbar and footer.
- `components/sections/<section>/` is for section-specific components and any helpers used only by that section.
- `components/shared/` is for reusable UI primitives that can be shared across sections.
- Do not add new flat files directly under `components/` once a component has a clear home.
- If a component is only used by one section, keep it inside that section folder.
- If a component is not being used anywhere and has no clear purpose yet, leave it out of section folders until it is actually needed.
