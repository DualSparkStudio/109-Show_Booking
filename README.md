# ShowBooker - High-Engagement Show Booking Website

A conversion-focused, emotionally-driven website for influencers hosting live events, comedy shows, meetups, and fan experiences. Built to maximize ticket bookings through engaging UI/UX design.

## 🚀 Features

### Core Engagement Features
- ✅ **Hero Section** with background video/animation and urgency messaging
- ✅ **Countdown Timer** for next show
- ✅ **Sticky Floating "Book Ticket" Button** that appears on scroll
- ✅ **Scroll-Activated Animations** throughout the site
- ✅ **Exit Intent Popup** to capture emails
- ✅ **Social Proof** with follower counts and testimonials
- ✅ **Mobile-First Responsive Design**
- ✅ **100% Static Frontend** - No backend required, deployable on GitHub Pages

### Pages
1. **Home** - Hero video, countdown, featured shows, urgency CTAs
2. **Shows** - Filterable list with search, city, and category filters
3. **About** - Influencer bio, embedded social feeds, testimonials
4. **Contact** - Contact form, business inquiry button, social links

### Design Features
- Emotion-driven visuals with cinematic feel
- Smooth scroll animations with Framer Motion
- Modern bold fonts (Poppins & Inter)
- High contrast CTAs with gradient buttons
- Theme system (default theme included, others planned)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Routing**: React Router (HashRouter for GitHub Pages)
- **Deployment**: GitHub Pages ready

## 📁 Project Structure

```
src/
├── themes/
│   ├── default/          # Default theme (complete)
│   ├── neon/             # Planned
│   ├── dark/             # Planned
│   └── minimal/          # Planned
├── pages/
│   ├── Home.tsx          # Hero, countdown, featured shows
│   ├── Shows.tsx         # Filterable show list
│   ├── About.tsx         # Bio, social feeds, testimonials
│   └── Contact.tsx       # Contact form
├── components/
│   ├── Navbar.tsx        # Sticky navigation
│   ├── Footer.tsx        # Footer with links
│   ├── TicketCard.tsx    # Show card component
│   ├── Countdown.tsx     # Countdown timer
│   ├── TeaserVideo.tsx   # Hero video component
│   ├── FloatingCTA.tsx   # Sticky booking button
│   └── ExitPopup.tsx     # Exit intent popup
├── data/
│   └── shows.json        # Dummy show data
└── App.tsx
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment to GitHub Pages

1. **Update `vite.config.ts`**
   ```typescript
   base: '/your-repo-name/', // Change to your repo name
   ```

2. **Update `package.json`**
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

The `gh-pages` package will automatically build and deploy to the `gh-pages` branch.

## 🎨 Adding New Themes

To create a new theme:

1. Create a new folder in `src/themes/` (e.g., `neon`, `dark`, `minimal`)
2. Copy `src/themes/default/theme.ts` to your new folder
3. Customize colors, fonts, and gradients
4. Import and use in your components or create a theme switcher

Example:
```typescript
// src/themes/neon/theme.ts
export const neonTheme = {
  colors: {
    primary: { /* neon colors */ },
    // ... customize
  },
  // ...
};
```

## 📝 Customization

### Updating Show Data
Edit `src/data/shows.json` to add/update shows, influencer info, and testimonials.

### Updating Colors
Edit `tailwind.config.ts` and `src/index.css` to customize the color scheme.

### Adding Social Links
Update social links in `src/data/shows.json` under `influencer.socialLinks`.

## 🎯 Key Conversion Elements

- **Urgency Badges**: "Limited Seats" messaging
- **Countdown Timers**: Creates FOMO
- **Availability Indicators**: "Only X seats left"
- **Social Proof**: Follower counts, testimonials
- **Sticky CTAs**: Always accessible booking button
- **Exit Intent**: Captures leaving visitors
- **Mobile Optimization**: Ensures conversions on all devices

## 🔧 No Backend Required

This is a **100% static frontend**. All forms and booking actions are placeholders that:
- Show success messages
- Log to console
- Would integrate with external services (email providers, booking platforms)

To integrate real functionality:
- Use services like Formspree, EmailJS, or Netlify Forms for contact forms
- Link booking buttons to external ticketing platforms (Eventbrite, Ticketmaster, etc.)
- Add Google Analytics or similar for tracking

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

**Built with ❤️ for creators who want to connect with their audience through unforgettable experiences.**