import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import StudioScene from '@/components/StudioScene';
import niralVistaMark from '@assets/WhatsApp_Image_2026-10-05_at_8.38.37_PM_1791212950363.jpeg';
import hospitalVisual from '@assets/generated_images/nv-hospital.jpg';
import ecommerceVisual from '@assets/generated_images/nv-ecommerce.jpg';
import restaurantVisual from '@assets/generated_images/nv-restaurant-pos.jpg';
import neerxVisual from '@assets/generated_images/nv-neerx.jpg';
import navexaVisual from '@assets/generated_images/nv-navexa.jpg';
import civicpulseVisual from '@assets/generated_images/nv-civicpulse.jpg';
import ragVisual from '@assets/generated_images/nv-rag-chatbot.jpg';
import amlVisual from '@assets/generated_images/nv-aml-shield.jpg';
import studentVisual from '@assets/generated_images/nv-student-path.jpg';
import pantryVisual from '@assets/generated_images/nv-pantry-pilot.jpg';
import healthVisual from '@assets/generated_images/nv-health-monitoring.jpg';
import sosVisual from '@assets/generated_images/nv-sos-gesture.jpg';
import foodWasteVisual from '@assets/generated_images/nv-food-waste.jpg';

const services = [
  ['01', 'Brand strategy', 'A sharper point of view, a clearer place in the world.'],
  ['02', 'Brand identity', 'Distinctive visual systems built to hold their own.'],
  ['03', 'Product design', 'Digital experiences that make complex things feel simple.'],
  ['04', 'Web development', 'Fast, thoughtful websites and products, made to work.'],
  ['05', 'Motion & 3D', 'Movement, form and dimensional worlds with a reason to exist.'],
  ['06', 'Content', 'Useful stories, visual narratives and the thinking between them.'],
  ['07', 'Copywriting', 'Clear language with a pulse. From a line to a whole system.'],
  ['08', 'Campaigns', 'Ideas shaped into connected moments people can act on.'],
  ['09', 'Growth analytics', 'Signals, measurement and informed next moves.'],
  ['10', 'Systems & ops', 'The tools and ways of working that keep good work moving.'],
];
const projects = [
  ['Hospital Management', 'Digital product', 'A connected care operations platform.', 'clinic'],
  ['E-commerce', 'Commerce', 'A considered digital storefront experience.', 'commerce'],
  ['Restaurant POS', 'Digital product', 'Service-side tools for the rhythm of a restaurant.', 'pos'],
  ['NEERX', 'Robotics · Sustainability', 'A river-cleaning robot concept.', 'water'],
  ['Navexa', 'Assistive technology', 'Navigation designed around accessibility.', 'nav'],
  ['CivicPulse', 'Civic technology', 'A clearer view of civic signals and activity.', 'civic'],
  ['Dynamic RAG Chatbot', 'Applied AI', 'A retrieval-augmented conversational system.', 'rag'],
  ['AML Shield X', 'Applied AI · Fintech', 'A system concept for anti-money-laundering workflows.', 'shield'],
  ['Student Learning Path', 'Education', 'A more personal way to navigate learning.', 'learn'],
  ['Pantry Pilot AI', 'Applied AI · Food', 'An AI-powered pantry planning concept.', 'pantry'],
  ['Smart Health Monitoring', 'Health technology', 'An intelligent approach to health monitoring.', 'health'],
  ['SOS Hand Gesture Detection', 'Applied AI · Safety', 'A gesture-based emergency signal concept.', 'sos'],
  ['Food Waste Detector', 'Applied AI · Sustainability', 'A computer-vision concept for identifying food waste.', 'food'],
];
const team = [
  ['LK', 'Lithin Kumar', 'Brand & Strategy Lead', '01'],
  ['AK', 'Ajay Kumar', 'Visual Designer', '02'],
  ['GS', 'Gaja Sri', 'Business Development Executive', '03'],
  ['S', 'Shankari', 'Client & Project Coordinator', '04'],
  ['SK', 'Sujith', 'Full Stack Developer', '05'],
  ['K', 'Karthikeyan', 'AI & Data Specialist', '06'],
];
const steps = [
  ['01', 'Listen closely', 'We start with the context, the people and the ambition behind the brief.'],
  ['02', 'Find the signal', 'We get specific about what matters, what is changing and where the opportunity lives.'],
  ['03', 'Set the direction', 'A shared strategic foundation gives the work a clear north star.'],
  ['04', 'Make the first shape', 'We turn the direction into tangible ideas you can see, test and respond to.'],
  ['05', 'Build with intent', 'Design, engineering and the right specialists work as one compact team.'],
  ['06', 'Test the real thing', 'We refine against real needs, practical constraints and the details that count.'],
  ['07', 'Ship & keep learning', 'We get the work out into the world, then use what it teaches us.'],
];
const faqs = [
  ['What kind of work does Niral Vista take on?', 'We work across brand strategy and identity, digital products, web development, applied AI, content and growth. The common thread is taking a useful idea from early shape through to a shipped experience.'],
  ['Who will I work with?', 'A senior, six-specialist team spanning brand and strategy, visual design, business development, client and project coordination, full stack development, and AI and data. The people shaping the work stay close to it.'],
  ['Can you join a project already in progress?', 'Yes. We can help at the point where a project needs direction, design, engineering or a thoughtful combination of the three. Share where things stand and we can start there.'],
  ['How do projects usually begin?', 'A short conversation about the opportunity, the people involved and what a useful next step looks like. From there we can frame the scope and decide how to move forward together.'],
  ['Do you work with early-stage ideas?', 'Yes. We can help shape a first sketch into a clear direction, a considered prototype or a working product, depending on what the idea needs next.'],
  ['How do I get in touch?', 'Send a note to niralvistainnovations.freelance@gmail.com, or use the project enquiry form below. A little context about your idea is a good place to begin.'],
];
const filters = ['All work', 'Digital products', 'Applied AI', 'Impact & access'];

