const fs = require('fs');

const path = 'src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add context import
content = content.replace(
  "import { Booking } from '../types';",
  "import { Booking } from '../types';\nimport { useAppContext } from '../context/AppContext';"
);

// 2. Replace state declarations with useAppContext
const stateDeclarationsRegex = /\/\/ Navigation states[\s\S]*?const \[activeBookingCount, setActiveBookingCount\] = useState\(0\);[\s\S]*?}, \[bookingsTrigger\]\);/g;

content = content.replace(stateDeclarationsRegex, `const { triggerInstantBooking, setBookingsTrigger } = useAppContext();`);

// Remove handleBookingSuccess & handleCancelBooking from Home.tsx
content = content.replace(/const handleBookingSuccess =[\s\S]*?}, 2500\);\n  };/g, '');
content = content.replace(/const handleCancelBooking =[\s\S]*?prev \+ 1\);\n  };/g, '');

// Keep scrollToElement but it's already there!

// 3. Remove Header and Mobile Drawer
// From <header to </AnimatePresence> before <main>
content = content.replace(/<header[\s\S]*?<\/header>/g, '');
content = content.replace(/{?\/\* Mobile Drawer Navigation Panel \*\/}?[\s\S]*?<\/AnimatePresence>/g, '');

// 4. Remove Footer, Mobile sticky rail, and Modals
// From </footer> down
// Instead of complex regex, let's just find the end of <main> and cut everything between </main> and <Lightbox> or remove them precisely.
content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
content = content.replace(/{?\/\* Floating Sticky Navigation Bar \(Mobile Only\) \*\/}?[\s\S]*?<\/nav>\n      <\/div>/g, '');
content = content.replace(/{?\/\* Private Slide-over Panel for Active Guest Reservations \*\/}?[\s\S]*?<\/AnimatePresence>/g, '');
content = content.replace(/{?\/\* Dynamic Pop-up Booking Appointment Modal \*\/}?[\s\S]*?<\/AnimatePresence>/g, '');
content = content.replace(/{?\/\* Global Floating WhatsApp Button \*\/}?[\s\S]*?<\/a>/g, '');

// 5. Remove <main> wrapper tags to let it be the root (or keep them, it's fine)
content = content.replace(/<main className="flex-grow pt-\[80px\]">/g, '<div className="flex-grow">');
content = content.replace(/<\/main>/g, '</div>');

fs.writeFileSync(path, content, 'utf8');
console.log('Home.tsx refactored');
