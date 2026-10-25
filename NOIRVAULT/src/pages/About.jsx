import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Heart, Compass } from "lucide-react";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> BEHIND THE OBJECTS</div>
        <h1>We like things<br />with <em>a little soul.</em></h1>
        <p>NOIRVAULT is a small, independent-minded edit of everyday objects that earn their place in your world.</p>
        <div className="about-stamp"><span>NV</span><small>CURATED<br />WITH INTENT</small></div>
      </div>
      <div className="about-story-grid">
        <div className="story-number">01 <span>— OUR POINT OF VIEW</span></div>
        <div className="story-copy"><h2>Less, but <em>better.</em></h2><p>We're surrounded by more things than ever. We think the answer isn't more choice — it's better choice. We look for objects that balance form, function, and a feeling you can't quite put your finger on.</p><p>From the desk you work at to the music you carry around, the little details add up. We want to help you get those details right.</p></div>
      </div>
      <div className="values-grid">
        <article><span className="value-icon"><Sparkles size={20} /></span><div className="eyebrow">01 / CURATION</div><h3>Only the keepers.</h3><p>Every object has to earn its spot. No filler, no endless scrolling, no just-because.</p></article>
        <article><span className="value-icon"><Heart size={20} /></span><div className="eyebrow">02 / FEELING</div><h3>Useful can be beautiful.</h3><p>We love objects that work hard and look good doing it. Everyday utility, with a point of view.</p></article>
        <article><span className="value-icon"><Compass size={20} /></span><div className="eyebrow">03 / DISCOVERY</div><h3>Stay a little curious.</h3><p>New finds, fresh perspectives, and pieces that make familiar routines feel new again.</p></article>
      </div>
      <div className="about-cta"><div><div className="eyebrow">NOW, THE GOOD PART</div><h2>Meet your next <em>favourite.</em></h2></div><Link to="/products" className="button-primary">Explore the edit <ArrowRight size={17} /></Link></div>
      <Link to="/" className="about-back"><ArrowLeft size={14} /> Back to Home</Link>
    </section>
  );
}