const projectVisuals = [
  hospitalVisual, ecommerceVisual, restaurantVisual, neerxVisual, navexaVisual,
  civicpulseVisual, ragVisual, amlVisual, studentVisual, pantryVisual,
  healthVisual, sosVisual, foodWasteVisual,
];

function ProjectArt({ kind, index, title }: { kind: string; index: number; title: string }) {
  return <div className={`project-art art-${kind}`}>
    <img src={projectVisuals[index]} alt={`${title} 3D concept visual`} loading="lazy" />
    <div className="art-shade" />
    <div className="art-index">NV / {String(index + 1).padStart(2, '0')}</div>
    <div className="art-caption">3D CONCEPT VISUAL</div>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const visibleProjects = useMemo(() => projects.filter((project) => {
    if (filter === 'All work') return true;
    if (filter === 'Applied AI') return project[1].includes('AI');
    if (filter === 'Impact & access') return ['NEERX', 'Navexa', 'CivicPulse', 'Food Waste Detector', 'SOS Hand Gesture Detection'].includes(project[0]);
    return ['Digital product', 'Commerce'].includes(project[1]);
  }), [filter]);

  useEffect(() => {
    document.title = 'Niral Vista Innovations — Ideas, made tangible.';
    const description = 'A compact creative technology studio pairing brand strategy, design craft, engineering, AI and growth to take ideas from first sketch to shipped products.';
    const ensureMeta = (name: string, content: string, property = false) => {
      const key = property ? 'property' : 'name';
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(key, name); document.head.appendChild(tag); }
      tag.content = content;
    };
    ensureMeta('description', description);
    ensureMeta('og:title', 'Niral Vista Innovations — Ideas, made tangible.', true);
    ensureMeta('og:description', description, true);
    ensureMeta('og:type', 'website', true);
    ensureMeta('twitter:card', 'summary_large_image');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    const initialAnchor = window.location.hash.slice(1);
    if (initialAnchor) requestAnimationFrame(() => {
      const target = document.getElementById(initialAnchor);
      if (target) window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - 88));
    });
    return () => observer.disconnect();
  }, []);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const project = String(form.get('project') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !email || !message) return;
    const subject = `Project enquiry — ${name}`;
    const body = `Hello Niral Vista Innovations,\n\n${message}\n\nProject type: ${project || 'Not specified'}\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:niralvistainnovations.freelance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const closeMenu = () => setMenuOpen(false);
  return <main className="site">
    <header className="topbar">
      <div className="nav-wrap wrap">
        <a href="#top" className="brand-lockup" aria-label="Niral Vista Innovations home" onClick={closeMenu}>
          <img className="brand-mark-image" src={niralVistaMark} alt="" /><span className="brand-name">NIRAL VISTA<small>INNOVATIONS</small></span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a className="nav-link" href="#work" onClick={closeMenu}>Work</a>
          <a className="nav-link" href="#studio" onClick={closeMenu}>Studio</a>
          <a className="nav-link" href="#services" onClick={closeMenu}>Capabilities</a>
          <a className="nav-link" href="#approach" onClick={closeMenu}>Approach</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Start a conversation <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <section className="hero grain" id="top">
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <div className="hero-overline"><span className="signal-dot" /> INDEPENDENT CREATIVE TECHNOLOGY STUDIO <span className="overline-location">· REMOTE-FIRST, WORKING WORLDWIDE</span></div>
          <h1 className="display">Ideas,<br /><em>made tangible.</em></h1>
          <p className="hero-deck">We bring brand, design, engineering and intelligence together to turn a first sketch into something real — and ready for what comes next.</p>
          <div className="hero-actions"><a className="button button-gold" href="#work">Explore our work <ArrowDownRight size={16} /></a><a className="text-link" href="#studio">Meet the studio <ArrowRight size={15} /></a></div>
          <div className="hero-proof"><div className="proof-stat"><b>06</b><span>specialists</span></div><div className="proof-rule" /><div className="proof-stat"><b>13<span>+</span></b><span>projects</span></div><div className="proof-rule" /><div className="proof-stat"><b>10</b><span>service areas</span></div></div>
        </div>
        <div className="hero-visual" aria-label="An animated gold digital form, built in real-time 3D"><div className="scene-label scene-label-top"><span>FIG. 01</span><span>IDEA / IN MOTION</span></div><div className="scene-glow" /><StudioScene /><div className="scene-coordinates">REMOTE-FIRST<br />WORKING WORLDWIDE</div><div className="scene-caption"><span className="caption-dot" /> A SMALL STUDIO. A WIDE FIELD.</div></div>
        <a href="#manifesto" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </div>
      <div className="hero-footline wrap"><span>STRATEGY / DESIGN / TECHNOLOGY</span><span>BUILT FOR THE NEXT, NOT JUST THE NOW</span></div>
    </section>

    <section className="manifesto section-pad" id="manifesto">
      <div className="wrap manifesto-grid">
        <div className="section-kicker reveal"><span className="eyebrow">01 / THE STUDIO</span><span className="kicker-line" /></div>
        <div className="manifesto-main reveal reveal-delay-1">
          <p className="manifesto-small">Small by design. <span>Built to think across.</span></p>
          <h2 className="display">The best ideas don’t stay<br className="desktop-break" /> in their lane.</h2>
          <div className="manifesto-bottom"><p>They need a point of view, a shape, a system — and the right people to make them work in the real world. Niral Vista is a close-knit creative technology studio bringing all of that into one room.</p><a className="circle-link" href="#studio" aria-label="Discover the studio"><ArrowDownRight size={21} /></a></div>
        </div>
        <div className="manifesto-index reveal reveal-delay-2"><span>INDEPENDENT THINKING</span><span>CONNECTED MAKING</span><span>USEFUL OUTCOMES</span></div>
      </div>
    </section>

    <section className="work-section section-pad" id="work">
      <div className="wrap">
        <div className="section-heading reveal"><div><span className="eyebrow">02 / SELECTED WORK</span><h2 className="display">Different challenges.<br /><em>One curious studio.</em></h2></div><p>A cross-section of the ideas, systems and products we’ve helped shape.</p></div>
        <div className="work-toolbar"><span className="work-count">01—13 <i /> A GROWING BODY OF WORK</span><div className="filter-list" aria-label="Filter projects">{filters.map((item) => <button type="button" key={item} className={`filter-chip ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div></div>
        <div className="project-grid">
          {visibleProjects.map((project) => {
            const originalIndex = projects.indexOf(project);
            return <article className={`project-card reveal project-${originalIndex % 4}`} key={project[0]} data-testid={`card-project-${originalIndex + 1}`}>
              <ProjectArt kind={project[3]} index={originalIndex} title={project[0]} />
              <div className="project-meta"><span>{project[1]}</span><span>0{originalIndex + 1}</span></div>
              <div className="project-title-row"><div><h3>{project[0]}</h3><p>{project[2]}</p></div><span className="project-arrow"><ArrowUpRight size={17} /></span></div>
            </article>;
          })}
        </div>
        <div className="work-endnote"><span>13 PROJECTS, MANY MORE QUESTIONS WORTH ASKING</span><a href="#contact">Have a good one? <ArrowRight size={14} /></a></div>
      </div>
    </section>

    <section className="services-section section-pad" id="services">
      <div className="wrap services-layout">
        <div className="services-intro reveal"><span className="eyebrow">03 / CAPABILITIES</span><h2 className="display">The right minds<br />at the <em>right moment.</em></h2><p>We bring the right disciplines into the conversation at the right time. No hand-offs into the void. No one-size-fits-all team.</p><a className="inline-link" href="#contact">Tell us what you’re building <ArrowRight size={15} /></a><div className="service-stamp">THINK<br />MAKE<br />MOVE<span>↗</span></div></div>
        <div className="service-list">{services.map(([number, title, description], index) => <div className={`service-row reveal reveal-delay-${index % 3}`} key={number}><span className="service-number">{number}</span><div className="service-copy"><h3>{title}</h3><p>{description}</p></div><ArrowUpRight className="service-arrow" size={16} /></div>)}</div>
      </div>
    </section>

    <section className="studio-section section-pad" id="studio">
      <div className="studio-top wrap">
        <div className="section-kicker reveal"><span className="eyebrow">04 / THE PEOPLE</span><span className="kicker-line" /></div>
        <div className="studio-content">
          <div className="studio-intro reveal"><h2 className="display">Good work is a<br /><em>team sport.</em></h2><p>Six specialists. One closely connected way of working. We bring strategy, craft and technology together without losing the human thread.</p></div>
          <div className="team-grid">{team.map(([initials, name, role, number], index) => <article className={`team-card reveal reveal-delay-${index % 3}`} key={name}><div className={`team-monogram monogram-${index}`}><span>{initials}</span><i>{number}</i></div><div className="team-detail"><h3>{name}</h3><p>{role}</p></div></article>)}</div>
        </div>
      </div>
      <div className="studio-note"><span>SMALL ENOUGH TO STAY CLOSE.</span><span>WIDE ENOUGH TO MAKE WHAT’S NEXT.</span></div>
    </section>

    <section className="approach-section section-pad" id="approach">
      <div className="wrap">
        <div className="section-heading approach-heading reveal"><div><span className="eyebrow">05 / HOW WE MOVE</span><h2 className="display">From first thought<br />to <em>out in the world.</em></h2></div><p>Seven deliberate steps. Enough structure to move with confidence, enough room to find the unexpected.</p></div>
        <div className="steps-list">{steps.map(([number, title, text], index) => <article className={`step-row reveal reveal-delay-${index % 3}`} key={number}><span className="step-number">{number}</span><span className="step-stem" /><h3>{title}</h3><p>{text}</p><span className="step-check">{index === steps.length - 1 ? <ArrowUpRight size={17} /> : <Check size={13} />}</span></article>)}</div>
        <div className="approach-foot"><span>NO BLACK BOXES. NO SURPRISE HANDOVERS.</span><span>GOOD WORK, MADE TOGETHER.</span></div>
      </div>
    </section>

    <section className="faq-section section-pad">
      <div className="wrap faq-layout">
        <div className="faq-intro reveal"><span className="eyebrow">06 / GOOD TO KNOW</span><h2 className="display">A few things<br /><em>you might wonder.</em></h2><p>Still have a question? We’re happy to start with that.</p><a href="mailto:niralvistainnovations.freelance@gmail.com" className="inline-link">Write us a note <ArrowUpRight size={15} /></a></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item reveal reveal-delay-${index % 3} ${openFaq === index ? 'faq-open' : ''}`} key={question}><button type="button" className="faq-question" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} data-testid={`faq-toggle-${index + 1}`}><span><i>0{index + 1}</i>{question}</span><ChevronDown size={17} /></button>{openFaq === index && <div className="faq-answer"><p>{answer}</p></div>}</article>)}</div>
      </div>
    </section>

    <section className="contact-section grain" id="contact">
      <div className="wrap contact-wrap">
        <div className="contact-top reveal"><span className="eyebrow">07 / YOUR NEXT MOVE</span><span className="contact-aside">A GOOD IDEA<br />LOOKS GOOD ON YOU.</span></div>
        <div className="contact-grid">
          <div className="contact-copy reveal"><h2 className="display">Let’s make<br />something <em>matter.</em></h2><p>Bring us the half-formed thought, the stubborn challenge or the next big step. We’ll bring good questions and the right people.</p><div className="contact-methods"><a href="mailto:niralvistainnovations.freelance@gmail.com" className="contact-email">niralvistainnovations.freelance@gmail.com <ArrowUpRight size={16} /></a><a href="tel:+917806848181" className="contact-phone">+91 78068 48181</a></div><div className="contact-open"><span className="signal-dot" /> OPEN FOR THE RIGHT NEXT THING</div></div>
          <form className="enquiry-form reveal reveal-delay-1" onSubmit={submitEnquiry}>
            <div className="form-heading"><span>START WITH A NOTE</span><span>WE’LL TAKE IT FROM THERE.</span></div>
            <label>Your name<input name="name" placeholder="What should we call you?" required autoComplete="name" data-testid="input-name" /></label>
            <label>Email address<input name="email" type="email" placeholder="Where can we reach you?" required autoComplete="email" data-testid="input-email" /></label>
            <label>What are you thinking about?<select name="project" defaultValue="" data-testid="select-project"><option value="">Choose a starting point</option><option>Brand & identity</option><option>Digital product or website</option><option>AI & data</option><option>Growth & campaigns</option><option>Something else</option></select></label>
            <label>A little context<textarea name="message" rows={3} placeholder="The idea, the challenge, or simply where you are right now..." required data-testid="input-message" /></label>
            <button type="submit" className="button button-gold form-submit" data-testid="button-submit-enquiry">{sent ? 'Your email is ready' : 'Compose your enquiry'} <ArrowUpRight size={16} /></button>
            <p className="form-note" role="status">{sent ? 'Your email app should open with your enquiry addressed to our studio.' : 'This opens a pre-addressed email with your note and details.'}</p>
          </form>
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="wrap footer-main"><a href="#top" className="brand-lockup footer-brand" aria-label="Niral Vista Innovations home"><img className="brand-mark-image" src={niralVistaMark} alt="" /><span className="brand-name">NIRAL VISTA<small>INNOVATIONS</small></span></a><p>Good ideas deserve<br />to become real things.</p><div className="footer-links"><a href="#work">Work</a><a href="#studio">Studio</a><a href="#services">Capabilities</a><a href="#approach">Approach</a></div><a className="footer-top" href="#top">Back to the beginning <ArrowUpRight size={14} /></a></div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} NIRAL VISTA INNOVATIONS</span><span>INDEPENDENT BY NATURE. CONNECTED BY DESIGN.</span><a href="tel:+917806848181">+91 78068 48181</a><a href="mailto:niralvistainnovations.freelance@gmail.com">SAY HELLO <ArrowUpRight size={12} /></a></div>
    </footer>
  </main>;
}

export default App;
